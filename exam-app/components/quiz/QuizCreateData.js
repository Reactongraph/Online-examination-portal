import { ButtonComponent } from '../common/micro/buttonComponent'
import { CheckboxInput } from '../common/micro/checkBoxInput'
import { EyeIcon, ArchiveIcon } from '@heroicons/react/solid'
import { BsPencilSquare } from 'react-icons/bs'
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
				className={`text-blue-500 hover:text-blue-700`}
				onClick={() => handleViewClick(quiz_id)}>
				<EyeIcon className='h-6 ' />
			</ButtonComponent>
			<ButtonComponent
				onClick={() => handleEditClick(quiz_id, element)}
				className={'text-green-500 hover:text-green-700 ml-2'}>
				<BsPencilSquare className='h-6 w-5 ' />
			</ButtonComponent>
			&nbsp;
			<ButtonComponent
				onClick={() => handleRemoveClick(quiz_id)}
				className={'text-red-500 hover:text-red-700  m-1'}>
				<ArchiveIcon className='h-6'></ArchiveIcon>
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
