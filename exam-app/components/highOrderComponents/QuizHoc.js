import { LevelContextProvider } from '../context/level_data_context'
import { ModuleContextProvider } from '../context/module_data_context'
import { QuizContextProvider } from '../context/quiz_data_context'

import Layout from '../layout/Layout'

export const QuizHoc = (Component) => {
	return function QuizHoc(props) {
		return (
			<LevelContextProvider>
				<ModuleContextProvider>
					<QuizContextProvider>
						<Layout title='Quiz'>
							<Component {...props} />
						</Layout>
					</QuizContextProvider>
				</ModuleContextProvider>
			</LevelContextProvider>
		)
	}
}
