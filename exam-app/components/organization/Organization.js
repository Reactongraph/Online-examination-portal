import React from 'react'
import PageComponentTitle from '../common/PageComponentTitle'
import OrganizationTable from './OrganizationTable'

const Organization = ({ organization_data, mutate }) => {
	return (
		<main className='p-6 sm:p-10 space-y-6'>
			<div className='flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between'>
				<PageComponentTitle
					title='ORGANIZATION'
					titleDescription='List of all organization'
					buttonTitle='ADD ORAGANIZATION'
					editForm={false}
				/>
			</div>

			<section className='grid md:grid-cols-1 xl:grid-cols-1 gap-6'>
				<div className='flex-grow items-center p-8 bg-white shadow rounded-lg'>
					<OrganizationTable organization_data={organization_data}
						mutate={mutate} />
				</div>
			</section>
		</main>
	)
}

export default Organization
