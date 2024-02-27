import { atom } from 'nanostores'
import type { TUserMessage } from '../types/message'
import { createNewMessage, getChatWithUser } from '../services/messageService'
import type { TApiErrors } from '../types/error'
import { $friends } from './friends'
import SOCKET from '../utils/wsGlobalHandler'

interface chatStore {
	messages?: TUserMessage[]
}

export const $chat = atom<chatStore>({ messages: null })

function setCurrentChatMessages(messages: TUserMessage[]) {
	$chat.set({ ...$chat.get(), messages })
}

export function addOneCurrentChatMessage(message) {
	const oldState = $chat.get()
	const messages = [...oldState.messages]
	messages.push(message)

	setCurrentChatMessages(messages)
}

export async function sendNewChatMessage({ targetUserId, content }) {
	const messageResult: boolean = await createNewMessage({
		targetUserId,
		content,
	})
		.then((result) => {
			const oldState = $chat.get()
			const messages = [...oldState.messages]
			messages.push(result)

			SOCKET.emit('sendMessage', result)
			setCurrentChatMessages(messages)
			return true
		})
		.catch((error: TApiErrors) => {
			error?.errors?.[0] ? error?.errors?.[0].msg : 'An unknown error occur'
			return false
		})

	return messageResult
}

$friends.subscribe((friendStore) => {
	if (friendStore.currentFriendChat?.id) {
		getChatWithUser(friendStore.currentFriendChat.id)
			.then((chatMessages) => setCurrentChatMessages(chatMessages))
			.catch((error: TApiErrors) => {
				const message = error?.errors?.[0]
					? error?.errors?.[0].msg
					: 'An unknown error occur'
				console.error(message)
			})
	}
})
