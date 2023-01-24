import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'
import customAxios from './customAxios'

const fetcher = async (url, token) => {
	try {
		const response = await customAxios.get(url)
		return response.data
	} catch (error) {
		return error.response.data
	}
}

export function GetAdminData(token) {
	const { data, mutate, error, isLoading } = useSWR(
		[`/admin/`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		mutate,
		error,
		isLoading,
	}
}
export function GetAdminDataWithId(token, id) {
	const { data, error, isLoading, mutate } = useSWR(
		[`/admin/${id}`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
