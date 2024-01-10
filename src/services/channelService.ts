import type { AxiosInstance, AxiosResponse } from 'axios'
import type { TChannelCreate } from '../types/channel.ts'
import { manageApiErrors } from '../utils/axios.ts'

export const createNewChannel =
	(fetchFunction: AxiosInstance) => async (newChannel: TChannelCreate) => {
		return await fetchFunction
			.post('/api/channel', newChannel)
			.then((response: AxiosResponse) => {
				return response.data
			})
			.catch(manageApiErrors)
	}
