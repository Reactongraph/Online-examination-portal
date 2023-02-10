import LevelModuleModal from '../common/form_modals/level_module_modal'
import { AddLevel, EditLevel } from '../../apis/levels'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const AddLevelComponent = ({ isViewOnly, buttonText, editform, LevelId }) => {
	const router = useRouter()

	const checkWithDatabase = async (data) => {
		// for taking the patch api data

		if (editform) {
			let LevelData = JSON.stringify(data)

			EditLevel(LevelData, LevelId)
				.then(() => {
					router.replace('/level')
					toast.success('level updated!')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		} else {
			// for new data registration
			data.status = true
			let LevelData = JSON.stringify(data)

			AddLevel(LevelData)
				.then(() => {
					toast.success('level inserted')
					router.replace('/level')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		}
	}
	return (
		<>
			{' '}
			<LevelModuleModal
				checkWithDatabase={checkWithDatabase}
				modalName={'LEVEL'}
				buttonText={buttonText}
				placeholderText={'eg. Easy , Moderate , etc ...'}
				isViewOnly={isViewOnly || false}
				ModelId={LevelId}
			/>
		</>
	)
}
export default AddLevelComponent
