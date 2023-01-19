import React from 'react'
import { useRouter } from 'next/router'
import { CsvReader } from './CsvReader'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Banner } from '../common/micro/banner'
import { ButtonComponent } from '../common/micro/buttonComponent'

const PageComponentTitle = ({
	title,
	titleDescription,
	buttonTitle,
	mutate,
}) => {
	const router = useRouter()
	const user = useSelector((state) => state?.user)

	// const checkModal = (title) => {}
	const handleAddClick = () => {
		router.push('/dashboard/questions/addQuestion')
	}

	const handleCsv = (e) => {
		const result = CsvReader(e.target.files[0], user, mutate)

		if (result == 1) {
			setTimeout(() => {
				mutate()
				router.replace(router.asPath)

				e.target.value = null
			}, 500)
		}
	}

	return (
		<>
			<Banner
				heading={title}
				subHeading={titleDescription}
			/>

			<div className='flex  flex-wrap items-start justify-end -mb-3'>
				<a
					href='/Images/sampleQuestions.csv'
					download>
					<ButtonComponent
						type='button'
						className={
							'inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out'
						}>
						Download sample (.csv)
					</ButtonComponent>
				</a>

				<input
					type='file'
					accept='.csv'
					placeholder='Add Questions (.csv) '
					onChange={(e) => {
						handleCsv(e)
					}}
					className='px-6 py-2 mx-2 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out'
				/>

				<ButtonComponent
					className={
						'inline-flex px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-md ml-6 mb-3'
					}
					onClick={handleAddClick}>
					<React.Fragment>
						<svg
							aria-hidden='true'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							className='flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 6v6m0 0v6m0-6h6m-6 0H6'
							/>
						</svg>
						{buttonTitle}
					</React.Fragment>
				</ButtonComponent>
				<ToastContainer />
			</div>
		</>
	)
}

export default PageComponentTitle
