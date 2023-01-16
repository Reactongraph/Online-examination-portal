import moment from 'moment'
import QuizCreateData from './QuizCreateData'
function QuizDataArray(
	quiz_data,
	handleEditClick,
	handleBoxClick,
	handleRemoveClick
) {
	const rowsDataArray = quiz_data.data?.quiz.map((element) => {
		let quiz = element.quiz_name
		let quiz_id = element._id.$oid
		let quiz_status = element.status
		let moduleNameArray = []
		let moduleArray = element.module
		moduleArray.map((oneModule) => {
			moduleNameArray.push(oneModule.module)
		})

		let modules = moduleNameArray.join()
		let { level } = element.level
		let start_date = element.start_date.$date
		start_date = moment(start_date).format('llll')

		let end_date = element.end_date.$date
		end_date = moment(end_date).format('llll')

		return QuizCreateData(
			quiz,
			element,
			quiz_id,
			quiz_status,
			modules,
			level,
			end_date,
			start_date,
			handleEditClick,
			handleRemoveClick,
			handleBoxClick
		)
	})
	return rowsDataArray
}

export default QuizDataArray
