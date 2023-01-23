import axios from 'axios'
import useSWR from 'swr'
import { SERVER_LINK } from '../helpers/config'
import customAxios  from './customAxios'

const fetcher = async (url, token) =>
{
	try {
		const response = await customAxios.get(url)
		return response.data
	} catch (error) {
		return error.response.data
	}
}

export function GetQuizData(token) {
	const { data, error, isLoading, mutate } = useSWR(
		[`/quiz/find`, token],
		([url, token]) => fetcher(url, token)
	)
	return {
		data,
		error,
		isLoading,
		mutate,
	}
}

export async function GetQuizDataWithId(token, id) {
	return await customAxios.get(`/quiz/find/${id}`)
}
export async function DeleteQuiz(id, token) {
	return await customAxios.delete(`/quiz/${id}`)
}

export async function AddQuiz(data, token) {
	return await customAxios.post(`/quiz/create`, data)
}
export async function EditQuiz(data, id, token) {
	return await customAxios.patch(`/quiz/${id}`, data)
}
