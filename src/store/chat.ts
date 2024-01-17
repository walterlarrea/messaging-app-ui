import { atom } from 'nanostores'
import type { TUserMessage } from '../types/message'

interface chatStore {
	userId: number | null
	messages?: TUserMessage[]
}

export const $chat = atom({ userId: null } as chatStore)

export function setChatUser(userId: number) {
	$chat.set({ ...$chat.get(), userId })
}

export function setCurrentChatMessages(messages: TUserMessage[]) {
	$chat.set({ ...$chat.get(), messages })
}
