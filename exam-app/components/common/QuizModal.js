import React, { useState } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { SERVER_LINK } from '../../helpers/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import QuizPopUp from './PopUpModals/quizPopUp/QuizPopup'

import 'react-datepicker/dist/react-datepicker.css'

import { useSelector } from 'react-redux'

const QuizModal = ({
	modal,
	setModal,

	module_data: moduleData,
	level_data: levelData,
}) => {
	//For Image Preview

	const router = useRouter()

	const buttonText = 'Add'
	const [name, setName] = useState('')

	const [description, setDescription] = useState('')

	const { handleSubmit } = useForm()
	const [selectedStartDate, setSelectedStartDate] = useState(null)
	const [selectedEndDate, setSelectedEndDate] = useState(null)
	const [selectedBufferDate, setSelectedBufferDate] = useState(null)

	const [selectedLevelId, setSelectedLevelId] = useState('')
	const [selectedModules, setSelectedModules] = useState([])

	const login_token = useSelector((state) => state.user.token)
	// for sending the data to the backend

	const handleLevelTypeSelect = (event) => {
		let levelId = event.target.value
		setSelectedLevelId(levelId)
	}

	const handleModuleTypeSelect = (event) => {
		let moduleSelectedArray = []
		event.map((oneModule) => {
			moduleSelectedArray.push(`${oneModule.id}`)
		})

		setSelectedModules(moduleSelectedArray)
	}

	const checkWithDatabase = async (data) => {
		data.status = true
		data.quiz_name = name
		data.start_date = selectedStartDate
		data.end_date = selectedEndDate
		data.buffer_time = selectedBufferDate
		data.level_id = selectedLevelId
		data.description = description
		data.module_id = selectedModules

		let QuizData = JSON.stringify(data)

		//for new data registration
		await axios({
			url: `${SERVER_LINK}/quiz/create`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: login_token,
			},
			data: QuizData,
		})
			.then(() => {
				router.replace(router.asPath)
				setName('')
				setModal(!modal)
				toast.success('Quiz created!')
			})
			.catch(() => {
				toast.error('Invalid Request')
			})
	}

	return (
		<>
			<QuizPopUp
				handleSubmit={handleSubmit}
				checkWithDatabase={checkWithDatabase}
				buttonText={buttonText}
				name={name}
				setName={setName}
				modal={modal}
				setModal={setModal}
				selectedLevelId={selectedLevelId}
				setSelectedLevelId={setSelectedLevelId}
				selectedModules={selectedModules}
				setSelectedModules={setSelectedModules}
				selectedStartDate={selectedStartDate}
				setSelectedStartDate={setSelectedStartDate}
				selectedBufferDate={selectedBufferDate}
				setSelectedBufferDate={setSelectedBufferDate}
				selectedEndDate={selectedEndDate}
				setSelectedEndDate={setSelectedEndDate}
				handleLevelTypeSelect={handleLevelTypeSelect}
				handleModuleTypeSelect={handleModuleTypeSelect}
				description={description}
				setDescription={setDescription}
				moduleData={moduleData}
				levelData={levelData}
			/>
		</>
	)
}

export default QuizModal
