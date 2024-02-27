/* eslint-disable indent */
import type { AxiosResponse } from 'axios'
import type { TUserMessage } from '../types/message'
import { manageApiErrors } from '../utils/axios'
import axiosPrivateRefresh from '../utils/axiosPrivateRefresh'

export const getChatWithUser = async (
	targetUserId: number
): Promise<TUserMessage[]> => {
	const { axiosPrivate } = axiosPrivateRefresh()

	return await axiosPrivate
		.get(`/api/message/${targetUserId}`)
		.then((response: AxiosResponse) => {
			return response.data
		})
		.catch(manageApiErrors)
}

export const createNewMessage = async ({
	targetUserId,
	content,
}): Promise<TUserMessage> => {
	const { axiosPrivate } = axiosPrivateRefresh()

	return await axiosPrivate
		.post('/api/message', { target_user_id: targetUserId, content })
		.then((response: AxiosResponse) => {
			return response.data
		})
		.catch(manageApiErrors)
}
