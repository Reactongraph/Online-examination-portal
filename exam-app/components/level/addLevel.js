import { useEffect, useState } from 'react'
import LevelModulePopup from '../common/PopUpModals/LevelModulePopUp'
import { useForm } from 'react-hook-form'
import { AddLevel, EditLevel, GetLevelDataWithId } from '../../apis/levels'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const AddLevelComponent = () => {
	const router = useRouter()
	const [editForm, setEditForm] = useState(false)

	const [buttonText, setButtonText] = useState('Add')
	const [level, setLevel] = useState()

	const { handleSubmit } = useForm()

	// for checking if it is a edit request
	useEffect(() => {
		let level_id = router.query?.id

		async function getLevelData() {
			const results = await GetLevelDataWithId(level_id)
			const levelData = results.data
			setButtonText('Update')
			setEditForm(true)
			setLevel(levelData?.level)
		}

		if (level_id) {
			getLevelData()
		}
	}, [router.query?.id])

	const checkWithDatabase = async (data) => {
		data.level = level

		// for taking the patch api data

		if (editForm) {
			let LevelData = JSON.stringify(data)

			EditLevel(LevelData, router.query?.id)
				.then(() => {
					router.replace('/dashboard/level')
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
					router.replace('/dashboard/level')
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
				setStateName={setLevel}
				stateName={level}
				checkWithDatabase={checkWithDatabase}
				handleSubmit={handleSubmit}
				modalName={'LEVEL'}
				buttonText={buttonText}
				placeholderText={'eg. Easy , Moderate , etc ...'}
			/>
		</>
	)
}
export default AddLevelComponent
