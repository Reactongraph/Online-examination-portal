import { Label } from "../../common/micro/label"

function QuestionLevel(props) {
	const { selectedLevelId, handleLevelTypeSelect, levelData } = props
	return (
		<>
			{/* <label
				htmlFor='default'
				className='block mb-2 text-sm font-medium text-gray-900 '>
				Question Level
			</label> */}
			<Label key={'default'}> Question Level</Label>
			<select
				id='default'
				value={selectedLevelId}
				onChange={(e) => {
					handleLevelTypeSelect(e)
				}}
				required
				className='bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'>
				<option
					value=''
					hidden>
					Select
				</option>
				{levelData &&
					levelData.map((response, i) => (
						<option
							key={`levelOption-${i}`}
							value={response.id}>
							{response.level}
						</option>
					))}
			</select>
		</>
	)
}
export default QuestionLevel
