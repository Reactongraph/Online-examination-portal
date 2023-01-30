import Table from '../common/Table'
import React from 'react'
import { useRouter } from 'next/router'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { ToastContainer, toast } from 'react-toastify'
import { QuestionColumns } from './questionColumn'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { DeleteQuestion, EditQuestion } from '../../apis/questions'
import { CheckboxInput } from '../common/micro/checkBoxInput'
import { ButtonComponent } from '../common/micro/buttonComponent'
import { BsPencilSquare } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'
// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

const QuestionTable = ({ question_data, mutate }) => {
	const router = useRouter()
	const handleRemoveClick = async (question_id) => {
		DeleteQuestion(question_id)
			.then((result) => {
				router.replace(router.asPath)
				mutate()
				toast.success(result.data)
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const handleBoxClick = async (question_id, question_status) => {
		let new_status = {
			status: !question_status,
		}
		new_status = JSON.stringify(new_status)
		EditQuestion(new_status, question_id)
			.then(() => {
				router.replace(router.asPath)
				mutate()
				toast.success('status updated!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const handleEditClick = async (question_id) => {
		router.push(`${router.asPath}/edit/${question_id}`)
	}
	const handleViewClick = async (question_id) => {
		router.push(`${router.asPath}/${question_id}`)
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
				<ButtonComponent
					className={`text-blue-500 hover:text-blue-700`}
					onClick={() => handleViewClick(question_id)}>
					<AiFillEye className='h-6 w-7' />
				</ButtonComponent>
				<ButtonComponent
					className={'text-green-500 hover:text-green-700 ml-2'}
					onClick={() => handleEditClick(question_id)}>
					<BsPencilSquare className='h-6 w-5 ' />
				</ButtonComponent>
				&nbsp;
				<ButtonComponent
					onClick={() => handleRemoveClick(question_id)}
					className={'text-red-500 hover:text-red-700  m-1'}>
					<MdDelete className='h-6 w-5' />
				</ButtonComponent>
			</>
		)
		const status = (
			<>
				<div className='flex'>
					{/* <div className="form-check form-switch"> */}
					<CheckboxInput
						onClick={() => handleBoxClick(question_id, question_status)}
						defaultChecked={question_status}
					/>
				</div>
			</>
		)
		return { question, question_type, status, level, modules, action }
	}

	const rowsDataArray = question_data?.map((element) => {
		// let question = element.question
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
