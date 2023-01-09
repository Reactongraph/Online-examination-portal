import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'

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
	return await axios.delete(`${SERVER_LINK}/participants/${participantId}`, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}

export async function AddParticipant(data, token) {
	return await axios({
		url: `${SERVER_LINK}/participants`,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
		data,
	}).then((res) => res.data)
}

export async function EditParticipant(data, participantId, token) {
	await axios.patch(`${SERVER_LINK}/participants/${participantId}`, data, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			Authorization: token,
		},
	})
}
