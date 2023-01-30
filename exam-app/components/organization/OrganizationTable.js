import Table from '../common/Table'
import React, { useState } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { OrganizationColumns } from './organizationColumn'
import OrganizationPopUp from '../common/PopUpModals/OrganizationPopUp'
import { DeleteOrganization, EditOrganization } from '../../apis/organizations'
import { CheckboxInput } from '../common/micro/checkBoxInput'
import { ButtonComponent } from '../common/micro/buttonComponent'

const OrganizationTable = ({ data: organization_data, mutate }) => {
	// const [editForm, setEditForm] = useState(false)
	const [modal, setModal] = useState(false)
	const [organizationId, setOrganizationId] = useState('')

	const [buttonText, setButtonText] = useState('Add')

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [pincode, setPincode] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [mobile, setMobile] = useState('')
	const [quota, setQuota] = useState('')

	const [password, setPassword] = useState('')

	const { handleSubmit } = useForm()
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
		new_status = gJSON.stringify(new_status)
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
		setButtonText('Update')
		setOrganizationId(org.id)
		setModal(true)
		setName(org.name)
		setEmail(org.email)
		setMobile(org.mobile)
		setState(org.state)
		setPassword(org.password)
		setAddress(org.address)
		setCity(org.city)
		setPincode(org.pincode)
		setQuota(org.quota)
	}

	const checkWithDatabase = async (data) => {
		data.name = name
		data.email = email
		data.mobile = mobile
		data.password = password
		data.city = city
		data.state = state
		data.pincode = pincode
		data.address = address
		data.quota = quota
		let OrganizationData = JSON.stringify(data)

		// for taking the patch api data

		EditOrganization(OrganizationData, organizationId)
			.then(() => {
				setModal(!modal)
				mutate()
				toast.success('organization updated!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
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
			<OrganizationPopUp
				modal={modal}
				setModal={setModal}
				name={name}
				setName={setName}
				email={email}
				setEmail={setEmail}
				password={password}
				setPassword={setPassword}
				city={city}
				setCity={setCity}
				state={state}
				setState={setState}
				pincode={pincode}
				setPincode={setPincode}
				mobile={mobile}
				address={address}
				setAddress={setAddress}
				setMobile={setMobile}
				quota={quota}
				buttonText={buttonText}
				handleSubmit={handleSubmit}
				checkWithDatabase={checkWithDatabase}
				setQuota={setQuota}
			/>
		</>
	)
}

export default OrganizationTable
