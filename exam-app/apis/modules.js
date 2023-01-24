import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'
import  customAxios  from './customAxios'
import Cookies from 'js-cookie'

const token = Cookies.get('refresh_token')


const fetcher = async (url, token) =>
{
	try {
		const response = await customAxios.get(url)
		return response.data
	} catch (error) {
		return error.response.data
	}
}

export function GetModuleData(token) {
	const { data, error, isLoading, mutate } = useSWR(
		[`/module/find`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function GetModuleDataWithId(token, id) {
	const { data, error, isLoading, mutate } = useSWR(
		[`/module/${id}`, token],
		([url, token]) => fetcher(url, token)
	)

	return {
		data,
		error,
		isLoading,
		mutate,
	}
}
export async function DeleteModule(id) {
	return await customAxios.delete(`/module/${id}`)
}

export async function AddModule(data) {
	return await customAxios.post(`/module`,data)
}

export async function EditModule(data, id) {
	return await customAxios.patch(`/module/${id}`,data)
}
