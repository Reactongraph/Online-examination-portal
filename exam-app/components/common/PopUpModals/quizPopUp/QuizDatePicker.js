import DatePicker from 'react-datepicker'
import { Label } from '../../micro/label'
function QuizDatePicker(props) {
	const { selectedDate, setSelectedDate, timeTitle } = props
	return (
		<>
			<Label key={'grid-last-name'}> {timeTitle}</Label>
			<div class='flex items-center justify-center'>
				<div
					className='datepicker bg-gray-200relative form-floating mb-3 w-full '
					data-mdb-toggle-button='false'>
					<DatePicker
						className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
						selected={selectedDate}
						onChange={(date) => setSelectedDate(date)}
						placeholderText={'MMMM d, yyyy h:mm aa '}
						showTimeSelect
						popperClassName='react-datepicker-right'
						showYearDropdown // year show and scrolldown alos
						scrollableYearDropdown
						dateFormat='MMMM d, yyyy h:mm aa'
					/>
				</div>
			</div>
		</>
	)
}
export default QuizDatePicker
