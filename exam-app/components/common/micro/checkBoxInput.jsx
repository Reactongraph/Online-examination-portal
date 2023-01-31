export function CheckboxInput(props) {
	return (
		<>
			<input
				className='btn-checkbox'
				type='checkbox'
				role='switch'
				id='flexSwitchCheckDefault'
				{...props}
			/>
		</>
	)
}
