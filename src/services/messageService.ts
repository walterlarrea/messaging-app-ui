/* eslint-disable indent */
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { TUserMessage } from '../types/message'
import { manageApiErrors } from '../utils/axios'

export const getChatWithUser =
	(fetchFunction: AxiosInstance) =>
	async (targetUserId: number): Promise<TUserMessage[]> => {
		return await fetchFunction
			.get(`/api/message/${targetUserId}`)
			.then((response: AxiosResponse) => {
				return response.data
			})
			.catch(manageApiErrors)
	}

export const createNewMessage =
	(fetchFunction: AxiosInstance) =>
	async ({ targetUserId, content }): Promise<TUserMessage> => {
		return await fetchFunction
			.post('/api/message', { target_user_id: targetUserId, content })
			.then((response: AxiosResponse) => {
				return response.data
			})
			.catch(manageApiErrors)
	}
