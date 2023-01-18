import { Label } from '../../common/micro/label'
function QuestionType(props) {
	const { questionType, handleQuestionTypeSelect } = props
	return (
		<>
			<Label key={'default'}> Question Type</Label>
			<select
				id='default'
				required
				value={questionType}
				onChange={(e) => {
					handleQuestionTypeSelect(e)
				}}
				className='bg-gray-50 border  w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'>
				<option
					value=''
					hidden>
					Select
				</option>
				<option value='MCQ'>MCQ</option>
				<option value='TRUE/FALSE'>TRUE/FALSE</option>
				<option value='ONE-WORD'>ONE-WORD</option>
				<option value="DON'T KNOW">Don{`&apos;`}t Know</option>
			</select>
		</>
	)
}
export default QuestionType
