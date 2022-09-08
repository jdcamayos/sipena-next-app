import axios, { AxiosError } from 'axios'
import { config } from '../config'
import { ErrorResponseBase } from '../types'

export const service = axios.create({
	baseURL: config.backendUrl,
	timeout: 10000,
})

service.interceptors.request.use(
	async config => {
		const token = window.localStorage.getItem('access_token')
		config.headers = {
			Authorization: `Bearer ${token}`,
		}
		return config
	},
	error => Promise.reject(error)
)

service.interceptors.response.use(
	response => response,
	error => {
		if (error instanceof AxiosError && error.response?.data) {
			throw error.response.data as ErrorResponseBase
		} else {
			throw error
		}
	}
)
