function QuizLevelSelect(props) {
	const { selectedLevelId, handleLevelTypeSelect, levelData } = props
	return (
		<>
			<select
				id='default'
				value={selectedLevelId}
				onChange={(e) => {
					handleLevelTypeSelect(e)
				}}
				required
				className='bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'>
				<option
					value=''
					hidden>
					Select
				</option>
				{levelData &&
					levelData.map((response, i) => (
						<option
							key={i}
							value={response.id}>
							{response.level}
						</option>
					))}
			</select>
		</>
	)
}

export default QuizLevelSelect
