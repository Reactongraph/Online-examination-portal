import * as React from 'react'
import Layout from '../../../../components/layout/Layout'
import CreateParticipant from '../../../../components/participant/addParticipant'
export default function EditPage() {
	return (
		<>
			<Layout>
				<CreateParticipant isViewOnly={false} />
			</Layout>
		</>
	)
}
