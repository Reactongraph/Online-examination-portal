import React from 'react'
import { useRouter } from 'next/router'
import { CsvReader } from './CsvReader'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Banner } from '../common/micro/banner'
import { ButtonComponent } from '../common/micro/buttonComponent'
import { InputComponent } from '../common/micro/inputComponent'
import Link from 'next/link'

const PageComponentTitle = ({
	title,
	titleDescription,
	buttonTitle,
	mutate,
}) => {
	const router = useRouter()
	const user = useSelector((state) => state?.user)

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

				<InputComponent
					type='file'
					accept='.csv'
					placeholder='Add Questions (.csv) '
					onChange={(e) => {
						handleCsv(e)
					}}
					className='px-6 py-2 mx-2 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out'
				/>
				<Link href={'/questions/new'}>
					<ButtonComponent className='btn-primary'>
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
				</Link>
				<ToastContainer />
			</div>
		</>
	)
}

export default PageComponentTitle
