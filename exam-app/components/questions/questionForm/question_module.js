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
				className={'input-style'}
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
