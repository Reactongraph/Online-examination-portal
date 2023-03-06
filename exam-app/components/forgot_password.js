import { useForm } from 'react-hook-form'
import { FaRegEnvelope } from 'react-icons/fa'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SERVER_LINK } from '../helpers/config'
import axios from 'axios'
import { toast } from 'react-toastify'
import React from 'react'
import { Form } from './common/micro/form'
import { ButtonComponent } from './common/micro/button'

// validation schema
const schema = object({
	email: string('Email should be a string')
		.required('Email address is required')
		.email('Please provide a valid email'),
})

const ForgotPassword = () => {
	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	})

	const SendPasswordReset = async (data) => {
		data = JSON.stringify(data)
		await axios
			.request({
				method: 'post',
				url: `${SERVER_LINK}/auth/reset_link`,
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				data,
			})
			.then((response) => {
				if (response.status == 200) {
					toast.success('Email sent Successfully! 📧')
					setTimeout(() => {
						toast.success('Please check your mailbox 📬')
					}, 1000)
				}
			})
			.catch(() => {
				toast.error('Invalid Request')
			})
	}

	return (
		<>
			<main className='flex flex-col items-center justif-center w-full flex-1 px-20 text-center mt-20'>
				<div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
					<div className='w-3/5 p-5'>
						<div className='text-left font-bold '>
							{' '}
							<span className='text-blue-500'> Company</span>Name
						</div>
						<div className='py-10'>
							<h2 className='text-3xl font-bold text-blue-500 mb-2'>
								Reset Password
							</h2>
						</div>
						<div className='flex flex-col items-center'></div>
						<Form onSubmit={handleSubmit((data) => SendPasswordReset(data))}>
							<React.Fragment>
								<div className='bg-gray-100 w-64 p-2 flex items-center mb-3 ml-20 mt-10'>
									{' '}
									<FaRegEnvelope className='text-gray-400 m-2' />
									<input
										type='email'
										{...register('email')}
										name='email'
										placeholder='Email'
										className='bg-gray-100 outline-none text-sm'
									/>{' '}
								</div>

								<div className='flex  justify-between w-64 mb-5'>
									<ButtonComponent
										key={'submit'}
										className={'btn-tertiary  mr-25 ml-20'}>
										Send Reset Link
									</ButtonComponent>
								</div>
							</React.Fragment>
						</Form>
					</div>
					<div className='w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
						<h2 className='text-3xl font-bold mb'>Hello!</h2>
						<p className='mb-2'>
							Fill up personal information and start journey with us.
						</p>
					</div>
				</div>
			</main>
		</>
	)
}

export default ForgotPassword
