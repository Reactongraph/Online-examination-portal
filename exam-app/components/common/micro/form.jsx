export function Form(props) {
	return (
		<form
			className={props.className || 'w-full max-w-lg'}
			onSubmit={props.onSubmit}>
			{props.children}
		</form>
	)
}
