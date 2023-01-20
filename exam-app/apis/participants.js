import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'
import { customAxios } from './customAxios'

const fetcher = (url, token) =>
	axios
		.get(url, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: token,
			},
		})
		.then((res) => res.data)

export function GetParticipantData(token) {
	const { data, error, isLoading, mutate } = useSWR(
		[`${SERVER_LINK}/participants/find`, token],
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

export async function DeleteParticipant(participantId, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.delete(
		`${SERVER_LINK}/participants/${participantId}`
	)
}

export async function AddParticipant(data, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.post(`${SERVER_LINK}/participants`, data)
}

export async function EditParticipant(data, participantId, token) {
	customAxios.defaults.headers.common.Authorization = token
	return await customAxios.patch(
		`${SERVER_LINK}/participants/${participantId}`,
		data
	)
}
