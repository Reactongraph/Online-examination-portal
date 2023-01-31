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
			<div className='flex-container'>
				<div className='multi-column-spacing'>
					<Banner
						heading={`${buttonText} Organization`}
						subHeading={'Easy to understand'}
						additionalClassName='banner-header'
					/>
				</div>

				<div className='card-container '>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div className='flex-grid-wrap'>
								<div className='form-field mb-6 md:mb-0'>
									<Label key={'grid-first-name'}> Name</Label>
									<InputComponent
										type='text'
										onChange={(e) => setName(e.target.value)}
										className='input-field'
										value={name}
										placeholder='Jane'
										required='required'
										id='name'
									/>
								</div>
								<div className='form-field'>
									<Label key={'grid-last-name'}> Email</Label>
									<InputComponent
										onChange={(e) => setEmail(e.target.value)}
										id='grid-email'
										type='email'
										className='input-field'
										value={email}
										placeholder='example@gmail.com '
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
										className={'org-input'}
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
										className={'org-input'}
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
										className={'org-input'}
										type={'text'}
										placeholder={'90210 '}
										required={'required'}
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
										className={'org-input'}
										type={'text'}
										placeholder={'your office number '}
										required={'required'}
										value={address}
									/>
								</div>
							</div>
							<div className='flex-grid-wrap'>
								<div className='form-field mb-6 md:mb-0'>
									<Label key={'grid-mobile'}> Mobile</Label>
									<InputComponent
										onChange={(e) => setMobile(e.target.value)}
										id='mobile'
										className={'org-input'}
										type={'text'}
										placeholder={'+91 '}
										required={'required'}
										value={mobile}
									/>
								</div>
								<div className='form-field'>
									<Label key={'grid-quota'}> Quota</Label>
									<InputComponent
										onChange={(e) => setQuota(e.target.value)}
										id='Quota'
										className={'org-input'}
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
									className={'btn-secondary'}>
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
