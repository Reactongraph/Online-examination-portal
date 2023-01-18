import React from 'react'
import PureModal from 'react-pure-modal'
import { ButtonComponent } from '../micro/buttonComponent'
import { Label } from '../micro/label'
import { Form } from '../micro/form'
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
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										id='grid-first-name'
										type='text'
										value={name}
										required='required'
										onChange={(e) => setName(e.target.value)}
										placeholder='Jane'
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-last-name'}> Email</Label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-email'
										type='email'
										placeholder='example@gmail.com '
										value={email}
										required='required'
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-password'}> Password</Label>

									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-password'
										type='password'
										placeholder='******************'
										value={password}
										required='required'
										onChange={(e) => setPassword(e.target.value)}
									/>
									<p className='text-gray-600 text-xs italic'>
										Make it as long and as crazy as you'd like
									</p>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 mb-2'>
								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<Label key={'grid-city'}> City</Label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-city'
										type='text'
										placeholder='Albuquerque'
										value={city}
										required='required'
										onChange={(e) => setCity(e.target.value)}
									/>
								</div>

								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<Label key={'grid-state'}> State</Label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-state'
										type='text'
										placeholder='State'
										value={state}
										required='required'
										onChange={(e) => setState(e.target.value)}
									/>
								</div>
								<div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
									<Label key={'grid-zip'}> Pin Code</Label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-zip'
										type='text'
										placeholder='90210'
										value={pincode}
										required='required'
										onChange={(e) => setPincode(e.target.value)}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-address'}> Address</Label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-address'
										type='text'
										placeholder='Your Office number... '
										value={address}
										required='required'
										onChange={(e) => setAddress(e.target.value)}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-mobile'}> Mobile</Label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										id='grid-mobile'
										type='text'
										placeholder='+91 '
										value={mobile}
										required='required'
										onChange={(e) => setMobile(e.target.value)}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-quota'}> Quota</Label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='grid-quota'
										type='text'
										placeholder='e.g. 1000'
										value={quota}
										required='required'
										onChange={(e) => setQuota(e.target.value)}
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

export default OrganizationPopUp
