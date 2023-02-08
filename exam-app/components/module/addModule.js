import { useRouter } from 'next/router'
import { AddModule, EditModule } from '../../apis/modules'
import LevelModulePopup from '../common/PopUpModals/LevelModulePopUp'
import { ToastContainer, toast } from 'react-toastify'

const AddModuleComponent = ({ isViewOnly, buttonText, editform }) => {
	const router = useRouter()

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		if (editform) {
			// for taking the patch api data
			let moduleData = JSON.stringify(data)
			EditModule(moduleData, router.query?.id)
				.then(() => {
					router.replace('/module')
					toast.success('updated!')
				})
				.catch(() => {
					toast.error('invalid request')
				})
		} else {
			// for new data registration
			data.status = true
			let moduleData = JSON.stringify(data)
			AddModule(moduleData)
				.then(() => {
					router.replace('/module')
					toast.success('module created!')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		}
	}

	return (
		<>
			<LevelModulePopup
				checkWithDatabase={checkWithDatabase}
				modalName={'MODULE'}
				buttonText={buttonText}
				placeholderText={'eg. C++ , JAVA ,  etc...'}
				isViewOnly={isViewOnly || false}
			/>

			<ToastContainer />
		</>
	)
}

export default AddModuleComponent
