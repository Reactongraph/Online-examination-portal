import Layout from '../layout/Layout'
import { ModuleContextProvider } from '../context/module_data_context'
import { LevelContextProvider } from '../context/level_data_context'
import { QuestionContextProvider } from '../context/question_data_context'
import React from 'react'
export const QuestionHoc = (Component) => {
	return function QuestionHOC(props) {
		return (
			<>
				<LevelContextProvider>
					<ModuleContextProvider>
						<QuestionContextProvider>
							<Layout title='Questions'>
								<Component {...props} />
							</Layout>
						</QuestionContextProvider>
					</ModuleContextProvider>
				</LevelContextProvider>
			</>
		)
	}
}
