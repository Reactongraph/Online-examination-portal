import LevelModulePopup from '../common/PopUpModals/LevelModulePopUp'
import { AddLevel, EditLevel } from '../../apis/levels'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const AddLevelComponent = ({ isViewOnly, buttonText, editform }) => {
	const router = useRouter()

	const checkWithDatabase = async (data) => {
		// for taking the patch api data

		if (editform) {
			let LevelData = JSON.stringify(data)

			EditLevel(LevelData, router.query?.id)
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
			<LevelModulePopup
				checkWithDatabase={checkWithDatabase}
				modalName={'LEVEL'}
				buttonText={buttonText}
				placeholderText={'eg. Easy , Moderate , etc ...'}
				isViewOnly={isViewOnly || false}
			/>
		</>
	)
}
export default AddLevelComponent
