import axios from './axios.ts'
import { setAuth } from '../store/auth.ts'
import type { IAuth } from '../types/auth'

const refreshToken = () => {
	const refresh = async () => {
		const response = await axios
			.get('/refresh', {
				withCredentials: true,
			})
			.catch((error) => {
				return error.response
			})

		if (response.status === 401) {
			setAuth({} as IAuth)
			window.location.href = '/'
		}

		const accessToken = response.data?.accessToken
		const userId = response.data?.userId
		const role = response.data?.role

		setAuth({ userId, role, accessToken })
		return response.data.accessToken
	}

	return refresh
}

export default refreshToken
