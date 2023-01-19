import { components } from 'react-select'
import { TextInput } from '../../micro/textinput'
const Option = (props) => {
	return (
		<div>
			<components.Option {...props}>
				<TextInput
					type='checkbox'
					checked={props.isSelected}
					onChange={() => null}
				/>{' '}
				<label>{props.label}</label>
			</components.Option>
		</div>
	)
}
export default Option
