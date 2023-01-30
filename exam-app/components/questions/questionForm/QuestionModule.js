import Dropdown from '../../common/micro/dropdown'

function QuestionModule(props) {
	const { moduleData, handleModuleTypeSelect, selectedModuleId, isViewOnly } =
		props
	return (
		<>
			<Dropdown
				id='default'
				labelText={'Question Module '}
				value={selectedModuleId}
				required={true}
				disabled={isViewOnly}
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
