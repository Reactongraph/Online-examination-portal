import {
	ArrowNarrowLeftIcon,
	ArrowNarrowRightIcon,
} from '@heroicons/react/solid'
import { CgOrganisation } from 'react-icons/cg'
import { TiGroup } from 'react-icons/ti'
import { BsSpeedometer } from 'react-icons/bs'
import { FaSuitcase } from 'react-icons/fa'
import { MdRateReview } from 'react-icons/md'
import { MdQuiz } from 'react-icons/md'
import { useSelector } from 'react-redux'

import React, { useEffect, useState } from 'react'
import NavItem from './NavItem'

const Nav = ({ sidebarOutsideClick }) => {
	const [sidebarStatus, setSidebarStatus] = useState(false)
	const userRole = useSelector((state) => state.user.role)


	const sidebarClose = () => {
		setSidebarStatus(false)
	}

	const sidebarOpen = () => {
		setSidebarStatus(true)
	}

	useEffect(() => {
		if (sidebarOutsideClick) {
			setSidebarStatus(false)
		}
	}, [sidebarOutsideClick])

	return (
		<>
			<nav className='flex   flex-col mx-4 my-6 space-y-4'>
				<div className='inline-flex items-center justify-center '>
					{sidebarStatus ? (
						<ArrowNarrowLeftIcon
							className='inline-block h-12 cursor-pointer'
							onClick={sidebarClose}
							size={30}
						/>
					) : (
						<ArrowNarrowRightIcon
							className='inline-block h-12 cursor-pointer'
							onClick={sidebarOpen}
							size={30}
						/>
					)}
				</div>

				{userRole == 'SuperAdminUser' && (
					<NavItem
						hrefLink='/dashboard/organization'
						sidebarStatus={sidebarStatus}
						menuTitle='Organization'
						subMenu={false}
						subMenuArray={null}>
						<CgOrganisation size={30} />
					</NavItem>
				)}

				<NavItem
					hrefLink='/dashboard/participant'
					sidebarStatus={sidebarStatus}
					menuTitle='Participant'
					subMenu={false}
					subMenuArray={null}>
					<TiGroup size={30} />
				</NavItem>

				{userRole == 'SuperAdminUser' && (
					<NavItem
						hrefLink='/dashboard/level'
						sidebarStatus={sidebarStatus}
						menuTitle='Level'
						subMenu={false}
						subMenuArray={null}>
						<BsSpeedometer size={30} />
					</NavItem>
				)}

				{userRole == 'SuperAdminUser' && (
					<NavItem
						hrefLink='/dashboard/module'
						sidebarStatus={sidebarStatus}
						menuTitle='Module'
						subMenu={false}
						subMenuArray={null}>
						<FaSuitcase size={30} />
					</NavItem>
				)}

				{userRole == 'SuperAdminUser' && (
					<NavItem
						hrefLink='/dashboard/questions'
						sidebarStatus={sidebarStatus}
						menuTitle='Questions'
						subMenu={false}
						subMenuArray={null}>
						<MdRateReview size={30} />
					</NavItem>
				)}

				<NavItem
					hrefLink='/dashboard/quiz'
					sidebarStatus={sidebarStatus}
					menuTitle='Quiz'
					subMenu={false}
					subMenuArray={null}>
					<MdQuiz size={30} />
				</NavItem>
			</nav>
		</>
	)
}

export default Nav
