import type { TUserMessage } from '../../../types/message'
import { useEffect, useRef } from 'react'
import { useStore } from '@nanostores/react'
import MessageForm from '../../molecules/MessageForm/MessageForm.tsx'
import ChatMessage from '../../molecules/ChatMessage/ChatMessage.tsx'
import { $chat, sendNewChatMessage } from '../../../store/chat.ts'
import { $friends } from '../../../store/friends.ts'

const MessagesSection = () => {
	const chatStore = useStore($chat)
	const friendStore = useStore($friends)
	const messagesContainer = useRef(null)

	useEffect(() => {
		if (!messagesContainer.current) return
		messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight
	}, [chatStore.messages && chatStore.messages?.length])

	const handleNewMessage = async (messageContent: string) => {
		const newMessage = {
			targetUserId: friendStore.currentFriendChat.id,
			content: messageContent,
		}

		const messageResult: boolean = await sendNewChatMessage(newMessage)

		return messageResult
	}

	return (
		<main className="p-4 overflow-y-auto bg-[--accent]">
			<div className="flex flex-col gap-4 h-full">
				<div
					ref={messagesContainer}
					className="flex flex-col gap-1 overflow-y-auto grow"
				>
					{chatStore.messages?.map((msg: TUserMessage) => (
						<ChatMessage
							key={msg.id}
							isMine={msg.senderId !== friendStore.currentFriendChat?.id}
							content={msg.content}
							date={msg.date}
						/>
					))}
				</div>

				{friendStore.currentFriendChat && (
					<MessageForm submitNewMessage={handleNewMessage} />
				)}
			</div>
		</main>
	)
}

export default MessagesSection
