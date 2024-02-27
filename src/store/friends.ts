import { atom, onMount } from 'nanostores'
import type { TUserFriend, TUserFriendDictionary } from '../types/users'
import { getFriends, getFriendRequests } from '../services/friendsService'
import type { TApiErrors } from '../types/error'
import { getChatWithUser } from '../services/messageService'
import type { TUserMessage } from '../types/message'

interface friendsStore {
	currentFriendChat: TUserFriend
	allFriends: TUserFriendDictionary
	friendRequests: TUserFriend[]
}

export const $friends = atom<friendsStore>({
	currentFriendChat: null,
	allFriends: null,
	friendRequests: null,
})

export const setCurrentChat = (user: TUserFriend) => {
	$friends.set({ ...$friends.get(), currentFriendChat: user })
	fetchCurrentChat()
}

const setCurrentChatMessages = (messages: TUserMessage[]) => {
	const { currentFriendChat, allFriends } = $friends.get()
	const allFriendsUpdated = new Map(allFriends)

	allFriendsUpdated.set(currentFriendChat.id, {
		...allFriendsUpdated.get(currentFriendChat.id),
		messages,
	})

	$friends.set({ ...$friends.get(), allFriends: allFriendsUpdated })
}

const fetchCurrentChat = () => {
	const friendStore = $friends.get()

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
}

const fetchFriends = () => {
	getFriends()
		.then((result: TUserFriend[]) => {
			const allFriendsObject: TUserFriendDictionary = new Map()

			for (const friend of result) {
				allFriendsObject.set(friend.id, friend)
			}

			$friends.set({ ...$friends.get(), allFriends: allFriendsObject })
		})
		.catch((reasons) => {
			reasons?.errors?.[0]
				? console.log(reasons?.errors?.[0].msg)
				: console.log('An unknown error occur')
		})
}

const fetchFriendRequests = () => {
	getFriendRequests()
		.then((result: TUserFriend[]) => {
			$friends.set({ ...$friends.get(), friendRequests: result })
		})
		.catch((reasons) => {
			reasons?.errors?.[0]
				? console.log(reasons?.errors?.[0].msg)
				: console.log('An unknown error occur')
		})
}

onMount($friends, () => {
	fetchFriends()
	fetchFriendRequests()
})
