import React, { useState } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ButtonComponent } from './micro/button_component'
import { Label } from './micro/label'
import { EditOrganization } from '../../apis/organizations'
import { Form } from './micro/form'
import { InputComponent } from './micro/inputComponent'
import { Banner } from './micro/banner'

const UserProfileModal = ({ profile_data: userData, mutate }) => {
	const router = useRouter()
	const [name, setName] = useState(userData?.name)
	const [email, setEmail] = useState(userData?.email)
	const [pincode, setPincode] = useState(userData?.pincode)
	const [address, setAddress] = useState(userData?.address)
	const [city, setCity] = useState(userData?.city)
	const [state, setState] = useState(userData?.state)
	const [mobile, setMobile] = useState(userData?.mobile)
	const [quota, setQuota] = useState(userData?.quota)
	const buttonText = 'Edit'

	const [password, setPassword] = useState(userData?.password)
	const [showPassword, setShowPassword] = useState(false)

	const { handleSubmit } = useForm()

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		// data.status = true
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

		EditOrganization(OrganizationData, userData?.id)
			.then(() => {
				toast.success('Profile Updated Successfully!')
				mutate()
				router.replace(`/userProfile`)
			})
			.catch(() => {
				toast.error('Invalid Request')
			})
	}

	return (
		<>
			<div className='flex-row space-y-3 relative p-12 '>
				<div className='flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between'>
					<Banner
						heading={`${buttonText} Profile`}
						subHeading={'Easy to understand'}
						additionalClassName={'my-4 ml-3'}
					/>
				</div>

				<div className='flex-auto  items-center p-8 bg-white shadow rounded-lg '>
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
										disabled
										required='required'
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-password'}> Password</Label>

									<div className='relative'>
										<InputComponent
											className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											id='grid-password'
											type={!showPassword ? 'password' : 'text'}
											placeholder='******************'
											value={password}
											required='required'
											onChange={(e) => setPassword(e.target.value)}
										/>
										<ButtonComponent
											type={'button'}
											className={
												'text-white absolute right-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-500   font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-300 dark:hover:bg-blue-400 '
											}
											onClick={() => setShowPassword(!showPassword)}>
											{!showPassword ? 'Show' : 'Hide'}
										</ButtonComponent>
									</div>

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
							<div className='flex justify-end'>
								<ButtonComponent
									key={'submit'}
									className={
										'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
									}>
									{buttonText} Profile
								</ButtonComponent>
							</div>
						</React.Fragment>
					</Form>
				</div>
			</div>
		</>
	)
}

export default UserProfileModal
