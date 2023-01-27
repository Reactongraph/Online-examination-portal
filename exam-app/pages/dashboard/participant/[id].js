import * as React from 'react'
// import Layout from '../../../../components/layout/Layout'
import Layout from '../../../components/layout/Layout'
// import CreateParticipant from '../../../../components/participant/addParticipant'
import CreateParticipant from '../../../components/participant/addParticipant'
export default function ViewParticipantPage() {
	return (
		<>
			<Layout>
				<CreateParticipant isViewOnly={true} />
			</Layout>
		</>
	)
}
