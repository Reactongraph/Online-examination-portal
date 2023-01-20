import { Label } from '../../common/micro/label'
import { InputComponent } from '../../common/micro/inputComponent'

function QuestionMarks(props) {
	const { marks, setMarks } = props
	return (
		<>
			<Label key={'default'}> Marks</Label>
			<InputComponent
				className={
					'bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}
				type='number'
				value={marks}
				onChange={(e) => setMarks(e.target.value)}
				placeholder={'eg. 1 , 2 etc ...'}
			/>
		</>
	)
}
export default QuestionMarks
