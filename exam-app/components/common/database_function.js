import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const useCheckWithDatabase = (dataApi, successMessage, route) => {
	const router = useRouter()

	const checkWithDatabase = async (data, id) => {
		try {
			id ? await dataApi(data, id) : await dataApi(data)
			toast.success(successMessage)
			setTimeout(() => {
				router.replace(`${route}`)
			}, 1000)
		} catch (error) {
			toast.error('invalid request')
		}
	}

	return checkWithDatabase
}
export default useCheckWithDatabase
