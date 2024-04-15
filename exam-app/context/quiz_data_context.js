import { GetQuizData } from '../apis/quizzes'
import { QuizContext } from './context'

export const QuizProvider = ({ children }) => {
	const data = GetQuizData()
	
	return (
		<QuizContext.Provider value={{ quiz_data: data }}>
			{children}
		</QuizContext.Provider>
	)
}
