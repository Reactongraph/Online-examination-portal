import LevelModuleModal from '../common/form_modals/level_module_modal'
import checkWithDatabase from '../common/database_function'

const AddLevelComponent = ({ isViewOnly, buttonText, editform, levelId }) => {
	return (
		<>
			{' '}
			<LevelModuleModal
				checkWithDatabase={checkWithDatabase}
				modalName={'LEVEL'}
				buttonText={buttonText}
				placeholderText={'eg. Easy , Moderate , etc ...'}
				isViewOnly={isViewOnly || false}
				modalId={levelId}
				editform={editform}
				levelId={levelId}
			/>
		</>
	)
}
export default AddLevelComponent
