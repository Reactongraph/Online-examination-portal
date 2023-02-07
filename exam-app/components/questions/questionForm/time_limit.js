import Dropdown from '../../common/micro/dropdown'
import { TimeData } from '../../drop_down_data/timeLimit'

function TimeLimit(props) {
	const { timeLimitSelect, handleTimeLimitSelect, isViewOnly } = props
	return (
		<>
			<Dropdown
				id='default'
				labelText={'Time Limit '}
				value={timeLimitSelect}
				required={true}
				disabled={isViewOnly}
				className={'input-style'}
				label='Select '
				options={TimeData}
				onChange={handleTimeLimitSelect}
			/>
		</>
	)
}
export default TimeLimit
