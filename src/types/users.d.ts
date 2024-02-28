import type { TUserMessage } from './message'

export type TUserRegister = {
	email: string
	username: string
	first_name: string
	last_name: string
	password: string
	password_confirm: string
}

export type TUserPublic = {
	id: number
	firstName: string
	username: string
}

export type TUserFriend = TUserPublic & {
	messages?: TUserMessage[]
}

export type TUserFriendRequest = TUserPublic & {
	unseen: boolean
}

export type TUserFriendDictionary = Map<number, TUserFriend>
