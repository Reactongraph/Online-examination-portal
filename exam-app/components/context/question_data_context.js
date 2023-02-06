import { GetQuestionData } from '../../apis/questions'
import { QuestionContext } from './context'

export const QuestionProvider = ({ children }) => {
	const { data: question_data, mutate } = GetQuestionData()

	return (
		<QuestionContext.Provider value={{ question_data, mutate }}>
			{children}
		</QuestionContext.Provider>
	)
}
