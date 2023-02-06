import React from 'react'
import QuizTable from './QuizTable'
import { FrontPageComponent } from '../common/FrontPageComponent'

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
