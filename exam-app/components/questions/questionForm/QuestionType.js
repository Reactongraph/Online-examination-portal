import Dropdown from '../../common/micro/dropdown'
import { Label } from '../../common/micro/label'
function QuestionType(props) {
	const { questionType, handleQuestionTypeSelect } = props
	const QuestionData = [
		{ name: 'MCQ' },
		{ name: 'TRUE/FALSE' },
		{ name: 'ONE-WORD' },
		{ name: "DON'T KNOW" },
	]
	return (
		<>
			<Label key={'default'}> Question Type</Label>
			<Dropdown
				id='default'
				value={questionType}
				required={true}
				className={
					'bg-gray-50 border  w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}
				label='Select '
				options={QuestionData}
				onChange={handleQuestionTypeSelect}
			/>
		</>
	)
}
export default QuestionType
