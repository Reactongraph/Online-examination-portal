import { MdLockOutline } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { Form } from '../../components/common/micro/form'
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'
import React from 'react'
import { ButtonComponent } from '../../components/common/micro/buttonComponent'
import { InputComponent } from '../../components/common/micro/inputComponent'
import { ResetPassword } from '../../apis/auth'

export default function PasswordReset() {
	const router = useRouter()
	const { token } = router.query

	const { register, handleSubmit } = useForm()
	const changePassword = async (data) => {
		const decodeToken = jwt_decode(token)
		const decodeid = decodeToken.id
		const newPassword = data.password

		let apiData = {
			password: newPassword,
			decodeid: decodeid,
		}

		apiData = JSON.stringify(apiData)

		ResetPassword(apiData, token)
			.then(() => {
				toast.success('Password Changed successfully 🤩')
				setTimeout(() => {
					toast.info('Try Login with new Credential 🙂')
				}, 1000)
				router.push('/login')
			})
			.catch((err) => {
				toast.error(err.response.data)
			})
	}

	return (
		<main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center mt-20'>
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
					<Form onSubmit={handleSubmit((data) => changePassword(data))}>
						<React.Fragment>
							<div className='bg-gray-100 w-64 p-2 flex items-center mb-3 ml-20 mt-10'>
								{' '}
								<MdLockOutline className='text-gray-400 m-2' />
								<InputComponent
									className={'bg-gray-100 text-black outline-none text-sm'}
									type='password'
									name='password'
									register={register}
									placeholder={'password'}
								/>
							</div>
							<div className='bg-gray-100 w-64 p-2 flex items-center mb-3 ml-20 mt-10'>
								<MdLockOutline className='text-gray-400 m-2' />
								<InputComponent
									className={'bg-gray-100 text-black outline-none text-sm'}
									type='cpassword'
									name='cpassword'
									register={register}
									placeholder={'Cpassword'}
								/>
							</div>
							<div className='flex  justify-between w-64 mb-5'>
								<ButtonComponent
									type={'submit'}
									className={
										'btn-tertiary hover:text-white ml-20 md-15 mr-30 mt-10   '
									}>
									ChangePassword
								</ButtonComponent>
							</div>
						</React.Fragment>
					</Form>
				</div>
				<div className='w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
					<p className='mb-2'>Fill up details To change your password.</p>
				</div>
			</div>
			<ToastContainer />
		</main>
	)
}
