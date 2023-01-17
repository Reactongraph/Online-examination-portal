import { Label } from "../../common/micro/label"

function TimeLimit(props) {
	const { timeLimitSelect, handleTimeLimitSelect } = props
	return (
		<>
			{/* <label
				htmlFor='default'
				className='block mb-2 text-sm font-medium text-gray-900 '>
				Time Limit
			</label> */}
			<Label key={'default'}> Time Limit</Label>
			<select
				id='default'
				value={timeLimitSelect}
				onChange={handleTimeLimitSelect}
				required
				className='bg-gray-50 border  w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'>
				<option
					value=''
					hidden>
					Select
				</option>
				<option value='10 Seconds'>10 Seconds</option>
				<option value='20 Seconds'>20 Seconds</option>
				<option value='30 Seconds'>30 Seconds</option>
				<option value='40 Seconds'>40 Seconds</option>
			</select>
		</>
	)
}
export default TimeLimit
