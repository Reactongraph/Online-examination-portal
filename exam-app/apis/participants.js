import useSWR from 'swr'
import ApiCaller from './ApiCaller'

const fetcher = async (url) => {
	try {
		const response = await ApiCaller.get(url)
		return response.data
	} catch (error) {
		return error.response.data
	}
}
export function GetParticipantData() {
	const { data, error, isLoading, mutate } = useSWR(
		[`/participants/find`],
		([url]) => fetcher(url)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export async function GetParticipantDataWithOrgId(id) {
	return await ApiCaller.get(`/participants/findbyorganization/${id}`)
}

export async function DeleteParticipant(participantId) {
	return await ApiCaller.delete(`/participants/${participantId}`)
}

export async function AddParticipant(data) {
	return await ApiCaller.post(`/participants`, data)
}

export async function EditParticipant(data, participantId) {
	return await ApiCaller.patch(`/participants/${participantId}`, data)
}
