import axios, { type AxiosInstance } from 'axios'
import { API_URI } from '../config/constants'

const BASE_URL = API_URI

export default axios.create({
	baseURL: BASE_URL,
}) as AxiosInstance

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
}) as AxiosInstance
