import Table from '../common/Table'
import React from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { toast } from 'react-toastify'
import { OrganizationColumns } from './organizationColumn'
import { DeleteOrganization, EditOrganization } from '../../apis/organizations'
import { CheckboxInput } from '../common/micro/checkBoxInput'
import { ButtonComponent } from '../common/micro/buttonComponent'
import { useRouter } from 'next/router'

const OrganizationTable = ({ data: organization_data, mutate }) => {
	const router = useRouter()

	const handleRemoveClick = (org_id) => {
		try {
			DeleteOrganization(org_id)
				.then(() => {
					mutate()
					toast.success('organization deleted!')
				})
				.catch(() => {
					toast.error('invalid request')
				})
		} catch (error) {
			toast.error('invalid request')
		}
	}

	const handleBoxClick = async (org) => {
		let new_status = {
			status: !org.status,
		}
		new_status = JSON.stringify(new_status)
		EditOrganization(new_status, org.id)
			.then(() => {
				mutate()
				toast.success('organization updated!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}
	const handleEditClick = async (org) => {
		router.push(`${router.asPath}/edit/${org.id}`)
	}

	function createData(org) {
		const action = (
			<>
				<ButtonComponent
					onClick={() => handleEditClick(org)}
					className={
						'bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'
					}>
					Edit
				</ButtonComponent>
				&nbsp;
				<ButtonComponent
					onClick={() => handleRemoveClick(org.id)}
					className={
						'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
					}>
					Delete
				</ButtonComponent>
			</>
		)
		const status = (
			<>
				<div className='flex '>
					<CheckboxInput
						onClick={() => handleBoxClick(org)}
						defaultChecked={org.status}
					/>
				</div>
			</>
		)
		return {
			name: org.name,
			email: org.email,
			status: status,
			mobile: org.mobile,
			action,
		}
	}
	const rowsDataArray = organization_data?.map((element) => {
		return createData(element)
	})

	const data = rowsDataArray

	return (
		<>
			<Table
				columns={OrganizationColumns}
				data={data || []}
				rowKey='id'
				className='bg-white table-auto p-1 w-full text-center rc-table-custom font-semibold hover:table-fixed'
			/>
		</>
	)
}

export default OrganizationTable
