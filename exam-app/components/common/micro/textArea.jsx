export function TextArea({ children, ...rest }) {
	return (
		<textarea
			className='form-input'
			{...rest}>
			{children}
		</textarea>
	)
}
