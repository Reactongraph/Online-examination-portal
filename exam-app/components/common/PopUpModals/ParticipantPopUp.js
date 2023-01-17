import PureModal from 'react-pure-modal'
import { useState } from 'react'
import { Button } from '../micro/button'
function ParticipantPopUp(props) {
	const {
		modal,
		setModal,
		setName,
		name,
		password,
		setPassword,
		setMobile,
		mobile,
		email,
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
					<form
						className='w-full max-w-lg'
						onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<div className='flex flex-wrap -mx-3 mb-6'>
							<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
								<label
									className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
									for='grid-first-name'>
									Name
								</label>
								<input
									className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
									id='name'
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
									required='required'
									placeholder='Jane'
								/>
							</div>
							<div className='w-full md:w-1/2 px-3'>
								<label
									className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
									for='grid-last-name'>
									Email
								</label>
								<input
									className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
									id='email'
									type='email'
									placeholder='example@gmail.com '
									required='required'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div className='flex flex-wrap -mx-3 mb-6'>
							<div className='w-full px-3'>
								<label
									className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
									for='grid-password'>
									Password
								</label>

								<div class='relative'>
									<input
										className='appearance-none block w-full p-4  bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='password'
										type={!showPassword ? 'password' : 'text'}
										placeholder='******************'
										required='required'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										class='text-white absolute right-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-500   font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-300 dark:hover:bg-blue-400 '>
										{!showPassword ? 'Show' : 'Hide'}
									</button>
								</div>
								<p className='text-gray-600 text-xs italic'>
									Make it as long and as crazy as you'd like
								</p>
							</div>
						</div>

						<div className='flex flex-wrap -mx-3 mb-6'>
							<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
								<label
									className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
									for='grid-first-name'>
									Mobile
								</label>
								<input
									className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
									id='mobile'
									type='text'
									placeholder='+91 '
									required='required'
									value={mobile}
									onChange={(e) => setMobile(e.target.value)}
								/>
							</div>
							<div className='w-full md:w-1/2 px-3'>
								<label
									htmlFor='default'
									className='block mb-2 text-sm font-medium text-gray-900 '>
									Organization Name
								</label>
								<select
									id='default'
									value={selectedorganizationId}
									onChange={(e) => {
										handleOrganizationIdTypeSelect(e)
									}}
									required
									className='bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'>
									<option
										value=''
										hidden>
										Select
									</option>
									{organization_data &&
										organization_data?.map((response) => (
											<option
												key={response.id}
												value={response.id}>
												{response.name}
											</option>
										))}
								</select>
							</div>
						</div>
						<Button key={'submit'}>{buttonText}</Button>
					</form>
				</div>
			</div>
		</PureModal>
	)
}

export default ParticipantPopUp
