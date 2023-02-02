import React from 'react'
import { ButtonComponent } from '../micro/buttonComponent'
import { Label } from '../micro/label'
import { Form } from '../micro/form'
import { InputComponent } from '../micro/inputComponent'
import { Banner } from '../micro/banner'
function OrganizationPopUp(props) {
	const {
		name,
		setName,
		email,
		setEmail,
		password,
		setPassword,
		city,
		state,
		setState,
		setCity,
		pincode,
		setPincode,
		mobile,
		address,
		setAddress,
		setMobile,
		quota,
		setQuota,
		buttonText,
		handleSubmit,
		checkWithDatabase,
		isViewOnly,
	} = props
	return (
		<>
			<div className='flex-container '>
				<div className='multi-column-spacing'>
					<Banner
						heading={`${buttonText} Organization`}
						subHeading={'Easy to understand'}
						additionalClassName='BannerHeader'
					/>
				</div>

				<div className='card-container'>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div className='flex-grid-wrap'>
								<div className='form-field-md-width-half mb-6 md:mb-0'>
									<Label key={'grid-first-name'}> Name</Label>
									<InputComponent
										type='text'
										onChange={(e) => setName(e.target.value)}
										className={'input-field'}
										value={name}
										placeholder='Jane'
										required='required'
										disabled={isViewOnly}
										id='name'
									/>
								</div>
								<div className='form-field-md-width-half'>
									<Label key={'grid-last-name'}> Email</Label>
									<InputComponent
										onChange={(e) => setEmail(e.target.value)}
										id='grid-email'
										type='email'
										className='input-field'
										value={email}
										placeholder='example@gmail.com '
										disabled={isViewOnly}
										required='required'
									/>
								</div>
							</div>

							<div className='flex-grid-wrap'>
								<div className='w-full px-3'>
									<Label key={'grid-password'}> Password</Label>
									<InputComponent
										onChange={(e) => setPassword(e.target.value)}
										id='grid-password'
										className='input-field'
										type={'password'}
										placeholder={'******************'}
										required={'required'}
										disabled={isViewOnly}
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
											'organization-form-input'
										}
										type={'text'}
										placeholder={'Albuquerque '}
										required={'required'}
										disabled={isViewOnly}
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
										disabled={isViewOnly}
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
										disabled={isViewOnly}
										value={pincode}
									/>
								</div>
							</div>
							<div className='flex-grid-wrap'>
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
										disabled={isViewOnly}
										value={address}
									/>
								</div>
							</div>
							<div className='flex-grid-wrap'>
								<div className='form-field-md-width-half mb-6 md:mb-0'>
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
										disabled={isViewOnly}
										value={mobile}
									/>
								</div>
								<div className='form-field-md-width-half'>
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
										disabled={isViewOnly}
										value={quota}
									/>
								</div>
							</div>
							<div className='flex justify-end'>
								{isViewOnly == false && (
									<ButtonComponent
										key={'submit'}
										className='btn-secondary'>
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

export default OrganizationPopUp
