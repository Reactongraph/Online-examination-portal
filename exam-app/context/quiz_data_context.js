import { useSelector } from 'react-redux'
import { GetQuizData, GetQuizDataWithOrgId } from '../apis/quizzes'
import { QuizContext } from './context'
import Layout from '../components/layout/layout'

export const QuizProvider = ({ children }) => {
	const user = useSelector((state) => state?.user)
	const { data } =
		user?.role == 'SuperAdminUser'
			? GetQuizData()
			: GetQuizDataWithOrgId(user.Org_id)

	if (data?.error) {
		return (
			<>
				<Layout title='Quiz'>
					<h1>Loading ...</h1>
				</Layout>
			</>
		)
	}

	return (
		<QuizContext.Provider value={{ quiz_data: data?.quiz }}>
			{children}
		</QuizContext.Provider>
	)
}
