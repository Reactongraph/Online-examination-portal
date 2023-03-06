export function CheckboxInput(props) {
	return (
		<>
			<input
				className='checkbox'
				type='checkbox'
				role='switch'
				id='flexSwitchCheckDefault'
				{...props}
			/>
		</>
	)
}
