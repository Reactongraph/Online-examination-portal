import { GetQuestionData } from '../../apis/questions'
import { QuestionContext } from './context'

export const QuestionContextProvider = ({ children }) => {
	const { data: question_data, mutate } = GetQuestionData()

	return (
		<QuestionContext.Provider value={{ question_data, mutate }}>
			{children}
		</QuestionContext.Provider>
	)
}
