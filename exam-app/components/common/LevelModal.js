import React, { useState } from 'react'
import PureModal from 'react-pure-modal'
import 'react-pure-modal/dist/react-pure-modal.min.css'
import { useForm } from 'react-hook-form'
import { SERVER_LINK } from '../../helpers/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

const LevelModal = ({ modal, setModal }) => {
	// const [selectedImage, setSelectedImage] = useState()
	const router = useRouter()
	const [level, setLevel] = useState('')
	// const [buttonText, setButtonText] = useState('Add')
	const buttonText = 'Add'
	const { handleSubmit } = useForm()
	const login_token = useSelector((state) => state.user.token)

	// for sending the data to the backend
	const checkWithDatabase = async (data) => {
		data.status = true
		data.level = level

		let LevelData = JSON.stringify(data)

		// for taking the patch api data
		if (data.level !== null && data.level != '') {
			await axios({
				url: `${SERVER_LINK}/level`,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
					Authorization: login_token,
				},
				data: LevelData,
			})
				.then(() => {
					router.replace(router.asPath)
					setLevel('')
					setModal(!modal)
					toast.success('level inserted')
				})
				.catch((err) => {
					return err
				})
		}

		// for new data registration
		else {
			toast.error("Field Can't be empty ")
		}
	}

	return (
		<>
			<PureModal
				isOpen={modal}
				width='800px'
				onClose={() => {
					setLevel('')
					setModal(false)
				}}>
				<div className='flex-row space-y-3 relative'>
					<div className='bg-blue-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4'>
						<p>{buttonText} LEVEL</p>
					</div>

					<div class='py-6 px-6 lg:px-8'>
						<form
							class='w-full max-w-lg'
							onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
							<div class='flex flex-wrap -mx-3 mb-6'>
								<div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<label
										class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-first-name'>
										Enter Level
									</label>
									<input
										class='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										id='grid-first-name'
										type='text'
										value={level}
										onChange={(e) => setLevel(e.target.value)}
										placeholder='eg. Easy , Moderate , etc ...'
									/>
								</div>
							</div>

							<button
								type='submit'
								class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								{buttonText}
							</button>
						</form>
					</div>

					{/* */}
				</div>
			</PureModal>

			<ToastContainer />
		</>
	)
}

export default LevelModal
