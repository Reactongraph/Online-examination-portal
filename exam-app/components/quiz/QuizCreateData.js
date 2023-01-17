import { CheckboxInput } from '../common/micro/checkBoxInput'
function QuizCreateData(
	quiz,
	element,
	quiz_id,
	quiz_status,
	modules,
	level,
	end_date,
	start_date,
	handleEditClick,
	handleRemoveClick,
	handleBoxClick
) {
	const action = (
		<>
			<button
				onClick={() => handleEditClick(quiz_id, element)}
				className='bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'>
				Edit
			</button>
			&nbsp;
			<button
				onClick={() => handleRemoveClick(quiz_id)}
				className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
				Delete
			</button>
		</>
	)
	const status = (
		<>
			<div className='flex'>
				<CheckboxInput
					onClick={() => handleBoxClick(quiz_id, quiz_status)}
					defaultChecked={quiz_status}
				/>
			</div>
		</>
	)
	return { quiz, status, action, modules, level, end_date, start_date }
}

export default QuizCreateData
