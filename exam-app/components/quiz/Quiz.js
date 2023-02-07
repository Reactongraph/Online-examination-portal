import React from 'react'
import QuizTable from './QuizTable'
import { FrontPageComponent } from '../common/front_page_component'

const Quiz = () => {
	return (
		<FrontPageComponent
			title='QUIZ'
			titleDescription='Create,view and delete Quiz'
			buttonTitle='ADD NEW QUIZ'
			editForm={false}
			TableComponent={QuizTable}
		/>
	)
}

export default Quiz
