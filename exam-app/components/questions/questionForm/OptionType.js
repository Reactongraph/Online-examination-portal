import { Label } from "../../common/micro/label"

function OptionType(props) {
	const { optionType, handleOptionTypeSelect } = props
	return (
		<>
			{' '}
			{/* <label
				htmlFor='default'
				className='block mb-2 text-sm font-medium text-gray-900 '>
				Option Type
			</label> */}
			<Label key={'default'}> Option Type</Label>
			<select
				id='default'
				value={optionType}
				onChange={handleOptionTypeSelect}
				required
				className='bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'>
				<option
					value=''
					hidden>
					Select
				</option>
				<option
					selected
					value='Single'>
					Single
				</option>
				<option value='Multiple'>Multiple</option>
			</select>
		</>
	)
}
export default OptionType
