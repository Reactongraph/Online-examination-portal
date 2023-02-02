import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { ToastContainer, toast } from 'react-toastify'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { DeleteQuiz, EditQuiz } from '../../apis/quizzes'
import Table from '../common/Table'
import QuizDataArray from './QuizDataArray'
import { QuizColumns } from './quizColumn'
import { QuizContext } from '../context/context'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

const QuizTable = () => {
	const { quiz_data } = useContext(QuizContext)
	const router = useRouter()
	const handleRemoveClick = (quiz_id) => {
		DeleteQuiz(quiz_id)
			.then(() => {
				router.replace(router.asPath)

				toast.success('Quiz deleted!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const handleBoxClick = async (quiz_id, quiz_status) => {
		let new_status = {
			status: !quiz_status,
		}
		new_status = JSON.stringify(new_status)
		EditQuiz(new_status, quiz_id)
			.then(() => {
				toast.success('Quiz updated Successfully!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const handleEditClick = async (quiz_id) => {
		router.push(`${router.asPath}/edit/${quiz_id}`)
	}
	const handleViewClick = async (quiz_id) => {
		router.push(`${router.asPath}/${quiz_id}`)
	}
	// data by using which table data is creating using api call
	const data = QuizDataArray(
		quiz_data,
		handleEditClick,
		handleBoxClick,
		handleRemoveClick,
		handleViewClick
	)

	return (
		<>
			<Table
				columns={QuizColumns}
				data={data || []}
				rowKey='id'
				className='table-primary'
			/>

			<ToastContainer />
		</>
	)
}

export default QuizTable
