import React, { useState } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { SERVER_LINK } from '../../helpers/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import LevelModulePopup from './PopUpModals/LevelModulePopUp'
import { AddLevel } from '../../apis/levels'

// CALL IT ONCE IN YOUR APP
// if (typeof window !== 'undefined') {
// 	injectStyle()
// }

const LevelModal = (props) => {
	const { modal, setModal } = props
	const router = useRouter()
	const [level, setLevel] = useState('')

	const buttonText = 'Add'
	const { handleSubmit } = useForm()
	const login_token = useSelector((state) => state.user.token)
	const user = useSelector((state) => state?.user)

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.status = true
		data.level = level

		let LevelData = JSON.stringify(data)

		// for taking the patch api data
		if (data.level !== null && data.level != '') {
			AddLevel(LevelData,user?.token)
				.then(() => {
					router.replace(router.asPath)
					setLevel('')
					setModal(!modal)
					toast.success('level inserted')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		}

		// for new data registration
		else {
			toast.error("Field Can't be empty ")
		}
	}

	// for sending the data to the backend

	return (
		<>
			<LevelModulePopup
				setStateName={setLevel}
				stateName={level}
				checkWithDatabase={checkWithDatabase}
				handleSubmit={handleSubmit}
				setModal={setModal}
				modal={modal}
				modalName={'LEVEL'}
				buttonText={buttonText}
				placeholderText={'eg. Easy , Moderate , etc ...'}
			/>

			<ToastContainer />
		</>
	)
}

export default LevelModal
