import { LevelProvider } from '../context/level_data_context'
import { ModuleProvider } from '../context/module_data_context'
import { QuizProvider } from '../context/quiz_data_context'

// import Layout from '../layout/Layout'
import Layout from '../components/layout/layout'

export const QuizHoc = (Component) => {
	return function QuizHoc(props) {
		return (
			<LevelProvider>
				<ModuleProvider>
					<QuizProvider>
						<Layout title='Quiz'>
							<Component {...props} />
						</Layout>
					</QuizProvider>
				</ModuleProvider>
			</LevelProvider>
		)
	}
}
