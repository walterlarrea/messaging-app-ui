import type { AxiosResponse } from 'axios'
import type { TChannelCreate } from '../types/channel.ts'
import { manageApiErrors } from '../utils/axios.ts'
import axiosPrivateRefresh from '../utils/axiosPrivateRefresh.ts'

export const createNewChannel = async (newChannel: TChannelCreate) => {
	const { axiosPrivate } = axiosPrivateRefresh()

	return await axiosPrivate
		.post('/api/channel', newChannel)
		.then((response: AxiosResponse) => {
			return response.data
		})
		.catch(manageApiErrors)
}
