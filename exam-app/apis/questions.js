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

export function GetQuestionData() {
	const { data, mutate, error, isLoading } = useSWR(
		[`/questions/find`],
		([url]) => fetcher(url)
	)
	return {
		data,
		mutate,
		error,
		isLoading,
	}
}
export async function GetQuestionDataWithId(id) {
	return await ApiCaller.get(`/questions/find/${id}`)
}
export async function DeleteQuestion(id) {
	return await ApiCaller.delete(`/questions/${id}`)
}

export async function Addquestion(data) {
	return await ApiCaller.post(`/questions/create`, data)
}
export async function UploadCsvQuestion(data) {
	return await ApiCaller.post(`/questions/uploads`, data)
}
export async function EditQuestion(data, id) {
	return await ApiCaller.patch(`/questions/${id}`, data)
}
