import React, { useState } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import LevelModulePopup from './PopUpModals/LevelModulePopUp'
import { AddModule } from '../../apis/modules'

const ModuleModal = ({ modal, setModal, mutate }) => {
	const router = useRouter()
	const [modules, setModules] = useState('')

	const buttonText = 'Add'
	const { handleSubmit } = useForm()

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.status = true
		data.module = modules

		let LevelData = JSON.stringify(data)

		// for taking the patch api data
		if (data.module !== null && data.module != '') {
			AddModule(LevelData)
				.then(() => {
					router.replace(router.asPath)
					setModules('')
					setModal(!modal)
					mutate()
					toast.success('module created!')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		}

		// for new data registration
		else {
			toast.error('Fill Required Field')
		}
	}

	return (
		<>
			<LevelModulePopup
				setStateName={setModules}
				stateName={modules}
				checkWithDatabase={checkWithDatabase}
				handleSubmit={handleSubmit}
				setModal={setModal}
				modal={modal}
				modalName={'MODULE'}
				buttonText={buttonText}
				placeholderText={'eg. C++ , JAVA ,  etc...'}
			/>

			<ToastContainer />
		</>
	)
}

export default ModuleModal
