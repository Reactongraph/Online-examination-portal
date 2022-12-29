import React, { useState } from 'react'
import OrganizationModal from './OrganizationModal'
import ParticipantModal from './ParticipantModal'
import LevelModal from './LevelModal'
import ModuleModal from './ModuleModal'
import QuizModal from './QuizModal'
import UserProfileModal from './UserProfileModal'

const PageComponentTitle = ({
	title,
	titleDescription,
	buttonTitle,
	quiz_data,
	module_data,
	level_data,
	organization_data,
	userData,
}) => {
	const [modal, setModal] = useState(false)

	// const checkModal = (title) => {}

	return (
		<>
			<div className='mr-6'>
				<h1 className='text-4xl font-semibold mb-2'>{title}</h1>
				<h2 className='text-gray-600 ml-0.5'>{titleDescription}</h2>
			</div>

			<div className='flex  flex-wrap items-start justify-end -mb-3'>
				<button
					className='inline-flex px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-md ml-6 mb-3'
					onClick={() => setModal(true)}>
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
				</button>

				{title == 'PARTICIPANT' ? (
					<>
						<ParticipantModal
							modal={modal}
							setModal={setModal}
							organization_data={organization_data}
						/>
					</>
				) : title == 'LEVEL' ? (
					<>
						<LevelModal
							modal={modal}
							setModal={setModal}
						/>
					</>
				) : title == 'MODULE' ? (
					<>
						<ModuleModal
							modal={modal}
							setModal={setModal}
						/>
					</>
				) : title == 'QUIZ' ? (
					<>
						<QuizModal
							quiz_data={quiz_data}
							level_data={level_data}
							module_data={module_data}
							modal={modal}
							setModal={setModal}
						/>
					</>
				) : title == 'USER PROFILE' ? (
					<>
						<UserProfileModal
							modal={modal}
							setModal={setModal}
							userData={userData}
						/>
					</>
				) : (
					<>
						<OrganizationModal
							modal={modal}
							setModal={setModal}
						/>
					</>
				)}
			</div>
		</>
	)
}

export default PageComponentTitle
