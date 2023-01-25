import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GetOrganizationData } from '../../apis/organizations'
import {
	AddParticipant,
	EditParticipant,
	GetParticipantDataWithOrgId,
} from '../../apis/participants'
import { Banner } from '../common/micro/banner'
import { ButtonComponent } from '../common/micro/buttonComponent'
import Dropdown from '../common/micro/dropdown'
import { Form } from '../common/micro/form'
import { InputComponent } from '../common/micro/inputComponent'
import { Label } from '../common/micro/label'

const CreateParticipant = () => {
	const router = useRouter()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')

	const [mobile, setMobile] = useState('')

	const [buttonText, setButtonText] = useState('Add')

	const [password, setPassword] = useState('')
	const [selectedorganizationId, setSelectedOrganizationId] = useState('')

	const { handleSubmit } = useForm()
	const [editform, setEditForm] = useState(false)
	const Org = useSelector((state) => state?.user)
	const [showPassword, setShowPassword] = useState(false)
	const organization_data = GetOrganizationData().data
	const handleOrganizationIdTypeSelect = (event) => {
		let organizationId = event.target.value
		setSelectedOrganizationId(organizationId)
	}
	useEffect(() => {
		let participant_id = router.query?.id
		async function getParticipantData() {
			const result = await GetParticipantDataWithOrgId(participant_id)
			const participantData = result.data
			const rowsDataArray = participantData?.map((element) => {
				setName(element?.name)
				setEmail(element?.email)
				setPassword(element?.password)
				setMobile(element?.mobile)
				return element
			})
			setButtonText('Edit')
			setEditForm(true)
		}
		if (router.query.id) {
			getParticipantData()
		}
	}, [router.query?.id])
	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.name = name
		data.email = email
		data.mobile = mobile

		data.password = password
		if (editform) {
			let participantData = JSON.stringify(data)

			EditParticipant(participantData, router.query.id)
				.then(async () => {
					toast.success('participant  updated')
					router.replace(`/dashboard/participant`)
				})
				.catch(() => {
					toast.error('invalid request')
				})
		} else {
			// for new data registration
			data.id = Org.Org_id
			let participantData = JSON.stringify(data)
			AddParticipant(participantData)
				.then(() => {
					router.replace(router.asPath)
					setName('')
					setEmail('')
					setMobile('')
					setPassword('')
					// setModal(!modal)
					toast.success('participant created!')
				})
				.catch(() => {
					toast.error('Invalid Request')
				})
		}
	}
	return (
		<>
			<div className='flex-row space-y-3 relative px-12 bg-gray-100'>
				<div className='flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between'>
					<Banner
						heading={`${buttonText} Participant`}
						subHeading={'Easy to understand'}
						additionalClassName={'my-4 ml-3'}
					/>
				</div>

				<div className=' m-auto py-6 px-6 lg:px-8 bg-white max-w-lg rounded-lg'>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div className='flex flex-wrap -mx-3 mb-6 '>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-first-name'}>Name</Label>
									<InputComponent
										type='text'
										onChange={(e) => setName(e.target.value)}
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										placeholder='Jane'
										required='required'
										value={name}
										id='name'
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'grid-first-name'}>Email</Label>
									<InputComponent
										onChange={(e) => setEmail(e.target.value)}
										id='email'
										type='email'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										placeholder='example@gmail.com '
										required='required'
										value={email}
									/>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-password'}> Password</Label>

									<div class='relative'>
										<InputComponent
											onChange={(e) => setPassword(e.target.value)}
											id='password'
											className={
												'appearance-none block w-full p-4  bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
											}
											type={!showPassword ? 'password' : 'text'}
											placeholder={'******************'}
											required={'required'}
											value={password}
										/>

										<ButtonComponent
											type={'button'}
											className={
												'text-white absolute right-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-500   font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-300 dark:hover:bg-blue-400 '
											}
											onClick={() => setShowPassword(!showPassword)}>
											{!showPassword ? 'Show' : 'Hide'}
										</ButtonComponent>
									</div>
									<p className='text-gray-600 text-xs italic'>
										Make it as long and as crazy as you'd like
									</p>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-mobile'}> Mobile</Label>
									<InputComponent
										onChange={(e) => setMobile(e.target.value)}
										id='mobile'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										}
										type={'text'}
										placeholder={'+91 '}
										required={'required'}
										value={mobile}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Dropdown
										id='default'
										labelText={'Organization Name '}
										value={selectedorganizationId}
										required={true}
										className={
											'bg-gray-50 border w-full border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
										}
										label='Select Organization '
										options={organization_data}
										onChange={(e) => {
											handleOrganizationIdTypeSelect(e)
										}}
									/>
								</div>
							</div>
							<ButtonComponent key={'submit'}>{buttonText}</ButtonComponent>
						</React.Fragment>
					</Form>
				</div>
			</div>
		</>
	)
}
export default CreateParticipant
