import React, { useEffect } from 'react'
import { useState } from 'react'
import { ButtonComponent } from '../micro/button'
import { Label } from '../micro/label'
import { InputComponent } from '../micro/input'
import { Form } from '../micro/form'
import Dropdown from '../micro/dropdown'
import { Banner } from '../micro/banner'
import { Controller, useForm } from 'react-hook-form'
import { GetParticipantWithId } from '../../../apis/participants'
import { useRouter } from 'next/router'

function ParticipantModal(props) {
	const { checkWithDatabase, organization_data, isViewOnly, buttonText } = props
	const [showPassword, setShowPassword] = useState(false)

	const router = useRouter()

	const participantDefaultValues = {
		name: '',
		email: '',
		password: '',
		mobile: '',
		Organization_id: '',
	}

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: participantDefaultValues,
	})

	useEffect(() => {
		let participant_id = router.query?.id
		async function getParticipantData() {
			const result = await GetParticipantWithId(participant_id)
			const participantData = result.data

			const keys = Object.keys(participantDefaultValues)
			keys.forEach((key) => {
				setValue(key, participantData[key], true)
			})
		}
		if (router.query.id) {
			getParticipantData()
		}
	}, [router.query?.id])

	return (
		<>
			<div className='flex-row space-y-3 relative px-12 bg-gray-100'>
				<div className='multi-column-spacing'>
					<Banner
						heading={`${buttonText || 'Add'}  Participant`}
						subHeading={'Easy to understand'}
						additionalClassName='banner-header'
					/>
				</div>

				<div className=' m-auto py-6 px-6 lg:px-8 bg-white max-w-lg rounded-lg'>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div className='flex-grid-wrap '>
								<div className='form-field mb-6 md:mb-0'>
									<Label key={'grid-first-name'}>Name</Label>

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
								<div className='form-field'>
									<Label key={'grid-first-name'}>Email</Label>

									<Controller
										as={InputComponent}
										name={'email'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												id='email'
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
											/>
										)}
									/>
								</div>
							</div>
							<div className='flex-grid-wrap'>
								<div className='w-full px-3'>
									<Label key={'grid-password'}> Password</Label>

									<div class='relative'>
										<Controller
											as={InputComponent}
											name={'password'}
											control={control}
											render={({ field: { onChange, value, onBlur } }) => (
												<InputComponent
													id='password'
													type={!showPassword ? 'password' : 'text'}
													onChange={onChange}
													onBlur={onBlur}
													value={value}
													className={
														'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
													}
													placeholder={'******************'}
													required='required'
													disabled={isViewOnly}
												/>
											)}
										/>

										<ButtonComponent
											type={'button'}
											className='btn-password'
											onClick={() => setShowPassword(!showPassword)}>
											{!showPassword ? 'Show' : 'Hide'}
										</ButtonComponent>
									</div>
									<p className='text-gray-600 text-xs italic'>
										Make it as long and as crazy as you'd like
									</p>
								</div>
							</div>
							<div className='flex-grid-wrap'>
								<div className='form-field mb-6 md:mb-0'>
									<Label key={'grid-mobile'}> Mobile</Label>

									<Controller
										as={InputComponent}
										name={'mobile'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												id='mobile'
												type={'text'}
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												className={
													'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
												placeholder={'+91 '}
												required='required'
												disabled={isViewOnly}
											/>
										)}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Controller
										as={Dropdown}
										name={'Organization_id'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<Dropdown
												id='default'
												labelText={'Organization Name '}
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												required={true}
												className={
													'bg-gray-50 border w-full border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
												}
												label='Select Organization '
												options={organization_data}
												disabled={isViewOnly}
											/>
										)}
									/>
								</div>
							</div>
							{isViewOnly == false && (
								<ButtonComponent key={'submit'}>
									{buttonText || 'Add'}
								</ButtonComponent>
							)}
						</React.Fragment>
					</Form>
				</div>
			</div>
		</>
	)
}

export default ParticipantModal
