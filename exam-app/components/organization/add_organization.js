import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
	AddOrganization,
	EditOrganization,
	GetOrganizationDataWithId,
} from '../../apis/organizations'
import { useRouter } from 'next/router'
import OrganizationPopUp from '../common/PopUpModals/OrganizationPopUp'

const CreateOrganization = ({ isViewOnly }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [pincode, setPincode] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [mobile, setMobile] = useState('')
	const [quota, setQuota] = useState('')
	const [buttonText, setButtonText] = useState('Add')
	const [password, setPassword] = useState('')
	const [editform, setEditForm] = useState(false)
	const { handleSubmit } = useForm()
	const router = useRouter()

	useEffect(() => {
		async function getOrganizationData() {
			let organizationId = router.query?.id
			const result = await GetOrganizationDataWithId(organizationId)

			const singleOrgData = result.data

			setEditForm(true)
			setName(singleOrgData?.name)
			setEmail(singleOrgData?.email)
			setMobile(singleOrgData?.mobile)
			setState(singleOrgData?.state)
			setPassword(singleOrgData?.password)
			setAddress(singleOrgData?.address)
			setCity(singleOrgData?.city)
			setPincode(singleOrgData?.pincode)
			setQuota(singleOrgData?.quota)
			isViewOnly ? setButtonText('View') : setButtonText('Edit')
		}
		if (router.query.id) {
			getOrganizationData()
		}
	}, [router.query?.id])
	// for sending the data to the backend
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
		if (editform) {
			let OrganizationData = JSON.stringify(data)

			EditOrganization(OrganizationData, router.query.id)
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
				<OrganizationPopUp
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
					isViewOnly={isViewOnly || false}></OrganizationPopUp>
			</main>
		</>
	)
}
export default CreateOrganization
