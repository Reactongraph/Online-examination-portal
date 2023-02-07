import Dropdown from '../../micro/dropdown'

function QuizLevelSelect(props) {
	const { selectedLevelId, handleLevelTypeSelect, levelData, isViewOnly } =
		props

	return (
		<>
			<Dropdown
				id='default'
				labelClassName={'mr-2 text-sm font-medium text-gray-900'}
				labelText={'Question Level '}
				key={'grid-last-name'}
				value={selectedLevelId}
				required={true}
				disabled={isViewOnly}
				className={'input-style'}
				label='Select '
				options={levelData}
				onChange={(e) => {
					handleLevelTypeSelect(e)
				}}
			/>
		</>
	)
}

export default QuizLevelSelect
