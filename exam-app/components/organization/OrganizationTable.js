import Table from '../common/Table'
import React, { useState } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { OrganizationColumns } from './organizationColumn'
import OrganizationPopUp from '../common/PopUpModals/OrganizationPopUp'
import {
	DeleteOrganization,
	EditOrganization,
	GetOrganizationDataWithId,
} from '../../apis/organizations'

const OrganizationTable = ({ organization_data, mutate }) => {
	const [editForm, setEditForm] = useState(false)
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
	const user = useSelector((state) => state?.user)
	const handleRemoveClick = (org_id) => {
		try {
			DeleteOrganization(org_id, user?.token)
			mutate()
			toast.success('Organization deleted!')
		} catch (error) {
			toast.error('invalid request')
		}
	}

	const handleBoxClick = async (org) => {
		let new_status = {
			status: !org.status,
		}
		new_status = JSON.stringify(new_status)
		EditOrganization(new_status, org.id, user?.token)
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
		setEditForm(true)
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
		if (editForm) {
			EditOrganization(OrganizationData, organizationId, user?.token)
				.then(() => {
					setModal(!modal)
					mutate()
					toast.success('organization updated!')
				})
				.catch(() => {
					toast.error('invalid request')
				})
		}

		// for new data registration
		else {
			AddOrganization(data, user?.token)
				.then(async () => {
					setModal(!modal)
					mutate()
					toast.success('organization added!')
				})
				.catch(() => {
					toast.error('invalid request')
				})
		}
	}

	function createData(org) {
		const action = (
			<>
				<button
					onClick={() => handleEditClick(org)}
					className='bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'>
					Edit
				</button>
				&nbsp;
				<button
					onClick={() => handleRemoveClick(org.id)}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
					Delete
				</button>
			</>
		)
		const status = (
			<>
				<div className='flex '>
					<input
						onClick={() => handleBoxClick(org)}
						className='form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm'
						type='checkbox'
						role='switch'
						id='flexSwitchCheckDefault'
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
