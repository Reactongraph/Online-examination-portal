import * as React from 'react'
import Quiz from '../../components/quiz/Quiz'
import { QuizHoc } from '../../components/highOrderComponents/QuizHoc'

const QuizWithContext = QuizHoc(Quiz)

// Use the wrapped components
export default function Quizzes() {
	return <QuizWithContext />
}
