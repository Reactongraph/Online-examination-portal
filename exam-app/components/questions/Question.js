import React from 'react'
import ComponentTitle from './ComponentTitle'
import QuestionTable from './QuestionTable'

const Question = () => {
	return (
		<main className='p-6 sm:p-10 space-y-6'>
			<div className='flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between'>
				<ComponentTitle
					title='QUESTION'
					titleDescription='List of all question'
					buttonTitle='ADD NEW QUESTION'
				/>
			</div>

			<section className='grid md:grid-cols-1 xl:grid-cols-1 gap-6'>
				<div className='flex-grow items-center p-8 bg-white shadow rounded-lg'>
					<QuestionTable />
				</div>
			</section>
		</main>
	)
}

export default Question
