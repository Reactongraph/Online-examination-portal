import React from 'react'
import { Banner } from './micro/banner'
import { ButtonComponent } from './micro/buttonComponent'
import { useRouter } from 'next/router'

const PageComponentTitle = ({ title, titleDescription, buttonTitle }) => {
	const router = useRouter()
	const handleAddClick = () => {
		router.push(`${router.asPath}/new`)
	}

	return (
		<>
			<Banner
				heading={title}
				subHeading={titleDescription}
			/>

			<div className='flex  flex-wrap items-start justify-end -mb-3'>
				<ButtonComponent
					className={
						'inline-flex px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-md ml-6 mb-3'
					}
					onClick={() => handleAddClick()}>
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
			</div>
		</>
	)
}

export default PageComponentTitle
