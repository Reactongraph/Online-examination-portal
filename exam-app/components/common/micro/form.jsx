export function Form(props) {
	return (
		<form
			className={props.className || 'w-full'}
			onSubmit={props.onSubmit}>
			{props.children}
		</form>
	)
}
