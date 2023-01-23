import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'
import Cookies from 'js-cookie'
import customAxios from './customAxios'

const token = Cookies.get('refresh_token')
const fetcher = async (url, token) => {
	try {
		const response = await customAxios.get(url)
		return response.data
	} catch (error) {
		return error.response.data
	}
}
export function GetParticipantData(token) {
	const { data, error, isLoading, mutate } = useSWR(
		[`/participants/find`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export function GetParticipantDataWithOrgId(token, id) {
	const { data, error, isLoading, mutate } = useSWR(
		[`${SERVER_LINK}/participants/findbyorganization/${id}`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export async function DeleteParticipant(participantId) {
	return await customAxios.delete(`/participants/${participantId}`)
}

export async function AddParticipant(data) {

	return await customAxios.post(`/participants`,data)
}

export async function EditParticipant(data, participantId) {
	return await customAxios.patch(`/participants/${participantId}`,data)
}
