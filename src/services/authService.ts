import type { AxiosResponse } from 'axios'
import type { IAuth, TLoginCredentials } from '../types/auth'
import type { TUserRegister } from '../types/users'
import axios, { manageApiErrors } from '../utils/axios'

export async function registerNewUser(newUser: TUserRegister) {
	return await axios
		.post('/register', newUser)
		.then((response: AxiosResponse) => {
			return response.data
		})
		.catch(manageApiErrors)
}

export async function loginUser(
	credentials: TLoginCredentials
): Promise<IAuth> {
	return axios
		.post('/auth', credentials, {
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true,
		})
		.then((response: AxiosResponse) => {
			return response.data as IAuth
		})
		.catch(manageApiErrors)
}
