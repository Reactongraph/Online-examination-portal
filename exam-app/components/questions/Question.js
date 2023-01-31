import React from 'react'
import ComponentTitle from './ComponentTitle'
import QuestionTable from './QuestionTable'

const Question = ({ question_data, mutate }) => {
	return (
		<main className='p-6 sm:p-10 space-y-6'>
			<div className='multi-column-spacing'>
				<ComponentTitle
					title='QUESTION'
					titleDescription='List of all question'
					buttonTitle='ADD NEW QUESTION'
					mutate={mutate}
				/>
			</div>

			<section className='grid md:grid-cols-1 xl:grid-cols-1 gap-6'>
				<div className='flex-grow items-center p-8 bg-white shadow rounded-lg'>
					<QuestionTable
						question_data={question_data}
						mutate={mutate}
						// level_data={level_data}
						// module_data={module_data}
					/>
				</div>
			</section>
		</main>
	)
}

export default Question
