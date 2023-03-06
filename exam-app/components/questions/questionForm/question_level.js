import Dropdown from '../../common/micro/dropdown'

function QuestionLevel(props) {
	const { selectedLevelId, handleLevelTypeSelect, levelData, isViewOnly } =
		props
	return (
		<>
			<Dropdown
				id='default'
				labelText={'Question Level '}
				key={'grid-last-name'}
				value={selectedLevelId}
				disabled={isViewOnly}
				required={true}
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
export default QuestionLevel
