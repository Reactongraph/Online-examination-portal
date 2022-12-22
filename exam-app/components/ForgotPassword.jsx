import { useForm } from 'react-hook-form'
import { FaRegEnvelope } from 'react-icons/fa'
import { useState } from 'react'
import { object, string, array, number } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SERVER_LINK } from '../helpers/config'
import axios from 'axios'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { toast } from 'react-toastify'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

// validation schema
const schema = object({
	email: string('Email should be a string')
		.required('Email address is required')
		.email('Please provide a valid email'),
})

const ForgotPassword = () => {
	const [emailError, setEmailError] = useState('')
	const [invalidEmail, setInvalidEmail] = useState(false)
	const [LoadingApiResponse, setLoadingApiResponse] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const handleApiResponse = () => {
		setLoadingApiResponse(true)
	}

	const SendPasswordReset = async (data) => {
		handleApiResponse()
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
				setLoadingApiResponse(false)
				if (response.status != 200) {
					setInvalidEmail(true)
					setEmailError('Email is not registered !')

					setTimeout(() => {
						setEmailError('')
					}, 2000)
				} else if (response.status == 200) {
					setInvalidEmail(false)
					toast.success('Email sent Successfully! 📧')
					setTimeout(() => {
						toast.success('Please check your mailbox 📬')
					}, 1000)
				}
			})
			.catch((err) => {
				return console.log(err)
			})
	}

	const paperStyle = {
		padding: 20,
		height: '70vh',
		width: 280,
		margin: '20px auto',
	}
	const btnStyle = { margin: '15px 0' }

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
						{/* <p className="text-gray-1000 mr-20">use your login details</p> */}
						<div className='flex flex-col items-center'></div>
						<form
							class='w-full max-w-lg'
							onSubmit={handleSubmit((data) => SendPasswordReset(data))}>
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
							{/* <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 ml-20" > <MdLockOutline className="text-gray-400 m-2" />
              <input type="password" {...register("password")} name="password"placeholder="Password" className="bg-gray-100 outline-none text-sm" /> </div> */}
							<div className='flex  justify-between w-64 mb-5'>
								{/* <a href="#" className="text-xs mr-1 ml-20  md-20 text-gray-1000">Forget Password?</a> */}
								<button
									type='submit'
									className='border-2 border-blue rounded-full px-12 py-2 inline-block font-semibold bg-blue-500 hover:bg-blue-700  mr-25 ml-20   '>
									Send Reset Link
								</button>
							</div>
						</form>
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
