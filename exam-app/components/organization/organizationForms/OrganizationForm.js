import React from 'react'
import { Banner } from '../../common/micro/banner'
import { ButtonComponent } from '../../common/micro/buttonComponent'
import { Form } from '../../common/micro/form'
import { InputComponent } from '../../common/micro/inputComponent'
import { Label } from '../../common/micro/label'
function OrganizationForm(props) {
	const {
		handleSubmit,
		checkWithDatabase,
		name,
		password,
		city,
		state,
		pincode,
		address,
		mobile,
		quota,
		buttonText,
		email,
		setEmail,
		setAddress,
		setCity,
		setMobile,
		setName,
		setPassword,
		setState,
		setPincode,
		setQuota,
	} = props
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
									<InputComponent
										type='text'
										onChange={(e) => setName(e.target.value)}
										className={
											'appearance-none block w-full bg-white-200 text-white-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										value={name}
										placeholder='Jane'
										required='required'
										id='name'
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-last-name'}> Email</Label>
									<InputComponent
										onChange={(e) => setEmail(e.target.value)}
										id='grid-email'
										type='email'
										className={
											'appearance-none block w-full bg-white-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										value={email}
										placeholder='example@gmail.com '
										required='required'
									/>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-password'}> Password</Label>
									<InputComponent
										onChange={(e) => setPassword(e.target.value)}
										id='grid-password'
										className={
											'appearance-none block w-full bg-white-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										type={'password'}
										placeholder={'******************'}
										required={'required'}
										value={password}
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
										onChange={(e) => setCity(e.target.value)}
										id='mobile'
										className={
											'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'Albuquerque '}
										required={'required'}
										value={city}
									/>
								</div>

								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<Label key={'grid-state'}> State</Label>
									<InputComponent
										onChange={(e) => setState(e.target.value)}
										id='state'
										className={
											'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'State '}
										required={'required'}
										value={state}
									/>
								</div>
								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<Label key={'grid-zip'}> Pin Code</Label>
									<InputComponent
										onChange={(e) => setPincode(e.target.value)}
										id='stgrid-zip'
										className={
											'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'90210 '}
										required={'required'}
										value={pincode}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-address'}> Address</Label>
									<InputComponent
										onChange={(e) => setAddress(e.target.value)}
										id='grid-address'
										className={
											'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'your office number '}
										required={'required'}
										value={address}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-mobile'}> Mobile</Label>
									<InputComponent
										onChange={(e) => setMobile(e.target.value)}
										id='mobile'
										className={
											'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'+91 '}
										required={'required'}
										value={mobile}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-quota'}> Quota</Label>
									<InputComponent
										onChange={(e) => setQuota(e.target.value)}
										id='Quota'
										className={
											'appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'e.g. 1000 '}
										required={'required'}
										value={quota}
									/>
								</div>
							</div>
							<div className='flex justify-end'>
								<ButtonComponent
									key={'submit'}
									className={
										'btn-secondary'
									}>
									{buttonText}
								</ButtonComponent>
							</div>
						</React.Fragment>
					</Form>
				</div>
			</div>
		</>
	)
}
export default OrganizationForm
