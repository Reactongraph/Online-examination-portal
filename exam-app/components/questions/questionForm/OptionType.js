import Dropdown from '../../common/micro/dropdown'
import { QuestionOptionType } from '../../DropDownData/QuestionOptionType'

function OptionType(props) {
	const { optionType, handleOptionTypeSelect, isViewOnly } = props
	return (
		<>
			<Dropdown
				id='default'
				labelText={'Option Type '}
				value={optionType}
				required={true}
				disabled={isViewOnly}
				className={'input-style'}
				label='Select '
				options={QuestionOptionType}
				onChange={handleOptionTypeSelect}
			/>
		</>
	)
}
export default OptionType
