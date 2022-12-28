import React from 'react'

const UserProfile = ({ profile_data }) => {
	const userName = profile_data.name
	return (
		<main className='p-6 sm:p-10 space-y-6'>
			<div className='w-full px-6 py-6 mx-auto flex loopple-min-height-78vh text-slate-500'>
				<div className='relative flex flex-col flex-auto min-w-0 shadow-lg p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4'>
					<div className=' -mx-3'>
						<div className='flex-none w-auto max-w-full px-3'>
							<div className='text-size-base ease-soft-in-out shadow  h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200'>
								<img
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
									{profile_data.email}
								</p>
							</div>
						</div>
						<div className='w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12'></div>
					</div>
				</div>
				<div className='w-full mx-auto removable'>
					<div className=''>
						<div className='w-full max-w-full px-3 lg-max:mt-6 xl:w-12/12 mb-4 '>
							<div className='relative ml-2 flex flex-col h-full min-w-0 break-words shadow-lg  bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border'>
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
													className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
													data-popper-arrow=''></div>
											</div>
										</div>
									</div>
								</div>
								<div className='flex-auto p-4'>
									{/* <p className='leading-normal text-size-sm'>
										Hi, I’m Alec Thompson, Decisions: If you can’t decide, the
										answer is no. If two equally difficult paths, choose the one
										more painful in the short term (pain avoidance is creating
										an illusion of equality).
									</p> */}
									{/* <hr className="h-px my-6 bg-transparent bg-gradient-horizontal-light"> */}
									{/* <ul className='flex flex-col pl-0 mb-0 rounded-lg'>
										<li className='relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit'>
											<strong className='text-slate-700'> Full Name:</strong>{' '}
											&nbsp; {profile_data.name}
										</li>
										<li className='relative block px-4 hover:shadow-lg shadow py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit'>
											<strong className='text-slate-700'>Mobile:</strong> &nbsp;
											{profile_data.mobile}
										</li>
										<li className='relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit'>
											<strong className='text-slate-700'>Email:</strong> &nbsp;
											{profile_data.email}
										</li>
										<li className='relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit'>
											<strong className='text-slate-700'>
												Quota Allotted:
											</strong>{' '}
											&nbsp; {profile_data.quota}
										</li>
										<li className='relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit'>
											<strong className='leading-normal text-size-sm text-slate-700'>
												Address:
											</strong>{' '}
											&nbsp; {profile_data.address}
										</li>
										<li className='relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit'>
											<strong className='leading-normal text-size-sm text-slate-700'>
												City:
											</strong>{' '}
											&nbsp; {profile_data.city}
										</li>
										<li className='relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit'>
											<strong className='leading-normal text-size-sm text-slate-700'>
												State:
											</strong>{' '}
											&nbsp; {profile_data.state}
										</li>
										<li className='relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit'>
											<strong className='leading-normal text-size-sm text-slate-700'>
												PinCode:
											</strong>{' '}
											&nbsp; {profile_data.pincode}
										</li>
									</ul> */}

									<table
										className='shadow-lg w-full bg-white border-collapse'
										border='5'>
											<thead>
												{/* <tr class="bg-blue-100 border text-left px-8 py-4">Profile Information </tr> */}
												
												{/* <th className='bg-blue-100 border text-left px-8 py-4'> Information</th> */}
											</thead>
										<tbody>
											<tr>
												<td class='border px-8 py-4 bg-blue-100'>
													<strong className='text-slate-700'>
														{' '}
														Full Name:
													</strong>
												</td>
												<td class='border px-8 py-4 bg-blue-100'>{profile_data.name}</td>
											</tr>
											<tr className='hover:bg-blue-50'>
												<td class='border px-8 py-4 '>
													<strong className='text-slate-700'>
														{' '}
														Email:
													</strong>
												</td>
												<td class='border px-8 py-4'>{profile_data.email}</td>
											</tr>
											<tr>
												<td class='border px-8 py-4 bg-blue-100'>
													<strong className='text-slate-700'>
														{' '}
														Mobile:
													</strong>
												</td>
												<td class='border px-8 py-4 bg-blue-100'>{profile_data.mobile}</td>
											</tr>
											<tr  className='hover:bg-blue-50'>
												<td class='border px-8 py-4'>
													<strong className='text-slate-700'>
														{' '}
														Quota Allotted:
													</strong>
												</td>
												<td class='border px-8 py-4'>{profile_data.quota}</td>
											</tr>
											<tr>
												<td class='border px-8 py-4 bg-blue-100'>
													<strong className='text-slate-700'>
														{' '}
														Address:
													</strong>
												</td>
												<td class='border px-8 py-4 bg-blue-100'>{profile_data.address}</td>
											</tr>
											<tr  className='hover:bg-blue-50'>
												<td class='border px-8 py-4'>
													<strong className='text-slate-700'>
														{' '}
														City:
													</strong>
												</td>
												<td class='border px-8 py-4'>{profile_data.city}</td>
											</tr>
											<tr>
												<td class='border px-8 py-4 bg-blue-100'>
													<strong className='text-slate-700'>
														{' '}
														State:
													</strong>
												</td>
												<td class='border px-8 py-4 bg-blue-100'>{profile_data.state}</td>
											</tr>
											<tr  className='hover:bg-blue-50'>
												<td class='border px-8 py-4'>
													<strong className='text-slate-700'>
														{' '}
														PinCode
													</strong>
												</td>
												<td class='border px-8 py-4'>{profile_data.pincode}</td>
											</tr>
											{/* <tr>
												<td class='border px-8 py-4'>text2.1</td>
												<td class='border px-8 py-4'>text2.2</td>
											</tr>
											<tr>
												<td class='border px-8 py-4'>text3.1</td>
												<td class='border px-8 py-4'>text3.2</td>
											</tr>
											<tr></tr> */}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default UserProfile
