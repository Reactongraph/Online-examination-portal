import React, { useEffect, useMemo } from 'react'
import { ButtonComponent } from '../micro/button'
import { Label } from '../micro/label'
import { Form } from '../micro/form'
import { InputComponent } from '../micro/input'
import { Banner } from '../micro/banner'
import { Controller, useForm } from 'react-hook-form'
import { GetOrganizationDataWithId } from '../../../apis/organizations'
import { useRouter } from 'next/router'
function OrganizationModal(props) {
	const { buttonText, checkWithDatabase, isViewOnly } = props
	const router = useRouter()

	const organizationDefaultValues = useMemo(
		() => ({
			name: '',
			email: '',
			password: '',
			mobile: '',
			quota: '',
			city: '',
			state: '',
			address: '',
			pincode: '',
		}),
		[]
	)
	const { handleSubmit, control, setValue } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: organizationDefaultValues,
	})

	useEffect(() => {
		let organizationId = router.query?.id
		async function getOrganizationData() {
			const result = await GetOrganizationDataWithId(organizationId)
			const organizationData = result.data
			const keys = Object.keys(organizationDefaultValues)
			keys.forEach((key) => {
				setValue(key, organizationData[key], true)
			})
		}
		if (router.query.id) {
			getOrganizationData()
		}
	}, [router.query?.id, organizationDefaultValues, setValue])
	return (
		<>
			<div className='flex-row space-y-3 relative p-12 '>
				<div className='multi-column-spacing'>
					<Banner
						heading={`${buttonText} Organization`}
						subHeading={'Easy to understand'}
						additionalClassName={'my-4 ml-3'}
					/>
				</div>

				<div className='flex-auto  items-center p-8 bg-white shadow rounded-lg '>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
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
												disabled={isViewOnly}
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
												disabled={isViewOnly}
												id='grid-email'
											/>
										)}
									/>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-password'}> Password</Label>

									<Controller
										as={InputComponent}
										name={'password'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												type='password'
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												className={
													'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
												placeholder='******************'
												required='required'
												disabled={isViewOnly}
												id='grid-password'
											/>
										)}
									/>
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
												disabled={isViewOnly}
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
												disabled={isViewOnly}
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
												disabled={isViewOnly}
												id='grid-pincode'
											/>
										)}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-address'}> Address</Label>

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
												disabled={isViewOnly}
												id='grid-address'
											/>
										)}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-mobile'}> Mobile</Label>

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
												disabled={isViewOnly}
												id='grid-mobile'
											/>
										)}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-quota'}> Quota</Label>

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
												disabled={isViewOnly}
												id='grid-quota'
											/>
										)}
									/>
								</div>
							</div>
							<div className='flex justify-end'>
								{isViewOnly == false && (
									<ButtonComponent
										key={'submit'}
										className={
											'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
										}>
										{buttonText}
									</ButtonComponent>
								)}
							</div>
						</React.Fragment>
					</Form>
				</div>
			</div>
		</>
	)
}

export default OrganizationModal
