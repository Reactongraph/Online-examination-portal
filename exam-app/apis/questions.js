import useSWR from 'swr'
import customAxios from './customAxios'

const fetcher = async (url, token) => {
	try {
		const response = await customAxios.get(url)
		return response.data
	} catch (error) {
		return error.response.data
	}
}

export function GetQuestionData(token) {
	const { data, mutate, error, isLoading } = useSWR(
		[`/questions/find`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		mutate,
		error,
		isLoading,
	}
}
export async function GetQuestionDataWithId(token, id) {
	return await customAxios.get(`/questions/find/${id}`)
}
export async function DeleteQuestion(id, token) {
	return await customAxios.delete(`/questions/${id}`)
}

export async function Addquestion(data, token) {
	return await customAxios.post(`/questions/create`, data)
}
export async function UploadCsvQuestion(data, token) {
	return await customAxios.post(`/questions/uploads`, data)
}
export async function EditQuestion(data, id, token) {
	return await customAxios.patch(`/questions/${id}`, data)
}
