import React from 'react'
import OrganizationModal from '../common/form_modals/organization_modal'

const CreateOrganization = ({
	isViewOnly,
	buttonText,
	isEdit,
	organizationId,
}) => {
	return (
		<>
			<main>
				<OrganizationModal
					buttonText={buttonText}
					isViewOnly={isViewOnly || false}
					organizationId={organizationId}
					isEdit={isEdit}
				/>
			</main>
		</>
	)
}
export default CreateOrganization
