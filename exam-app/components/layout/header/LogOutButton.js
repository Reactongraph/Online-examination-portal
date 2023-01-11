import React from 'react'
import { useRouter } from 'next/router'
import { SERVER_LINK } from '../../../helpers/config'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const LogOutButton = () => {
	const router = useRouter()
	const handleLogout = async () => {
		try {
			await axios.post(
				`${SERVER_LINK}/auth/logout`,
				{},
				{ withCredentials: true }
			)
			toast.success('Logout Successfully!')
			setTimeout(() => {
				router.push('/login')
			}, 1000)
		} catch (error) {
			toast.error('Invalid Request')
		}
	}
	return (
		<>
			<button
				onClick={handleLogout}
				className='relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full'>
				<span className='sr-only'>Log out</span>
				<svg
					aria-hidden='true'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					className='h-6 w-6'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
					/>
				</svg>
			</button>
			<ToastContainer />
		</>
	)
}

export default LogOutButton
