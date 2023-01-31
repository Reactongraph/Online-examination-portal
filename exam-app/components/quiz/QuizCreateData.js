import { ButtonComponent } from '../common/micro/buttonComponent'
import { CheckboxInput } from '../common/micro/checkBoxInput'
import { BsPencilSquare } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { AiFillEye } from 'react-icons/ai'
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
	handleBoxClick,
	handleViewClick
) {
	const action = (
		<>
			<ButtonComponent
				className={`icon-view`}
				onClick={() => handleViewClick(quiz_id)}>
				<AiFillEye className='h-6 w-7' />
			</ButtonComponent>
			<ButtonComponent
				onClick={() => handleEditClick(quiz_id, element)}
				className={'icon-edit'}>
				<BsPencilSquare className='h-6 w-7 ' />
			</ButtonComponent>
			&nbsp;
			<ButtonComponent
				onClick={() => handleRemoveClick(quiz_id)}
				className={'icon-delete'}>
				<MdDelete className='h-6 w-7'></MdDelete>
			</ButtonComponent>
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
