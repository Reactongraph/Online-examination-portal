import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import React, { useEffect, useRef, useState } from 'react'
import OutsideClick from '../../../utils/outsideClick'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { ButtonComponent } from '../../common/micro/buttonComponent'
import Link from 'next/link'

const UserMenu = () => {
	const [userMenuStatus, setUserMenuStatus] = useState(false)
	const buttonRef = useRef(null)
	const buttonOutsideClick = OutsideClick(buttonRef)
	const username = useSelector((state) => state.user)

	const userMenuhandle = () => {
		setUserMenuStatus(!userMenuStatus)
	}

	useEffect(() => {
		if (buttonOutsideClick) {
			setUserMenuStatus(false)
		}
	}, [buttonOutsideClick])

	return (
		<ButtonComponent
			className={'menu-btn'}
			onClick={userMenuhandle}
			ref={buttonRef}>
			<React.Fragment>
				<span className='sr-only'>User Menu</span>
				<div className='hidden md:flex md:flex-col md:items-end md:leading-tight'>
					<span className='font-semibold'>{username?.payload?.username}</span>
					<span className='text-sm text-gray-600'>
						{username?.payload?.email}
					</span>
				</div>
				<span className='h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden'>
					<Image
						src='https://randomuser.me/api/portraits/women/68.jpg'
						alt='user profile photo'
						className='h-full w-full object-cover'
						width={50}
						height={50}
					/>
				</span>

				{userMenuStatus && (
					<div className='user-profile'>
						<Link
							href={'/userProfile'}
							className='block hover:bg-gray-50 hover:text-black'>
							user Profile
						</Link>
						<a className='block hover:bg-gray-50 hover:text-black'>
							user setting
						</a>
					</div>
				)}

				{userMenuStatus ? (
					<ChevronDownIcon className='hidden sm:block h-6 w-6 text-gray-300' />
				) : (
					<ChevronUpIcon className='hidden sm:block h-6 w-6 text-gray-300' />
				)}
			</React.Fragment>
		</ButtonComponent>
	)
}

export default UserMenu
