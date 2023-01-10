import Table from '../common/Table'
import React, { useState } from 'react'
import axios from 'axios'
import { SERVER_LINK } from '../../helpers/config'
import { useRouter } from 'next/router'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { OrganizationColumns } from './organizationColumn'
import OrganizationPopUp from '../common/PopUpModals/OrganizationPopUp'

const OrganizationTable = ({ org_data }) => {
	const router = useRouter()
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
	const login_token = useSelector((state) => state.user.token)
	const handleRemoveClick = (org_id) => {
		axios
			.delete(`${SERVER_LINK}/organization/${org_id}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then(() => {
				router.replace(router.asPath)
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	const handleBoxClick = async (org_id, org_status) => {
		let new_status = {
			status: !org_status,
		}
		new_status = JSON.stringify(new_status)
		await axios
			.patch(`${SERVER_LINK}/organization/${org_id}`, new_status, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then(() => {
				router.replace(router.asPath)
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}
	const handleEditClick = async (org_id) => {
		setButtonText('Update')
		setEditForm(true)
		setOrganizationId(org_id)
		setModal(true)
		// first find the user with the id
		await axios
			.get(`${SERVER_LINK}/organization/${org_id}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then((response) => {
				let singleOrgData = response.data
				setName(singleOrgData.name)
				setEmail(singleOrgData.email)
				setMobile(singleOrgData.mobile)
				setState(singleOrgData.state)
				setPassword(singleOrgData.password)
				setAddress(singleOrgData.address)
				setCity(singleOrgData.city)
				setPincode(singleOrgData.pincode)
				setQuota(singleOrgData.quota)
			})
			.catch(() => {
				toast.error('invalid request')
			})
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
			await axios
				.patch(
					`${SERVER_LINK}/organization/${organizationId}`,
					OrganizationData,
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json;charset=UTF-8',
							Authorization: login_token,
						},
					}
				)
				.then(() => {
					setModal(!modal)
					router.replace(router.asPath)
				})
				.catch(() => {
					toast.error('invalid request')
				})
		}

		// for new data registration
		else {
			await axios({
				url: `${SERVER_LINK}/organization`,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
				data,
			})
				.then(() => {
					setModal(!modal)
					router.replace(router.asPath)
				})
				.catch(() => {
					toast.error('invalid request')
				})
		}
	}

	function createData(name, email, org_id, org_status) {
		const action = (
			<>
				<button
					onClick={() => handleEditClick(org_id)}
					className='bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'>
					Edit
				</button>
				&nbsp;
				<button
					onClick={() => handleRemoveClick(org_id)}
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
					Delete
				</button>
			</>
		)
		const status = (
			<>
				<div className='flex '>
					<input
						onClick={() => handleBoxClick(org_id, org_status)}
						className='form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm'
						type='checkbox'
						role='switch'
						id='flexSwitchCheckDefault'
						defaultChecked={org_status}
					/>
				</div>
			</>
		)
		return { name, email, status, action }
	}

	const rowsDataArray = org_data.map((element) => {
		let name = element.name
		let email = element.email
		let org_id = element.id
		let org_status = element.status
		return createData(name, email, org_id, org_status)
	})

	const data = rowsDataArray

	return (
		<>
			<Table
				columns={OrganizationColumns}
				data={data}
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
