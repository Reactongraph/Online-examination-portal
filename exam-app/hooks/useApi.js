import api from '../services/api'

const useApi = () => {
	//   Get the data
	const get = async (resource = {}) => {
		return new Promise((resolve, reject) => {
			//Call the API
			api
				.get(resource)
				.then((res) => {
					if (res?.status === 200) {
						resolve(res)
					} else if (res) {
						// Error handle null response
						reject(res)
					}
				})
				.catch((e) => reject(e))
		})
	}

	const post = async (resource, params) => {
		//Post data
		const postData = await api.post(resource, params)

		return postData
	}
	return { get, post }
}

export default useApi
