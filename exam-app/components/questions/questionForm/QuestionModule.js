import Dropdown from '../../common/micro/dropdown'
import { Label } from '../../common/micro/label'

function QuestionModule(props) {
	const { moduleData, handleModuleTypeSelect, selectedModuleId } = props
	return (
		<>
			<Label key={'default'}> Question Module</Label>
			<Dropdown
				id='default'
				value={selectedModuleId}
				required={true}
				className={
					'bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}
				label='Select '
				options={moduleData}
				onChange={(e) => {
					handleModuleTypeSelect(e)
				}}
			/>
		</>
	)
}
export default QuestionModule
