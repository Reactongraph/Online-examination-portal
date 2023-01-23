import { InputComponent } from '../common/micro/inputComponent'

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
							// onClick={() => handleBoxClick(rowId, rowStatus)}
							className='form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm'
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
