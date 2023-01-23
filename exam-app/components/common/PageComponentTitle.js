import React, { useState } from 'react'
import OrganizationModal from './OrganizationModal'
import ParticipantModal from './ParticipantModal'
import LevelModal from './LevelModal'
import ModuleModal from './ModuleModal'
import QuizModal from './QuizModal'
import UserProfileModal from './UserProfileModal'
import { Banner } from './micro/banner'
import { ButtonComponent } from './micro/buttonComponent'
import { PageComponentTitleContext } from '../context'

const PageComponentTitle = ({
	title,
	titleDescription,
	buttonTitle,
	organization_data,
	userData,
	mutate,
}) => {
	const [modal, setModal] = useState(false)

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
					onClick={() => setModal(true)}>
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

				<PageComponentTitleContext.Provider value={{ modal, setModal }}>
					{title == 'PARTICIPANT' ? (
						<>
							<ParticipantModal organization_data={organization_data} />
						</>
					) : title == 'LEVEL' ? (
						<>
							<LevelModal mutate={mutate} />
						</>
					) : title == 'MODULE' ? (
						<>
							<ModuleModal mutate={mutate} />
						</>
					) : title == 'QUIZ' ? (
						<>
							<QuizModal />
						</>
					) : title == 'USER PROFILE' ? (
						<>
							<UserProfileModal
								userData={userData}
								mutate={mutate}
							/>
						</>
					) : (
						<>
							<OrganizationModal mutate={mutate} />
						</>
					)}
				</PageComponentTitleContext.Provider>
			</div>
		</>
	)
}

export default PageComponentTitle
