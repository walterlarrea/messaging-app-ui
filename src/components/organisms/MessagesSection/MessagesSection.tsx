import { useEffect, useState, type FormEvent } from 'react'
import Button from '../../atoms/Button/Button.tsx'
import Input from '../../atoms/Input/Input.tsx'
import { HiPaperAirplane } from 'react-icons/hi2'
import Toast from '../../molecules/Toast/Toast.jsx'
import { $chat, setCurrentChatMessages } from '../../../store/chat.ts'
import { useStore } from '@nanostores/react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate.js'
import {
	getChatWithUser,
	createNewMessage,
} from '../../../services/messageService.ts'
import type { TApiErrors } from '../../../types/error'
import { toast } from 'react-toastify'
import type { TUserMessage } from '../../../types/message'
import ChatMessage from '../../molecules/ChatMessage/ChatMessage.tsx'

const MessagesSection = () => {
	const [msgContent, setMsgContent] = useState('')
	const chatStore = useStore($chat)
	const getChat = useAxiosPrivate(getChatWithUser)
	const sendMessage = useAxiosPrivate(createNewMessage)

	useEffect(() => {
		if (!chatStore.currentUser?.id) return

		getChat(chatStore.currentUser.id)
			.then((chatMessages) => setCurrentChatMessages(chatMessages))
			.catch((error: TApiErrors) => {
				const message = error?.errors?.[0]
					? error?.errors?.[0].msg
					: 'An unknown error occur'
				toast.error(message)
			})
	}, [chatStore.currentUser?.id])

	const handleNewMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!msgContent || msgContent.length <= 0) return

		sendMessage({ targetUserId: chatStore.currentUser.id, content: msgContent })
			.then(() => {
				setMsgContent('')
			})
			.catch((error: TApiErrors) => {
				const message = error?.errors?.[0]
					? error?.errors?.[0].msg
					: 'An unknown error occur'
				toast.error(message)
			})
	}

	return (
		<main className="p-4 bg-[--accent]">
			<div className="flex flex-col gap-4 h-full">
				<div className="flex flex-col gap-1 grow">
					{chatStore.messages?.map((msg: TUserMessage) => (
						<ChatMessage
							key={msg.id}
							isMine={msg.senderId !== chatStore.currentUser?.id}
							content={msg.content}
							date={msg.date}
						/>
						// <span key={msg.id}>{msg.content} + </span>
					))}
				</div>

				{chatStore.currentUser && (
					<form
						onSubmit={handleNewMessage}
						className="flex justify-between items-center gap-2"
					>
						<Input
							type="text"
							boxSize="lg"
							id="message-text"
							name="message"
							placeholder=" Message"
							value={msgContent}
							onChange={(e) => setMsgContent(e.target.value)}
						/>
						<Button
							type="submit"
							size="lg"
							classes="h-full text-5xl"
							disabled={msgContent.length <= 0}
						>
							<HiPaperAirplane />
						</Button>
					</form>
				)}
			</div>

			<Toast />
		</main>
	)
}

export default MessagesSection
