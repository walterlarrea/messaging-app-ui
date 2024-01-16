import type { AxiosInstance, AxiosResponse } from 'axios'
import { manageApiErrors } from '../utils/axios'
import type { TUserPublic } from '../types/users'

export const getFriendRequests = (fetchFunction: AxiosInstance) => async () => {
	return await fetchFunction
		.get('/api/friends/incoming-requests')
		.then((response: AxiosResponse) => {
			return response.data
		})
		.catch(manageApiErrors)
}

export const getFriends =
	(fetchFunction: AxiosInstance) => async (): Promise<TUserPublic> => {
		return await fetchFunction
			.get('/api/friends')
			.then((response: AxiosResponse) => {
				return response.data
			})
			.catch(manageApiErrors)
	}

export const requestFriend =
	(fetchFunction: AxiosInstance) => async (targetUsername: string) => {
		return await fetchFunction
			.post('/api/friends/request', {
				target_username: targetUsername,
			})
			.then((response: AxiosResponse) => {
				return response.data
			})
			.catch(manageApiErrors)
	}

export const approveFriendRequest =
	(fetchFunction: AxiosInstance) => async (targetUserId: number) => {
		return await fetchFunction
			.patch('/api/friends/request', {
				req_user_id: targetUserId,
			})
			.then((response: AxiosResponse) => {
				return response.data
			})
			.catch(manageApiErrors)
	}
