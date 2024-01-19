import { useEffect } from 'react'
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
import { io } from 'socket.io-client'
import { $auth } from '../../../store/auth.ts'
import MessageForm from '../../molecules/MessageForm/MessageForm.tsx'

const MessagesSection = () => {
	const chatStore = useStore($chat)
	const authStore = useStore($auth)
	const getChat = useAxiosPrivate(getChatWithUser)
	const sendMessage = useAxiosPrivate(createNewMessage)
	const socket = io('http://localhost:3000')

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

	useEffect(() => {
		if (socket === null) return
		if (!authStore?.userId) return

		socket.emit('addOnlineUser', authStore.userId)

		socket.on('getMessage', (res) => {
			// This should never happen as the backend is the one targeting messages
			if (res.receiverId !== authStore?.userId) return

			setCurrentChatMessages([...chatStore.messages, res])
		})
		return () => {
			socket.off('getMessage')
		}
	}, [socket])

	const handleNewMessage = async (messageContent: string) => {
		const newMessage = {
			targetUserId: chatStore.currentUser.id,
			content: messageContent,
		}

		const messageResult: boolean = await sendMessage(newMessage)
			.then((result) => {
				setCurrentChatMessages([...chatStore.messages, result])
				socket.emit('sendMessage', result)
				return true
			})
			.catch((error: TApiErrors) => {
				const message = error?.errors?.[0]
					? error?.errors?.[0].msg
					: 'An unknown error occur'
				toast.error(message)
				return false
			})

		return messageResult
	}

	return (
		<main className="p-4 overflow-y-auto bg-[--accent]">
			<div className="flex flex-col gap-4 h-full">
				<div className="flex flex-col gap-1 overflow-y-auto grow">
					{chatStore.messages?.map((msg: TUserMessage) => (
						<ChatMessage
							key={msg.id}
							isMine={msg.senderId !== chatStore.currentUser?.id}
							content={msg.content}
							date={msg.date}
						/>
					))}
				</div>

				{chatStore.currentUser && (
					<MessageForm submitNewMessage={handleNewMessage} />
				)}
			</div>
		</main>
	)
}

export default MessagesSection
