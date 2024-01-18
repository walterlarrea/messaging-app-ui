import { atom } from 'nanostores'
import type { TUserMessage } from '../types/message'
import type { TUserPublic } from '../types/users'

interface chatStore {
	currentUser: TUserPublic
	messages?: TUserMessage[]
}

export const $chat = atom({ currentUser: null } as chatStore)

export function setChatUser(user: TUserPublic) {
	$chat.set({ ...$chat.get(), currentUser: user })
}

export function setCurrentChatMessages(messages: TUserMessage[]) {
	$chat.set({ ...$chat.get(), messages })
}
