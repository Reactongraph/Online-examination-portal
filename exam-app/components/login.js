import { MdLockOutline } from 'react-icons/md'
import { FaRegEnvelope } from 'react-icons/fa'
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import { Form } from './common/micro/form'
import { ButtonComponent } from './common/micro/button_component'
import Dropdown from './common/micro/dropdown'
import { UserLogin } from '../apis/auth'
import { LoginRoles } from './drop_down_data/login_data'

// validation schema
const schema = object({
	email: string('Email should be a string')
		.required('Email address is required')
		.email('Please provide a valid email'),
	password: string('Password is required')
		.required('Password is required')
		.min(5, 'Password must be atleast 5 characters long ! '),
})
const Login = () => {
	const router = useRouter()
	const dispatch = useDispatch()

	const { register, handleSubmit } = useForm({
		resolver: yupResolver(schema),
	})
	const [optionValue, setOptionValue] = useState(' ')

	const handleSelect = (e) => {
		setOptionValue(e.target.value)
	}
	const checkWithDatabase = async (data) => {
		data.role = optionValue
		data = JSON.stringify(data)

		UserLogin(data)
			.then((response) => {
				if (response.status === 201) {
					const login_token = response.data.access_token
					const payload = response.data.payload
					const userRole = response.data.role
					const Org_id = response.data.organization_id

					toast.success('Login Successfully !')
					dispatch({
						type: 'SET_LOGIN',
						token: login_token,
						payload: payload,
						role: userRole,
						Org_id: Org_id,
					})
					router.push({
						pathname: '/dashboard',
					})
				}
			})
			.catch((err) => {
				// const { data } = err.response
				toast.error(err.message)
			})
	}

	return (
		<>
			<div className=''>
				<main className='flex flex-col  items-center justify-center w-full flex-1 px-20 text-center mt-20'>
					<div className=' rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
						<div className='w-3/5 p-5'>
							<div className='text-left font-bold '>
								{' '}
								<span className='text-blue-500'> Company</span>Name
							</div>
							<div className='py-10'>
								<h2 className='text-3xl font-bold text-blue-500 mb-2'>
									Sign in to Account
								</h2>
							</div>
							<p className='text-gray-1000 mr-20'>use your login details</p>
							<div className='flex flex-col items-center'></div>
							<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
								<React.Fragment>
									<div className='bg-gray-100 w-64 p-2 flex items-center mb-3 ml-20 mt-10'>
										{' '}
										<FaRegEnvelope className='text-gray-400 m-2' />
										<input
											type='email'
											required
											{...register('email')}
											name='email'
											placeholder='Email'
											className='bg-gray-100 text-black outline-none text-sm'
										/>{' '}
									</div>
									<div className='bg-gray-100 w-64 p-2 flex items-center mb-3 ml-20'>
										{' '}
										<MdLockOutline className='text-gray-400 m-2' />
										<input
											type='password'
											required
											{...register('password')}
											name='password'
											placeholder='Password'
											className='bg-gray-100 text-black  outline-none text-sm'
										/>{' '}
									</div>
									<div className='flex  justify-between w-64 mb-5'>
										<a
											href='#'
											className='text-xs mr-1 ml-20  md-20 text-gray-1000'>
											Forget Password?
										</a>

										<ButtonComponent
											key={'submit'}
											className={'btn-tertiary ml-20 md-15 mr-25'}>
											SignIn
										</ButtonComponent>
									</div>
									<div className='flex items-center px-8 bg-dark '>
										<Dropdown
											labelClassName={'mr-2 text-sm font-medium text-gray-900'}
											labelText={'Login As '}
											id='default'
											required={true}
											label='Select Role'
											options={LoginRoles}
											onChange={handleSelect}
										/>
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
			</div>
			<ToastContainer />
		</>
	)
}

export default Login
