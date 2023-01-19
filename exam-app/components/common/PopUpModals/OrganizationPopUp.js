import React from 'react'
import PureModal from 'react-pure-modal'
import { ButtonComponent } from '../micro/buttonComponent'
import { Label } from '../micro/label'
import { Form } from '../micro/form'
import { TextInput } from '../micro/textinput'
function OrganizationPopUp(props) {
	const {
		name,
		setName,
		setEmail,
		password,
		setPassword,
		city,
		state,
		setState,
		setCity,
		setPincode,
		mobile,
		address,
		setAddress,
		setMobile,
		quota,
		setQuota,
		modal,
		setModal,
		buttonText,
		handleSubmit,
		checkWithDatabase,
	} = props
	return (
		<PureModal
			isOpen={modal}
			width='800px'
			onClose={() => {
				setName('')
				setEmail('')
				setPassword('')
				setCity('')
				setState('')
				setPincode('')
				setAddress('')
				setMobile('')
				setQuota('')
				setModal(false)
				return true
			}}>
			<div className='flex-row space-y-3 relative'>
				<div className='bg-blue-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4'>
					<p>{buttonText} Organization</p>
				</div>

				<div className='py-6 px-6 lg:px-8'>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-first-name'}> Name</Label>
									<TextInput
										type='text'
										onChange={(e) => setName(e.target.value)}
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										value={name}
										placeholder='Jane'
										required='required'
										id='name'></TextInput>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-last-name'}> Email</Label>
									<TextInput
										onChange={(e) => setEmail(e.target.value)}
										id='grid-email'
										type='email'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										placeholder='example@gmail.com '
										required='required'></TextInput>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-password'}> Password</Label>
									<TextInput
										onChange={(e) => setPassword(e.target.value)}
										id='grid-password'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										type={'password'}
										placeholder={'******************'}
										required={'required'}
										value={password}></TextInput>
									<p className='text-gray-600 text-xs italic'>
										Make it as long and as crazy as you'd like
									</p>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 mb-2'>
								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<Label key={'grid-city'}> City</Label>
									<TextInput
										onChange={(e) => setCity(e.target.value)}
										id='mobile'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'Albuquerque '}
										required={'required'}
										value={city}></TextInput>
								</div>

								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<Label key={'grid-state'}> State</Label>
									<TextInput
										onChange={(e) => setState(e.target.value)}
										id='state'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'State '}
										required={'required'}
										value={state}></TextInput>
								</div>
								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<Label key={'grid-zip'}> Pin Code</Label>
									<TextInput
										onChange={(e) => setPincode(e.target.value)}
										id='stgrid-zip'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'90210 '}
										required={'required'}
										value={state}></TextInput>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-address'}> Address</Label>
									<TextInput
										onChange={(e) => setAddress(e.target.value)}
										id='grid-address'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'your office number '}
										required={'required'}
										value={address}></TextInput>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-mobile'}> Mobile</Label>
									<TextInput
										onChange={(e) => setMobile(e.target.value)}
										id='mobile'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'+91 '}
										required={'required'}
										value={mobile}></TextInput>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-quota'}> Quota</Label>
									<TextInput
										onChange={(e) => setQuota(e.target.value)}
										id='Quota'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
										type={'text'}
										placeholder={'e.g. 1000 '}
										required={'required'}
										value={quota}></TextInput>
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

export default OrganizationPopUp
