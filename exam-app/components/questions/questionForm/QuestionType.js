import Dropdown from '../../common/micro/dropdown'
import { QuestionTypeData } from '../../DropDownData/questionTypeData'
function QuestionType(props) {
	const { questionType, handleQuestionTypeSelect, isViewOnly } = props
	return (
		<>
			<Dropdown
				id='default'
				labelText={'Question Type '}
				value={questionType}
				required={true}
				className={'input-style'}
				label='Select '
				disabled={isViewOnly}
				options={QuestionTypeData}
				onChange={handleQuestionTypeSelect}
			/>
		</>
	)
}
export default QuestionType
