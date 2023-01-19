import Dropdown from '../../micro/dropdown'

function QuizLevelSelect(props) {
	const { selectedLevelId, handleLevelTypeSelect, levelData } = props

	return (
		<>
			<Dropdown
				id='default'
				value={selectedLevelId}
				required={true}
				className={
					'bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}
				label='Select '
				options={levelData?.data}
				onChange={(e) => {
					handleLevelTypeSelect(e)
				}}
			/>
		</>
	)
}

export default QuizLevelSelect
