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

export function GetQuizData() {
	const { data, error, isLoading, mutate } = useSWR([`/quiz/find`], ([url]) =>
		fetcher(url)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export async function GetQuizDataWithId(id) {
	return await ApiCaller.get(`/quiz/find/${id}`)
}
export async function DeleteQuiz(id) {
	return await ApiCaller.delete(`/quiz/${id}`)
}

export async function AddQuiz(data) {
	return await ApiCaller.post(`/quiz/create`, data)
}
export async function EditQuiz(data, id) {
	return await ApiCaller.patch(`/quiz/${id}`, data)
}
