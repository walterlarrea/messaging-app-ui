import { io } from 'socket.io-client'
import { API_URI } from '../config/constants'
import { $auth } from '../store/auth'
import { addOneCurrentChatMessage } from '../store/chat'
import { addOneFriendRequest, approvedFriendRequest } from '../store/friends'

const BASE_URL = API_URI

const SOCKET = io(BASE_URL, { path: '/ws' })

$auth.listen((auth) => {
	if (SOCKET === null) return
	if (!auth?.userId) return

	SOCKET.emit('addOnlineUser', auth.userId)

	SOCKET.off('getMessage')
	SOCKET.on('getMessage', (res) => {
		// This should never happen as the backend is targeting the messages
		if (res.receiverId !== auth?.userId) return

		addOneCurrentChatMessage(res)
	})

	SOCKET.off('getFriendRequest')
	SOCKET.on('getFriendRequest', (res) => {
		// This should never happen as the backend is targeting the requests
		// if (res.receiverId !== auth?.userId) return

		addOneFriendRequest(res)
	})

	SOCKET.off('approvedFriendRequest')
	SOCKET.on('approvedFriendRequest', (res) => {
		console.log('aFR', res)
		// This should never happen as the backend is targeting the requests
		// if (res.receiverId !== auth?.userId) return

		approvedFriendRequest()
	})
})

export default SOCKET
