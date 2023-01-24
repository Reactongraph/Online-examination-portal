/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import OrganizationPopUp from '../common/PopUpModals/OrganizationPopUp'
import { AddOrganization } from '../../apis/organizations'
import { OrganizationContext } from '../context'

const OrganizationModal = ({ modal, setModal }) => {
	const { mutate } = useContext(OrganizationContext)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [pincode, setPincode] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [mobile, setMobile] = useState('')
	const [quota, setQuota] = useState('')

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
				setModal(!modal)
				mutate()
				toast.success('organization added!')
			})
			.catch(() => {
				toast.error('invalid request')
			})
	}

	return (
		<>
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

export default OrganizationModal
