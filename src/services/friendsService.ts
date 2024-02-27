import type { AxiosResponse } from 'axios'
import { manageApiErrors } from '../utils/axios'
import type { TUserFriend } from '../types/users'
import axiosPrivateRefresh from '../utils/axiosPrivateRefresh'

export const getFriendRequests = async (): Promise<TUserFriend[]> => {
	const { axiosPrivate } = axiosPrivateRefresh()

	return await axiosPrivate
		.get('/api/friends/incoming-requests')
		.then((response: AxiosResponse) => {
			return response.data
		})
		.catch(manageApiErrors)
}

export const getFriends = async (): Promise<TUserFriend[]> => {
	const { axiosPrivate } = axiosPrivateRefresh()

	return await axiosPrivate
		.get('/api/friends')
		.then((response: AxiosResponse) => {
			return response.data
		})
		.catch(manageApiErrors)
}

export const requestFriend = async (targetUsername: string) => {
	const { axiosPrivate } = axiosPrivateRefresh()

	return await axiosPrivate
		.post('/api/friends/request', {
			target_username: targetUsername,
		})
		.then((response: AxiosResponse) => {
			return response.data
		})
		.catch(manageApiErrors)
}

export const approveFriendRequest = async (targetUserId: number) => {
	const { axiosPrivate } = axiosPrivateRefresh()

	return await axiosPrivate
		.patch('/api/friends/request', {
			req_user_id: targetUserId,
		})
		.then((response: AxiosResponse) => {
			return response.data
		})
		.catch(manageApiErrors)
}
