import { axiosPrivate } from '../utils/axios.ts'
import { $auth } from '../store/auth.ts'
import refreshToken from './refreshToken.ts'

const axiosPrivateRefresh = () => {
	const refresh = refreshToken()

	const requestIntercept = axiosPrivate.interceptors.request.use(
		(config) => {
			if (!config.headers['Authorization']) {
				config.headers['Authorization'] = `Bearer ${$auth.get()?.accessToken}`
			}
			return config
		},
		(error) => Promise.reject(error)
	)
	const responseIntercept = axiosPrivate.interceptors.response.use(
		(response) => response,
		async (error) => {
			const prevRequest = error?.config
			if (error.response.status === 403 && !prevRequest?.sent) {
				prevRequest.sent = true

				const newAccessToken = await refresh()
				prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
				return axiosPrivate(prevRequest)
			}
			return Promise.reject(error)
		}
	)

	const unMount = () => {
		axiosPrivate.interceptors.request.eject(requestIntercept)
		axiosPrivate.interceptors.response.eject(responseIntercept)
	}

	return { axiosPrivate, unMount }
}

export default axiosPrivateRefresh
