import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AddOrganization } from '../../apis/organizations'
import OrganizationForm from './organizationForms/OrganizationForm'

const CreateOrganization = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [pincode, setPincode] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [mobile, setMobile] = useState('')
	const [quota, setQuota] = useState('')
	const [pageTitle, setPageTitle] = useState('Add')

	const buttonText = 'Add'

	const [password, setPassword] = useState('')

	const { handleSubmit } = useForm()

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.status = true
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

		// for new data registration

		AddOrganization(OrganizationData)
			.then(async () => {
				toast.success('organization added!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}
	return (
		<>
			<main>
				<OrganizationForm
					handleSubmit={handleSubmit}
					checkWithDatabase={checkWithDatabase}
					pageTitle={pageTitle}
					name={name}
					password={password}
					city={city}
					state={state}
					pincode={pincode}
					address={address}
					mobile={mobile}
					quota={quota}
					buttonText={buttonText}
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

// password,city,state,pincode,address,mobile,quota,buttonText
