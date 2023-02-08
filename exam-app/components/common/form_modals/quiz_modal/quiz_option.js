import { components } from 'react-select'
import { InputComponent } from '../../micro/input'
const Option = (props) => {
	return (
		<div>
			<components.Option {...props}>
				<InputComponent
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
