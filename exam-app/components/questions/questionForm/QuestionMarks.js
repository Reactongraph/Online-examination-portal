import { Label } from '../../common/micro/label'
import { InputComponent } from '../../common/micro/inputComponent'

function QuestionMarks(props) {
	const { marks, setMarks, isViewOnly } = props
	return (
		<>
			<Label key={'default'}> Marks</Label>
			<InputComponent
				className={'input-style'}
				type='number'
				value={marks}
				disabled={isViewOnly}
				onChange={(e) => setMarks(e.target.value)}
				placeholder={'eg. 1 , 2 etc ...'}
			/>
		</>
	)
}
export default QuestionMarks
