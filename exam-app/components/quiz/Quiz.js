import React from 'react'
import QuizTable from './QuizTable'
import { FrontPageComponent } from '../common/FrontPageComponent'

const Quiz = ({ quiz_data, module_data, level_data, mutate }) => {
	return (
		<FrontPageComponent
			title='QUIZ'
			titleDescription='Create,view and delete Quiz'
			buttonTitle='ADD NEW QUIZ'
			editForm={false}
			mutate={mutate}
			data={quiz_data}
			TableComponent={QuizTable}
			level_data={level_data}
			module_data={module_data}
		/>
	)
}

export default Quiz
