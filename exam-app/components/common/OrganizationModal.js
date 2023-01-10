/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { SERVER_LINK } from '../../helpers/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import OrganizationPopUp from '../common/PopUpModals/OrganizationPopUp'

const OrganizationModal = ({ modal, setModal }) => {
	const router = useRouter()

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

	const login_token = useSelector((state) => state.user.token)
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

		await axios({
			url: `${SERVER_LINK}/organization`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: login_token,
			},
			data: OrganizationData,
		})
			.then(() => {
				router.replace(router.asPath)
				setModal(!modal)
			})
			.catch(() => {
				toast.error('Invalid Request')
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
