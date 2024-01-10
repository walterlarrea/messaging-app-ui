import type { AxiosInstance, AxiosResponse } from 'axios'
import { manageApiErrors } from '../utils/axios'
import type { TUserFriend } from '../types/users'

export const requestFriend =
	(fetchFunction: AxiosInstance) => async (targetUsername: string) => {
		return await fetchFunction
			.post('/api/friends/request', {
				target_user_email: targetUsername,
			})
			.then((response: AxiosResponse) => {
				return response.data
			})
			.catch(manageApiErrors)
	}

export const getFriendRequests = (fetchFunction: AxiosInstance) => async () => {
	return await fetchFunction
		.get('/api/friends/incoming-requests')
		.then((response: AxiosResponse) => {
			return response.data
		})
		.catch(manageApiErrors)
}

export const getFriends =
	(fetchFunction: AxiosInstance) => async (): Promise<TUserFriend> => {
		return await fetchFunction
			.get('/api/friends')
			.then((response: AxiosResponse) => {
				return response.data
			})
			.catch(manageApiErrors)
	}
