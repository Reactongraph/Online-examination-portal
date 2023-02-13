import { toast } from 'react-toastify'

const checkWithDatabase = async (
	data,
	editform,
	id,
	addMethod,
	editMethod,
	entityName,
	route,
	router
) => {
	if (editform) {
		let entityData = JSON.stringify(data)
		await editMethod(entityData, id)
			.then(() => {
				toast.success(`${entityName} updated!`)
				router.replace(route)
			})
			.catch(() => {
				toast.error('Invalid Request')
			})
	} else {
		data.status = true
		let entityData = JSON.stringify(data)
		await addMethod(entityData)
			.then(() => {
				toast.success(`${entityName} inserted!`)
				router.replace(route)
			})
			.catch(() => {
				toast.error('Invalid Request')
			})
	}
}
export default checkWithDatabase
