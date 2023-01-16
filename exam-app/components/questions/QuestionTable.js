import Table from '../common/Table'
import React from 'react'
import { useRouter } from 'next/router'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { QuestionColumns } from './questionColumn'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { DeleteQuestion, EditQuestion } from '../../apis/questions'
// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

const QuestionTable = ({ question_data }) => {
	const router = useRouter()
	const user = useSelector((state) => state?.user)
	const handleRemoveClick = async (question_id) => {
		DeleteQuestion(question_id, user?.token)
			.then((result) => {
				router.replace(router.asPath)
				toast.success(result.data)
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const handleBoxClick = async (question) => {
		let new_status = {
			status: !question.status,
		}
		new_status = JSON.stringify(new_status)
		EditQuestion(question, question.id, user?.token)
			.then(() => {
				router.replace(router.asPath)
				toast.success('status updated!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const handleEditClick = async (question_id) => {
		router.push(`/dashboard/questions/addQuestion?question_id=${question_id}`)
	}

	function createData(
		question,
		question_type,
		level,
		modules,
		question_id,
		question_status
	) {
		question = question.question.slice(0, 15) + '...'
		const action = (
			<>
				<button
					onClick={() => handleEditClick(question_id)}
					className='bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'>
					Edit
				</button>
				&nbsp;
				<button
					onClick={() => handleRemoveClick(question_id)}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
					Delete
				</button>
			</>
		)
		const status = (
			<>
				<div className='flex'>
					{/* <div className="form-check form-switch"> */}
					<input
						onClick={() => handleBoxClick(question)}
						className='form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-gray-300 bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm'
						type='checkbox'
						role='switch'
						id='flexSwitchCheckDefault'
						defaultChecked={question.status}
					/>
				</div>
			</>
		)
		return { question, question_type, status, level, modules, action }
	}

	const rowsDataArray = question_data?.map((element) => {
		let question = element.question
		let question_type = element.question_type
		let level = element?.level?.level
		let modules = element?.module?.module
		let question_id = element.id
		let question_status = element.status
		return createData(
			element,
			question_type,
			level,
			modules,
			question_id,
			question_status
		)
	})

	// data by using which table data is creating using api call
	const data = rowsDataArray

	return (
		<>
			<Table
				columns={QuestionColumns}
				data={data || []}
				rowKey='id'
				className='bg-white table-auto p-1 w-full text-center rc-table-custom font-semibold hover:table-fixed'
			/>

			<ToastContainer />
		</>
	)
}

export default QuestionTable
