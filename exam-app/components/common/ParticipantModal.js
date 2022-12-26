import React, { useState } from 'react'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { SERVER_LINK } from '../../helpers/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const ParticipantModal = ({ modal, setModal }) => {
	//For Image Preview
	const router = useRouter()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')

	const [mobile, setMobile] = useState('')
	// const [buttonText, setButtonText] = useState('Add')
	const buttonText = 'Add'

	const [password, setPassword] = useState('')
	const [organizationId, setOrganizationId] = useState('')

	const { handleSubmit } = useForm()

	const login_token = useSelector((state) => state.user.token)
	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.name = name
		data.email = email
		data.mobile = mobile
		data.id = organizationId
		data.password = password

		let participantData = JSON.stringify(data)

		// for new data registration

		await axios({
			url: `${SERVER_LINK}/participants`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				Authorization: login_token,
			},
			data: participantData,
		})
			.then(() => {
				router.replace(router.asPath)
				setName('')
				setEmail('')
				setMobile('')
				setPassword('')
				setOrganizationId('')
				setModal(!modal)
			})
			.catch((err) => {
				return err
			})
	}

	return (
		<>
			<PureModal
				isOpen={modal}
				width='800px'
				onClose={() => {
					setName('')
					setEmail('')
					setMobile('')
					setPassword('')
					setOrganizationId('')
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
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='password'
										type='password'
										placeholder='******************'
										required='required'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
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
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-last-name'>
										Organization Id
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='org_id'
										type='text'
										placeholder='e.g. 1000'
										required='required'
										value={organizationId}
										onChange={(e) => setOrganizationId(e.target.value)}
									/>
								</div>
							</div>
							<button
								type='submit'
								className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								{buttonText}
							</button>
						</form>
					</div>
				</div>
			</PureModal>
		</>
	)
}

export default ParticipantModal
