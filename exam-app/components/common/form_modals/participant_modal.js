import React from 'react'
import { useState } from 'react'
import { ButtonComponent } from '../micro/button_component'
import { Label } from '../micro/label'
import { InputComponent } from '../micro/input_component'
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
				<div className='multi-column-spacing'>
					<Banner
						heading={`${buttonText} Participant`}
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
									<InputComponent
										type='text'
										onChange={(e) => setName(e.target.value)}
										className={'input-field '}
										placeholder='Jane'
										required='required'
										value={name}
										disabled={isViewOnly}
										id='name'
									/>
								</div>
								<div className='form-field'>
									<Label key={'grid-first-name'}>Email</Label>
									<InputComponent
										onChange={(e) => setEmail(e.target.value)}
										id='email'
										type='email'
										className={'input-field'}
										placeholder='example@gmail.com '
										required='required'
										value={email}
										disabled={isViewOnly}
									/>
								</div>
							</div>
							<div className='flex-grid-wrap'>
								<div className='w-full px-3'>
									<Label key={'grid-password'}> Password</Label>

									<div class='relative'>
										<InputComponent
											onChange={(e) => setPassword(e.target.value)}
											id='password'
											className={'participant-input'}
											type={!showPassword ? 'password' : 'text'}
											placeholder={'******************'}
											required={'required'}
											value={password}
											disabled={isViewOnly}
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
									<InputComponent
										onChange={(e) => setMobile(e.target.value)}
										id='mobile'
										className={'input-field'}
										type={'text'}
										placeholder={'+91 '}
										required={'required'}
										value={mobile}
										disabled={isViewOnly}
									/>
								</div>
								<div className='form-field'>
									<Dropdown
										id='default'
										labelText={'Organization Name '}
										value={selectedorganizationId}
										required={true}
										className={'input-style'}
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
								<ButtonComponent
									className='btn-secondary'
									key={'submit'}>
									{buttonText}{' '}
								</ButtonComponent>
							)}
						</React.Fragment>
					</Form>
				</div>
			</div>
		</>
	)
}

export default ParticipantPopUp
