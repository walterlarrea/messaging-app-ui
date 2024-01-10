import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import type { TChannelCreate } from '../types/channel.ts'
import type { TApiErrors } from '../types/error'

export const createNewChannel =
	(fetchFunction: AxiosInstance) => async (newChannel: TChannelCreate) => {
		return await fetchFunction
			.post('/api/channel', newChannel)
			.then((response: AxiosResponse) => {
				return response.data
			})
			.catch((error: AxiosError) => {
				const apiErrors = error.response?.data as TApiErrors
				return Promise.reject(apiErrors)
			})
	}
