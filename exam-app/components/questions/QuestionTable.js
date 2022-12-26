import Table from './Table'
import React from 'react'
import axios from 'axios'
import { SERVER_LINK } from '../../helpers/config'
import { useRouter } from 'next/router'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

const QuestionTable = ({ question_data }) => {
	const router = useRouter()
	const login_token = useSelector((state) => state.user.token)
	const handleRemoveClick = async (question_id) => {
		await axios
			.delete(`${SERVER_LINK}/questions/${question_id}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then(() => {
				router.replace(router.asPath)
			})
			.catch((err) => {
				return err
			})
	}

	const handleBoxClick = async (question_id, question_status) => {
		let new_status = {
			status: !question_status,
		}
		new_status = JSON.stringify(new_status)
		await axios
			.patch(`${SERVER_LINK}/questions/${question_id}`, new_status, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then(() => {
				router.replace(router.asPath)
			})
			.catch((err) => {
				return err
			})
	}

	const handleEditClick = async (question_id) => {
		router.push(`/dashboard/questions/addQuestion?question_id=${question_id}`)
	}

	function createData(
		question,
		question_type,
		question_id,
		question_status,
		level,
		modules
	) {
		question = question.slice(0, 15) + '...'
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
						onClick={() => handleBoxClick(question_id, question_status)}
						className='form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-gray-300 bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm'
						type='checkbox'
						role='switch'
						id='flexSwitchCheckDefault'
						defaultChecked={question_status}
					/>
				</div>
			</>
		)
		return { question, question_type, status, action, level, modules }
	}

	const rowsDataArray = question_data.map((element) => {
		let question = element.question
		let question_type = element.question_type
		let level = element?.level?.level
		let modules = element?.module?.module
		let question_id = element.id
		let question_status = element.status
		return createData(
			question,
			question_type,
			question_id,
			question_status,
			level,
			modules
		)
	})

	const columns = [
		{
			Header: 'Question',
			accessor: 'question',
			title: 'question',
			dataIndex: 'question',
			key: 'question',
			width: 400,
			className: 'text-white bg-gray-800 p-2 border-r-2 border-b-2',
			rowClassName: 'bg-black-ripon',
		},
		{
			Header: 'Question Type',
			accessor: 'question_type',
			title: 'question_type',
			dataIndex: 'question_type',
			key: 'question_type',
			width: 400,
			className: 'text-white bg-gray-800 p-2 border-r-2 border-b-2',
			rowClassName: 'bg-black-ripon',
		},
		{
			Header: 'Level',
			accessor: 'level',
			title: 'level',
			dataIndex: 'level',
			key: 'level',
			width: 400,
			className: 'text-white bg-gray-800 p-2 border-r-2 border-b-2',
			rowClassName: 'bg-black-ripon',
		},
		{
			Header: 'Module',
			accessor: 'modules',
			title: 'modules',
			dataIndex: 'modules',
			key: 'modules',
			width: 400,
			className: 'text-white bg-gray-800 p-2 border-r-2 border-b-2',
			rowClassName: 'bg-black-ripon',
		},

		{
			Header: 'Status',
			accessor: 'status',
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: 400,
			className: 'text-white bg-gray-800 p-2 border-r-2 border-b-2',
		},
		{
			Header: 'Action',
			accessor: 'action',
			title: 'Action',
			dataIndex: 'action',
			key: 'operations',
			width: 250,
			className: 'text-white bg-gray-600 p-2 border-b-2',
		},
	]

	// data by using which table data is creating using api call
	const data = rowsDataArray

	return (
		<>
			<Table
				columns={columns}
				data={data}
				rowKey='id'
				className='bg-white table-auto p-1 w-full text-center rc-table-custom font-semibold hover:table-fixed'
			/>

			<ToastContainer />
		</>
	)
}

export default QuestionTable
