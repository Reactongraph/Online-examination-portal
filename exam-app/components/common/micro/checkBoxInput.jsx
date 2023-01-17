export function CheckboxInput(props) {
	return (
		<>
			<input
				className='form-check-input appearance-none w-9 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm'
				type='checkbox'
				role='switch'
				id='flexSwitchCheckDefault'
				{...props}
			/>
		</>
	)
}
