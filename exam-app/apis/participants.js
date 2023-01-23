import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'
import Cookies from 'js-cookie'

const token = Cookies.get('refresh_token')
global.createAxiosInstance(token)
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

export async function DeleteParticipant(participantId) {
	return await global.axiosInstance.delete(`/participants/${participantId}`)
}

export async function AddParticipant(data) {
	return await global.axiosInstance.post(`/participants`,data)
}

export async function EditParticipant(data, participantId) {
	return await global.axiosInstance.patch(`/participants/${participantId}`,data)
}
