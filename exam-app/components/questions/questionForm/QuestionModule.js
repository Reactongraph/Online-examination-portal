import { Label } from "../../common/micro/label"

function QuestionModule(props) {
	const { moduleData, handleModuleTypeSelect, selectedModuleId } = props
	return (
		<>
			{' '}
			{/* <label
				htmlFor='default'
				className='block mb-2 text-sm font-medium text-gray-900 '>
				Question Module
			</label> */}
			<Label key={'default'}> Question Module</Label>
			<select
				id='default'
				value={selectedModuleId}
				onChange={(e) => {
					handleModuleTypeSelect(e)
				}}
				required
				className='bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'>
				<option
					value=''
					hidden>
					Select
				</option>
				{moduleData &&
					moduleData.map((response, i) => (
						<option
							key={`moduleOption-${i}`}
							value={response.id}>
							{response.module}
						</option>
					))}
			</select>
		</>
	)
}
export default QuestionModule
