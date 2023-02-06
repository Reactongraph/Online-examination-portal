import { InputComponent } from '../common/micro/textinput'

const CreateTableData = (WrappedComponent) => {
	function CreateTableData(props) {
		// const { module_data } = props

		function createData(rowStatus, rowId, ...args) {
			const action = (
				<>
					<button className='bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full'>
						Edit
					</button>
					&nbsp;
					<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
						Delete
					</button>
				</>
			)
			const status = (
				<>
					<div className='flex '>
						<InputComponent
							className='tab-status'
							type='checkbox'
							role='switch'
							id='flexSwitchCheckDefault'
							defaultChecked={rowStatus}
						/>
					</div>
				</>
			)
			return { status, action, ...args }
		}
		return (
			<>
				<WrappedComponent
					createData={createData}
					{...props}
				/>
			</>
		)
	}
	return CreateTableData
}

export default CreateTableData
