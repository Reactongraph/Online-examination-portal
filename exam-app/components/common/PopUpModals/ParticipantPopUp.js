import React from 'react'
import PureModal from 'react-pure-modal'
import { useState } from 'react'
import { ButtonComponent } from '../micro/buttonComponent'
import { Label } from '../micro/label'
import { InputComponent } from '../micro/inputComponent'
import { Form } from '../micro/form'
import Dropdown from '../micro/dropdown'
function ParticipantPopUp(props) {
	const {
		modal,
		setModal,
		setName,
		// name,
		password,
		setPassword,
		setMobile,
		mobile,
		// email,
		setEmail,
		setSelectedOrganizationId,
		selectedorganizationId,
		checkWithDatabase,
		handleSubmit,
		handleOrganizationIdTypeSelect,
		buttonText,
		organization_data,
	} = props
	const [showPassword, setShowPassword] = useState(false)
	return (
		<PureModal
			isOpen={modal}
			width='800px'
			onClose={() => {
				setName('')
				setEmail('')
				setMobile('')
				setPassword('')
				setSelectedOrganizationId('')
				setModal(false)
				return true
			}}>
			<div className='flex-row space-y-3 relative'>
				<div className='bg-blue-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4'>
					<p>{buttonText} Participant</p>
				</div>

				<div className='py-6 px-6 lg:px-8'>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div className='flex flex-wrap -mx-3 mb-6'>
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
												'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
											}
											type={!showPassword ? 'password' : 'text'}
											placeholder={'******************'}
											required={'required'}
											value={password}
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
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-organization'}> Organization Name</Label>
									<Dropdown
										id='default'
										value={selectedorganizationId}
										required={true}
										className={
											'bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
										}
										label='Select Organization '
										options={organization_data}
										onChange={(e) => {
											handleOrganizationIdTypeSelect(e)
										}}
									/>
								</div>
							</div>
							<ButtonComponent key={'submit'}>{buttonText}</ButtonComponent>
						</React.Fragment>
					</Form>
				</div>
			</div>
		</PureModal>
	)
}

export default ParticipantPopUp
