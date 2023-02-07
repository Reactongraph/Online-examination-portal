// import Layout from '../layout/Layout'
import Layout from '../components/layout/layout'
import { ModuleProvider } from '../context/module_data_context'
import { LevelProvider } from '../context/level_data_context'
import { QuestionProvider } from '../context/question_data_context'
import React from 'react'
export const QuestionHoc = (Component) => {
	return function QuestionHOC(props) {
		return (
			<>
				<LevelProvider>
					<ModuleProvider>
						<QuestionProvider>
							<Layout title='Questions'>
								<Component {...props} />
							</Layout>
						</QuestionProvider>
					</ModuleProvider>
				</LevelProvider>
			</>
		)
	}
}
