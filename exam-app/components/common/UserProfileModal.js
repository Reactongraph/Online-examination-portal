/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { SERVER_LINK } from '../../helpers/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button } from '../shared/Button'

const UserProfileModal = ({ modal, setModal, userData }) => {
	const router = useRouter()
	const [name, setName] = useState(userData?.name)
	const [email, setEmail] = useState(userData?.email)
	const [pincode, setPincode] = useState(userData?.pincode)
	const [address, setAddress] = useState(userData?.address)
	const [city, setCity] = useState(userData?.city)
	const [state, setState] = useState(userData?.state)
	const [mobile, setMobile] = useState(userData?.mobile)
	const [quota, setQuota] = useState(userData?.quota)
	// const [buttonText, setButtonText] = useState('Add')
	const buttonText = 'Edit'

	const [password, setPassword] = useState(userData?.password)

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

		await axios
			.patch(`${SERVER_LINK}/organization/${userData?.id}`, OrganizationData, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
			})
			.then(() => {
				setModal(!modal)
				toast.success('Profile Updated Successfully!')
				router.replace(router.asPath)
			})
			.catch(() => {
				toast.error('Invalid Request')
			})
	}

	return (
		<>
			<PureModal
				isOpen={modal}
				width='800px'
				onClose={() => {
					setModal(false)
					return true
				}}>
				<div className='flex-row space-y-3 relative'>
					<div className='bg-blue-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4'>
						<p>{buttonText} Profile</p>
					</div>

					<div className='py-6 px-6 lg:px-8'>
						<form
							className='w-full max-w-lg'
							onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-first-name'>
										Name
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										id='grid-first-name'
										type='text'
										value={name}
										required='required'
										onChange={(e) => setName(e.target.value)}
										placeholder='Jane'
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-last-name'>
										Email
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
										id='grid-email'
										type='email'
										placeholder='example@gmail.com '
										value={email}
										disabled={userData ? true : false}
										required='required'
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-password'>
										Password
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-password'
										type='password'
										placeholder='******************'
										value={password}
										required='required'
										onChange={(e) => setPassword(e.target.value)}
									/>
									<p className='text-gray-600 text-xs italic'>
										Make it as long and as crazy as you'd like
									</p>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-2'>
								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-city'>
										City
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-city'
										type='text'
										placeholder='Albuquerque'
										value={city}
										required='required'
										onChange={(e) => setCity(e.target.value)}
									/>
								</div>

								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-city'>
										State
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-state'
										type='text'
										placeholder='State'
										value={state}
										required='required'
										onChange={(e) => setState(e.target.value)}
									/>
								</div>
								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-zip'>
										Pin Code
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-zip'
										type='text'
										placeholder='90210'
										value={pincode}
										required='required'
										onChange={(e) => setPincode(e.target.value)}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-password'>
										Address
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-address'
										type='text'
										placeholder='Your Office number... '
										value={address}
										required='required'
										onChange={(e) => setAddress(e.target.value)}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-first-name'>
										Mobile
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
										id='grid-mobile'
										type='text'
										disabled
										placeholder='+91 '
										value={mobile}
										required='required'
										onChange={(e) => setMobile(e.target.value)}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-last-name'>
										Quota
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none'
										id='grid-quota'
										type='text'
										disabled
										placeholder='e.g. 1000'
										value={quota}
										required='required'
										onChange={(e) => setQuota(e.target.value)}
									/>
								</div>
								<p className='text-gray-600 text-xs italic mt-7'>
									<span className='text-red-500'>Disclaimer :</span> You can't
									edit Email , Quota and Mobile fields (Contact Admin for any
									query )
								</p>
							</div>
							<Button key={'submit'}>{buttonText}</Button>
						</form>
					</div>
				</div>
			</PureModal>
		</>
	)
}

export default UserProfileModal
