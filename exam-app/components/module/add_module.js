import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AddModule, EditModule, GetModuleDataWithId } from '../../apis/modules'
import LevelModulePopup from '../common/PopUpModals/level_module_model'
import { ToastContainer, toast } from 'react-toastify'

const AddModuleComponent = ({ isViewOnly }) => {
	const router = useRouter()
	const [modules, setModules] = useState('')
	const [buttonText, setButtonText] = useState('Add')
	const { handleSubmit } = useForm()
	const [editForm, setEditForm] = useState(false)

	useEffect(() => {
		let module_id = router.query?.id

		async function getModuleData() {
			const results = await GetModuleDataWithId(module_id)
			const moduleData = results.data
			// setButtonText('Update')
			setEditForm(true)
			setModules(moduleData?.module)
			isViewOnly ? setButtonText('View') : setButtonText('Edit')
		}

		if (module_id) {
			getModuleData()
		}
	}, [router.query?.id])

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.module = modules

		if (editForm) {
			// for taking the patch api data
			let moduleData = JSON.stringify(data)
			EditModule(moduleData, router.query?.id)
				.then(() => {
					router.replace('/module')
					toast.success('updated!')
				})
				.catch(() => {
					toast.error('invalid request')
				})
		} else {
			// for new data registration
			data.status = true
			let moduleData = JSON.stringify(data)
			AddModule(moduleData)
				.then(() => {
					router.replace('/module')
					toast.success('module created!')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		}
	}

	return (
		<>
			<LevelModulePopup
				setStateName={setModules}
				stateName={modules}
				checkWithDatabase={checkWithDatabase}
				handleSubmit={handleSubmit}
				modalName={'MODULE'}
				buttonText={buttonText}
				placeholderText={'eg. C++ , JAVA ,  etc...'}
				isViewOnly={isViewOnly || false}
			/>

			<ToastContainer />
		</>
	)
}

export default AddModuleComponent
