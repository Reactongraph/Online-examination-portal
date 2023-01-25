import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
	AddOrganization,
	EditOrganization,
	GetOrganizationDataWithId,
} from '../../apis/organizations'
import OrganizationForm from './organizationForms/OrganizationForm'
import { useRouter } from 'next/router'

const CreateOrganization = () => {
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
		let organization_id = router.query.id

		async function getOrganizationData() {
			const results = await GetOrganizationDataWithId(organization_id)
			const organizationData = results.data
			setButtonText('Edit')
			setEditForm(true)
			setName(organizationData?.name)
			setEmail(organizationData?.email)
			setMobile(organizationData?.mobile)
			setState(organizationData?.state)
			setPassword(organizationData?.password)
			setAddress(organizationData?.address)
			setCity(organizationData?.city)
			setPincode(organizationData?.pincode)
			setQuota(organizationData?.quota)
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
					router.replace(`/dashboard/organization`)
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
					router.replace(`/dashboard/organization`)
				})
				.catch(() => {
					toast.error('invalid request')
				})
		}
	}
	return (
		<>
			<main>
				<OrganizationForm
					handleSubmit={handleSubmit}
					checkWithDatabase={checkWithDatabase}
					name={name}
					password={password}
					city={city}
					state={state}
					pincode={pincode}
					address={address}
					mobile={mobile}
					quota={quota}
					buttonText={buttonText}
					email={email}
					setEmail={setEmail}
					setAddress={setAddress}
					setCity={setCity}
					setMobile={setMobile}
					setName={setName}
					setPassword={setPassword}
					setState={setState}
					setPincode={setPincode}
					setQuota={setQuota}></OrganizationForm>
			</main>
		</>
	)
}
export default CreateOrganization
