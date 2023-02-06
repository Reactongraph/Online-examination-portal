import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { ButtonComponent } from '../../common/micro/buttonComponent'
import { UserLogout } from '../../../apis/auth'
import Link from 'next/link'

const LogOutButton = () => {
	const handleLogout = async () => {
		try {
			UserLogout()
			toast.success('Logout Successfully!')
		} catch (error) {
			toast.error('Invalid Request')
		}
	}
	return (
		<>
			<Link href={'/login'}>
				<ButtonComponent
					onClick={handleLogout}
					className={'btn-outline'}>
					<React.Fragment>
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
					</React.Fragment>
				</ButtonComponent>
			</Link>

			<ToastContainer />
		</>
	)
}

export default LogOutButton
