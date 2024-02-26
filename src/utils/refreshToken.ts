import axios from './axios.ts'
import { setAuth } from '../store/auth.ts'

const refreshToken = () => {
	const refresh = async () => {
		const response = await axios.get('/refresh', {
			withCredentials: true,
		})
		const accessToken = response.data?.accessToken
		const userId = response.data?.userId
		const role = response.data?.role

		setAuth({ userId, role, accessToken })
		return response.data.accessToken
	}

	return refresh
}

export default refreshToken
