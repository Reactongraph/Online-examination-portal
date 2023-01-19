import Dropdown from '../../common/micro/dropdown'
import { Label } from '../../common/micro/label'

function OptionType(props) {
	const { optionType, handleOptionTypeSelect } = props
	const optionData = [{ name: 'Single' }, { name: 'Multiple' }]
	return (
		<>
			<Label key={'default'}> Option Type</Label>
			<Dropdown
				id='default'
				value={optionType}
				required={true}
				className={
					'bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}
				label='Select '
				options={optionData}
				onChange={handleOptionTypeSelect}
			/>
		</>
	)
}
export default OptionType
