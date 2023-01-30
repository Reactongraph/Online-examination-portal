import * as React from 'react'
<<<<<<< HEAD

import Layout from '../../../components/layout/Layout'
import AddLevelComponent from '../../../components/level/addLevel'

export default function EditLevels() {
	return (
		<>
			<Layout title='Edit level'>
=======
import AddLevelComponent from '../../components/level/addLevel'
import Layout from '../../components/layout/Layout'

export default function AddLevels() {
	return (
		<>
			<Layout title='Add New level'>
>>>>>>> 6ca649c (merge feature/routing-for-level-modal)
				<AddLevelComponent />
			</Layout>
		</>
	)
}
