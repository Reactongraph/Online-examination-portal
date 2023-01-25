import { useState } from 'react'
import LevelModulePopup from '../common/PopUpModals/LevelModulePopUp'
import { useForm } from 'react-hook-form'
import { AddLevel } from '../../apis/levels'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const AddLevelComponent = () => {
	// const [modal, setModal] = useState(false)
	const router = useRouter()
	const [levelId, setLevelId] = useState('')

	const [buttonText, setButtonText] = useState('Add')
	const [level, setLevel] = useState('')

	const { handleSubmit } = useForm()

	const checkWithDatabase = async (data) => {
		data.status = true
		data.level = level

		let LevelData = JSON.stringify(data)

		// for taking the patch api data
		AddLevel(LevelData)
			.then(() => {
				toast.success('level inserted')

				router.replace('/dashboard/level')
				// setLevel('')
				// setModal(!modal)
				// mutate()
			})
			.catch((err) => {
				console.log(err)
				toast.error('Invalid Request')
			})

		// for new data registration
	}
	return (
		<>
			{' '}
			<LevelModulePopup
				setStateName={setLevel}
				stateName={level}
				checkWithDatabase={checkWithDatabase}
				handleSubmit={handleSubmit}
				// setModal={setModal}
				// modal={modal}
				modalName={'LEVEL'}
				buttonText={buttonText}
				placeholderText={'eg. Easy , Moderate , etc ...'}
			/>
		</>
	)
}
export default AddLevelComponent
