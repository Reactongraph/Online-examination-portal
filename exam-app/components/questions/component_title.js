import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { CsvReader } from './csv_reader'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Banner } from '../common/micro/banner'
import { ButtonComponent } from '../common/micro/button_component'
import { InputComponent } from '../common/micro/input_component'
import Link from 'next/link'
import { QuestionContext } from '../../context/context'

const PageComponentTitle = ({ title, titleDescription, buttonTitle }) => {
	const router = useRouter()

	const { mutate } = useContext(QuestionContext)
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
						className={'csv-button'}>
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
					className='csv-add'
				/>
				<Link href={'/questions/new'}>
					<ButtonComponent className={'btn-primary'}>
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
