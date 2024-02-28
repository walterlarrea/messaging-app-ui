import { atom, onMount } from 'nanostores'
import type {
	TUserFriend,
	TUserFriendDictionary,
	TUserFriendRequest,
} from '../types/users'
import { getFriends, getFriendRequests } from '../services/friendsService'
import type { TApiErrors } from '../types/error'
import { getChatWithUser } from '../services/messageService'
import type { TUserMessage } from '../types/message'

interface friendsStore {
	currentFriendChat: TUserFriend
	allFriends: TUserFriendDictionary
	friendRequests: TUserFriendRequest[]
	unseenRequests: number
}

export const $friends = atom<friendsStore>({
	currentFriendChat: null,
	allFriends: null,
	friendRequests: null,
	unseenRequests: 0,
})

export const setCurrentChat = (user: TUserFriend) => {
	$friends.set({ ...$friends.get(), currentFriendChat: user })
	fetchCurrentChat()
}

export const setFriendRequests = (requests: TUserFriendRequest[]) => {
	const unseenRequests = requests.filter((req) => req.unseen).length

	$friends.set({ ...$friends.get(), friendRequests: requests, unseenRequests })
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

export function changeSeenFriendRequest(requestUserIdFrom) {
	const { friendRequests } = $friends.get()
	const newFriendRequests = friendRequests.map((req) =>
		req.id !== requestUserIdFrom ? req : { ...req, unseen: false }
	)
	setFriendRequests(newFriendRequests)
}

export function addOneFriendRequest(request) {
	const oldState = $friends.get()
	const friendRequests = [...oldState.friendRequests]
	friendRequests.unshift(request)

	setFriendRequests(friendRequests)
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
		.then((result: TUserFriendRequest[]) => {
			setFriendRequests(result)
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

export function approvedFriendRequest() {
	fetchFriends()
	fetchFriendRequests()
}
