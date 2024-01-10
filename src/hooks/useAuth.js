import { useDebugValue } from 'react'
import { useStore } from '@nanostores/react'
import { $auth, setAuth } from '../store/auth'

const useAuth = () => {
	const auth = useStore($auth)

	useDebugValue(auth, (auth) => (auth?.email ? 'Logged In' : 'Logged Out'))
	return { auth, setAuth }
}

export default useAuth
