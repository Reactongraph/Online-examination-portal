import React from 'react'
import { useState } from 'react'
import { ButtonComponent } from '../micro/buttonComponent'
import { Label } from '../micro/label'
import { InputComponent } from '../micro/inputComponent'
import { Form } from '../micro/form'
import Dropdown from '../micro/dropdown'
import { Banner } from '../micro/banner'
function ParticipantPopUp(props) {
	const {
		setName,
		name,
		password,
		setPassword,
		setMobile,
		mobile,
		email,
		setEmail,
		selectedorganizationId,
		checkWithDatabase,
		handleSubmit,
		handleOrganizationIdTypeSelect,
		buttonText,
		organization_data,
		isViewOnly,
	} = props
	const [showPassword, setShowPassword] = useState(false)
	return (
		<>
			<div className='flex-row space-y-3 relative px-12 bg-gray-100'>
				<div className='flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between'>
					<Banner
						heading={`${buttonText} Participant`}
						subHeading={'Easy to understand'}
						additionalClassName={'my-4 ml-3'}
					/>
				</div>

				<div className=' m-auto py-6 px-6 lg:px-8 bg-white max-w-lg rounded-lg'>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div className='flex flex-wrap -mx-3 mb-6 '>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-first-name'}>Name</Label>
									<InputComponent
										type='text'
										onChange={(e) => setName(e.target.value)}
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										placeholder='Jane'
										required='required'
										value={name}
										disabled={isViewOnly}
										id='name'
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-first-name'}>Email</Label>
									<InputComponent
										onChange={(e) => setEmail(e.target.value)}
										id='email'
										type='email'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										placeholder='example@gmail.com '
										required='required'
										value={email}
										disabled={isViewOnly}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-password'}> Password</Label>

									<div class='relative'>
										<InputComponent
											onChange={(e) => setPassword(e.target.value)}
											id='password'
											className={
												'appearance-none block w-full p-4  bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											}
											type={!showPassword ? 'password' : 'text'}
											placeholder={'******************'}
											required={'required'}
											value={password}
											disabled={isViewOnly}
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
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-mobile'}> Mobile</Label>
									<InputComponent
										onChange={(e) => setMobile(e.target.value)}
										id='mobile'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										type={'text'}
										placeholder={'+91 '}
										required={'required'}
										value={mobile}
										disabled={isViewOnly}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Dropdown
										id='default'
										labelText={'Organization Name '}
										value={selectedorganizationId}
										required={true}
										className={
											'bg-gray-50 border w-full border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
										}
										label='Select Organization '
										options={organization_data}
										disabled={isViewOnly}
										onChange={(e) => {
											handleOrganizationIdTypeSelect(e)
										}}
									/>
								</div>
							</div>
							{isViewOnly == false && (
								<ButtonComponent key={'submit'}>{buttonText}</ButtonComponent>
							)}
						</React.Fragment>
					</Form>
				</div>
			</div>
		</>
	)
}

export default ParticipantPopUp
