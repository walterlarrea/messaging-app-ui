import axios, { type AxiosError, type AxiosInstance } from 'axios'
import { API_URI } from '../config/constants'
import type { TApiErrors } from '../types/error'

const BASE_URL = API_URI

export default axios.create({
	baseURL: BASE_URL,
}) as AxiosInstance

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
}) as AxiosInstance

export const manageApiErrors = (error: AxiosError) => {
	const apiErrors = error.response?.data as TApiErrors
	return Promise.reject(apiErrors ?? error.message)
}
