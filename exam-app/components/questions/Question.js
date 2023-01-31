import React from 'react'
import ComponentTitle from './ComponentTitle'
import QuestionTable from './QuestionTable'

const Question = () => {
	return (
		<main className='main-content'>
		<main className='main-content'>
			<div className='multi-column-spacing'>
				<ComponentTitle
					title='QUESTION'
					titleDescription='List of all question'
					buttonTitle='ADD NEW QUESTION'
					mutate={mutate}
				/>
			</div>

			<section className='grid-section'>
				<div className='table-section'>
					<QuestionTable />
				</div>
			</section>
		</main>
	)
}

export default Question
