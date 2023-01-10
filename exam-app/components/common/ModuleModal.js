import React, { useState } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { SERVER_LINK } from '../../helpers/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import LevelModulePopup from './PopUpModals/LevelModulePopUp'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

const ModuleModal = ({ modal, setModal }) => {
	const router = useRouter()
	const [modules, setModules] = useState('')

	const buttonText = 'Add'
	const { handleSubmit } = useForm()
	const login_token = useSelector((state) => state.user.token)

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.status = true
		data.module = modules

		let LevelData = JSON.stringify(data)

		// for taking the patch api data
		if (data.module !== null && data.module != '') {
			await axios({
				url: `${SERVER_LINK}/module`,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
				data: LevelData,
			})
				.then(() => {
					router.replace(router.asPath)
					setModules('')
					setModal(!modal)
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
