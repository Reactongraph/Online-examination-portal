import * as React from 'react'
import Quiz from '../../components/quiz/quiz'
import { QuizHoc } from '../../HOC/quiz_hoc'

const QuizWithContext = QuizHoc(Quiz)

// Use the wrapped components
export default function Quizzes() {
	return <QuizWithContext />
}
