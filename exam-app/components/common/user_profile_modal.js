import React, { useEffect, useState } from 'react'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { Controller, useForm } from 'react-hook-form'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ButtonComponent } from './micro/button'
import { Label } from './micro/label'
import {
	EditOrganization,
	GetOrganizationDataWithId,
} from '../../apis/organizations'
import { Form } from './micro/form'
import { InputComponent } from './micro/input'
import { Banner } from './micro/banner'

const UserProfileModal = ({ buttonText }) => {
	const router = useRouter()

	const userDefaultValues = {
		name: '',
		email: '',
		password: '',
		mobile: '',
		quota: '',
		city: '',
		state: '',
		address: '',
		pincode: '',
	}

	const { handleSubmit, control, setValue } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: userDefaultValues,
	})

	useEffect(() => {
		let userId = router.query?.id
		async function getUserProfileData() {
			const result = await GetOrganizationDataWithId(userId)
			const userData = result.data
			const keys = Object.keys(userDefaultValues)
			keys.forEach((key) => {
				setValue(key, userData[key], true)
			})
		}
		if (router.query.id) {
			getUserProfileData()
		}
	}, [router.query?.id])

	const [showPassword, setShowPassword] = useState(false)

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		let OrganizationData = JSON.stringify(data)

		// for new data registration

		EditOrganization(OrganizationData, router.query?.id)
			.then(() => {
				toast.success('Profile Updated Successfully!')
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

									<Controller
										as={InputComponent}
										name={'name'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												type='text'
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												className={
													'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
												placeholder='Jane'
												required='required'
												id='name'
											/>
										)}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-last-name'}> Email</Label>

									<Controller
										as={InputComponent}
										name={'email'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												type='email'
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												className={
													'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
												placeholder='example@gmail.com '
												required='required'
												disabled
												id='grid-email'
											/>
										)}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-password'}> Password</Label>

									<div className='relative'>
										<Controller
											as={InputComponent}
											name={'password'}
											control={control}
											render={({ field: { onChange, value, onBlur } }) => (
												<InputComponent
													type={!showPassword ? 'password' : 'text'}
													onChange={onChange}
													onBlur={onBlur}
													value={value}
													className={
														'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
													}
													placeholder='******************'
													required='required'
													id='grid-password'
												/>
											)}
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

									<Controller
										as={InputComponent}
										name={'city'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												type='text'
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												className={
													'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
												placeholder='Albuquerque'
												required='required'
												id='grid-city'
											/>
										)}
									/>
								</div>

								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<Label key={'grid-state'}> State</Label>

									<Controller
										as={InputComponent}
										name={'state'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												type='text'
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												className={
													'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
												placeholder='State'
												required='required'
												id='grid-state'
											/>
										)}
									/>
								</div>
								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<Label key={'grid-zip'}> Pin Code</Label>

									<Controller
										as={InputComponent}
										name={'pincode'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												type='text'
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												className={
													'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
												placeholder='302040'
												required='required'
												id='grid-pincode'
											/>
										)}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-address'}>Address</Label>

									<Controller
										as={InputComponent}
										name={'address'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												type='text'
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												className={
													'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
												placeholder='Your office number'
												required='required'
												id='grid-address'
											/>
										)}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-mobile'}>Mobile</Label>

									<Controller
										as={InputComponent}
										name={'mobile'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												type='text'
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												className={
													'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
												placeholder='+91 ***********'
												required='required'
												disabled
												id='grid-mobile'
											/>
										)}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-quota'}>Quota</Label>

									<Controller
										as={InputComponent}
										name={'quota'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												type='text'
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												className={
													'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
												placeholder='e.g. 1000'
												required='required'
												disabled
												id='grid-quota'
											/>
										)}
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
