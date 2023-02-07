import React from 'react'
import PageComponentTitle from '../common/PageComponentTitle'
import Image from 'next/image'
import { TableRow } from '../common/micro/tableRow'
import { useSelector } from 'react-redux'

const UserProfile = ({ profile_data, mutate }) => {
	const user = useSelector((state) => state?.user)
	const userName = profile_data?.name
	const userRole = user?.role

	return (
		<>
			<main className='main-content'>
				{userRole == 'OrganizationUser' && (
					<div className='flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between'>
						<PageComponentTitle
							title='USER PROFILE'
							titleDescription='Now ,You can Edit your profile 🤩'
							buttonTitle='EDIT PROFILE'
							userData={profile_data}
							mutate={mutate}
						/>
					</div>
				)}

				<section className='grid-section'>
					<div className='w-full px-6 py-6 mx-auto flex loopple-min-height-78vh text-slate-500'>
						<div className='profile-card-style'>
							<div className=' -mx-3'>
								<div className='flex-none w-auto max-w-full px-3'>
									<div className='profile-img'>
										<Image
											src='/Images/userProfileAvtar.png'
											alt='profile_image'
											height={244}
											width={244}
											className='shadow-soft-sm rounded-xl'
										/>
									</div>
								</div>
								<div className='flex-none w-auto max-w-full px-3 my-auto'>
									<div className='h-full'>
										<h5 className='mb-1'>{userName}</h5>
										<p className='mb-0 font-bold leading-9 text-size-lg'>
											{profile_data?.email}
										</p>
									</div>
								</div>
								<div className='w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12'></div>
							</div>
						</div>
						<div className='w-full mx-auto removable'>
							<div className=''>
								<div className='w-full max-w-full px-3 lg-max:mt-6 xl:w-12/12 mb-4 '>
									<div className='user-info'>
										<div className='p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl'>
											<div className='-mx-3'>
												<div className='bg-blue-600 p-2 w-full font-bold text-lg text-center text-white rounded-md  pb-4'>
													<h6 className='mb-0 '>Profile Information</h6>
												</div>
												<div className='w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none'>
													<a
														href='javascript:;'
														data-target='tooltip_trigger'
														data-placement='top'>
														<i
															className='leading-normal fas fa-user-edit text-size-sm text-slate-400'
															aria-hidden='true'></i>
													</a>
													<div
														data-target='tooltip'
														className='px-2 py-1 text-center  bg-black rounded-lg text-size-sm hidden'
														role='tooltip'
														data-popper-placement='top'>
														Edit Profile
														<div
															className='edit-profile'
															data-popper-arrow=''></div>
													</div>
												</div>
											</div>
										</div>
										<div className='flex-auto p-4'>
											<table
												className='shadow-lg w-full bg-white border-collapse'
												border='5'>
												<tbody>
													<TableRow
														className='table-row'
														label='Full Name:'
														name={profile_data?.name}
													/>
													<TableRow
														className='table-row'
														label='Email:'
														name={profile_data?.email}
													/>
													{userRole == 'OrganizationUser' && (
														<>
															<TableRow
																className='table-row'
																label='Mobile:'
																name={profile_data?.mobile}
															/>
															<TableRow
																className='table-row'
																label='Quota Allotted:'
																name={profile_data?.quota}
															/>
															<TableRow
																className='table-row'
																label='Address:'
																name={profile_data?.address}
															/>
															<TableRow
																className='table-row'
																label='City:'
																name={profile_data?.city}
															/>
															<TableRow
																className='table-row'
																label='State:'
																name={profile_data?.state}
															/>
															<TableRow
																className='table-row'
																label='PinCode:'
																name={profile_data?.pincode}
															/>
														</>
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export default UserProfile
