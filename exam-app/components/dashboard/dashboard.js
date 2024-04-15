import {React, useContext, useEffect} from 'react'
import { Banner } from '../common/micro/banner'
import { OrganizationContext } from '../../context/context'
import { ParticipantContext} from '../../context/context'
import { QuestionContext } from '../../context/context'
import { QuizContext } from '../../context/context'
import { CgOrganisation } from 'react-icons/cg'
import { TiGroup } from 'react-icons/ti'
import { MdRateReview } from 'react-icons/md'
import { MdQuiz } from 'react-icons/md'


// ParticipantContext
const Dashboard = () => {
	const { organization_data, mutate: organizationMutate } = useContext(OrganizationContext)
    const { participant_data, mutate: participantMutate } = useContext(ParticipantContext)
    const { question_data, mutate: questionMutate } = useContext(QuestionContext)
	const { quiz_data, mutate: quizMutate } = useContext(QuizContext)
	
	return (
		<>
			<main className='main-content' >
				<div className='multi-column-spacing'>
					<Banner
						heading={'Dashboard'}
						subHeading={'Online Examination Portal'}
					/>
				</div>
				<section className='grid-with-two-col'>
					<div className='flex-card-container text-black'>
						<div className='blue-circle-badge'>
						
							<CgOrganisation size={30} />
						</div>
						{organization_data ? organization_data.length : "loading"}
						<div></div>
					</div>
					<div className='flex-card-container'>
						{/* <div className='inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6'> */}
						<div className='blue-circle-badge h-16 w-16 text-green-600 bg-green-100'>
					
							<TiGroup size={30} />
						</div>
						{participant_data ? participant_data.length : "loading"}
						<div></div>
					</div>
					<div className='flex-card-container'>
						<div className='blue-circle-badge h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6'>
						
							<MdRateReview size={30} />
						</div>
						{ question_data ?  question_data.length : "loading"}
						<div></div>
					</div>
					<div className='flex-card-container'>
						<div className='blue-circle-badge h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6'>
						
								<MdQuiz size={30} />
						</div>
						{quiz_data && quiz_data.data && quiz_data.data.quiz ? quiz_data.data.quiz.length : "loading"}
						<div></div>
					</div>
				</section>

				<section className='grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6'></section>
			</main>
		</>
	)
}

export default Dashboard
