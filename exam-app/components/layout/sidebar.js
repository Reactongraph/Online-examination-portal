import React, { useRef } from 'react'
import OutsideClick from '../../utils/outside_click'
import Logo from './sidebar/logo'
import Nav from './sidebar/nav'

const Sidebar = ({ mobileNavsidebar }) => {
	const sidebarRef = useRef(null)
	const sidebarOutsideClick = OutsideClick(sidebarRef)

	return (
		<aside
			className={`${
				mobileNavsidebar ? 'block' : 'hidden'
			}   sm:flex sm:flex-col z-50`}
			ref={sidebarRef}>
			<Logo />

			<div className='flex-grow flex flex-col justify-between text-neutral-600 bg-slate-200'>
				<Nav sidebarOutsideClick={sidebarOutsideClick} />
			</div>
		</aside>
	)
}

export default Sidebar
