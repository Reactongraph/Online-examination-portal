import Dropdown from '../../common/micro/dropdown'
import { QuestionTypeData } from '../../drop_down_data/question_type_data'
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
