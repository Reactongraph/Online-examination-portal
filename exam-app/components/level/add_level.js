import LevelModulePage from '../common/form_modals/level_module_page'

const AddLevelComponent = ({ isViewOnly, buttonText, isEdit, levelId }) => {
	return (
		<>
			{' '}
			<LevelModulePage
				modalName={'LEVEL'}
				buttonText={buttonText}
				placeholderText={'eg. Easy , Moderate , etc ...'}
				isViewOnly={isViewOnly || false}
				modalId={levelId}
				isEdit={isEdit}
			/>
		</>
	)
}
export default AddLevelComponent
