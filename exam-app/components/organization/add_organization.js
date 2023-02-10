import React from 'react'
import { toast } from 'react-toastify'
import { AddOrganization, EditOrganization } from '../../apis/organizations'
import { useRouter } from 'next/router'
import OrganizationModal from '../common/form_modals/organization_modal'

const CreateOrganization = ({ isViewOnly, buttonText, editform, OrganizationId }) => {
	const router = useRouter()

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		if (editform) {
			let OrganizationData = JSON.stringify(data)

			EditOrganization(OrganizationData, OrganizationId)
				.then(async () => {
					toast.success('organization updated')
					router.replace(`/organization`)
				})
				.catch(() => {
					toast.error('invalid request')
				})
		}
		// for new data registration
		else {
			data.status = true

			let OrganizationData = JSON.stringify(data)

			AddOrganization(OrganizationData)
				.then(async () => {
					toast.success('organization added!')
					router.replace(`/organization`)
				})
				.catch(() => {
					toast.error('invalid request')
				})
		}
	}
	return (
		<>
			<main>
				<OrganizationModal
					buttonText={buttonText}
					checkWithDatabase={checkWithDatabase}
					isViewOnly={isViewOnly || false}
					OrganizationId={OrganizationId}
				/>
			</main>
		</>
	)
}
export default CreateOrganization
