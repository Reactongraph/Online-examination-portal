/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from 'react'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ButtonComponent } from './micro/buttonComponent'
import { Label } from './micro/label'
import { EditOrganization } from '../../apis/organizations'
import { Form } from './micro/form'
import { InputComponent } from './micro/inputComponent'
import { PageComponentTitleContext } from '../context'

const UserProfileModal = ({ userData, mutate }) => {
	const router = useRouter()
	const { modal, setModal } = useContext(PageComponentTitleContext)

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
	const user = useSelector((state) => state?.user)

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

		EditOrganization(OrganizationData, userData?.id, user?.token)
			.then(() => {
				setModal(!modal)
				toast.success('Profile Updated Successfully!')
				mutate()
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
						<Form
							// className='w-full max-w-lg'
							onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
							<React.Fragment>
								<div className='flex flex-wrap -mx-3 mb-6'>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<Label key={'grid-first-name'}> Name</Label>

										<InputComponent
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
										<Label key={'grid-last-name'}> Email</Label>

										<InputComponent
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
										<Label key={'grid-password'}> Password</Label>

										<InputComponent
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
										<Label key={'grid-city'}> City</Label>

										<InputComponent
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
										<Label key={'grid-state'}> State</Label>

										<InputComponent
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
										<Label key={'grid-zip'}> Pin Code</Label>

										<InputComponent
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
										<Label key={'grid-address'}>Address</Label>

										<InputComponent
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
										<Label key={'grid-mobile'}>Mobile</Label>

										<InputComponent
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
										<Label key={'grid-quota'}>Quota</Label>

										<InputComponent
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
								<ButtonComponent key={'submit'}>{buttonText}</ButtonComponent>
							</React.Fragment>
						</Form>
					</div>
				</div>
			</PureModal>
		</>
	)
}

export default UserProfileModal
