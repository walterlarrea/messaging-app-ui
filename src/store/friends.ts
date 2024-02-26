import { atom, onMount } from 'nanostores'
import type { TUserFriend } from '../types/users'
import { getFriends, getFriendRequests } from '../services/friendsService'

interface friendsStore {
	currentFriendChat: TUserFriend
	allFriends: TUserFriend[]
	friendRequests: TUserFriend[]
}

export const $friends = atom<friendsStore>({
	currentFriendChat: null,
	allFriends: null,
	friendRequests: null,
})

export function setCurrentChat(user: TUserFriend) {
	$friends.set({ ...$friends.get(), currentFriendChat: user })
}

onMount($friends, () => {
	getFriends()
		.then((result: TUserFriend[]) => {
			$friends.set({ ...$friends.get(), allFriends: result })
		})
		.catch((reasons) => {
			reasons?.errors?.[0]
				? console.log(reasons?.errors?.[0].msg)
				: console.log('An unknown error occur')
		})

	getFriendRequests()
		.then((result: TUserFriend[]) => {
			$friends.set({ ...$friends.get(), friendRequests: result })
		})
		.catch((reasons) => {
			reasons?.errors?.[0]
				? console.log(reasons?.errors?.[0].msg)
				: console.log('An unknown error occur')
		})
})
