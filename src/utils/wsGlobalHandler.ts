import { io } from 'socket.io-client'
import { API_URI } from '../config/constants'
import { $auth } from '../store/auth'
import { addOneCurrentChatMessage } from '../store/chat'

const BASE_URL = API_URI

const SOCKET = io(BASE_URL, { path: '/ws' })

$auth.listen((auth) => {
	if (SOCKET === null) return
	if (!auth.userId) return

	SOCKET.emit('addOnlineUser', auth.userId)

	SOCKET.on('getMessage', (res) => {
		// This should never happen as the backend is targeting the messages
		if (res.receiverId !== auth?.userId) return

		addOneCurrentChatMessage(res)
	})
})

export default SOCKET
