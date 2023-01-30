<<<<<<< HEAD
import * as React from 'react'
import Layout from '../../../components/layout/Layout'
import CreateParticipant from '../../../components/participant/addParticipant'
export default function EditParticipantPage() {
	return (
		<>
			<Layout title='Edit Participant'>
=======
// this is create participant page
import * as React from 'react'
import Layout from '../../components/layout/Layout'
import CreateParticipant from '../../components/participant/addParticipant'

export default function AddParticipantPage() {
	return (
		<>
			<Layout title='Add Patricipant'>
>>>>>>> ad71f06 (merge feature/routing-for-participant-modal)
				<CreateParticipant />
			</Layout>
		</>
	)
}
