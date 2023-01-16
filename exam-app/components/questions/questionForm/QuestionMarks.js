function QuestionMarks(props) {
	const { marks, setMarks } = props
	return (
		<>
			<label
				htmlFor='default'
				className='block mb-2 text-sm font-medium text-gray-900 '>
				Marks
			</label>
			<input
				type='number'
				min='1'
				value={marks}
				onChange={(e) => setMarks(e.target.value)}
				required
				placeholder='eg. 1 , 2 etc ...'
				className='bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
			/>
		</>
	)
}
export default QuestionMarks
