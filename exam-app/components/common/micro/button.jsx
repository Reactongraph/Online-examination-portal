export function ButtonComponent({ key, children, className, ...rest }) {
	return (
		<button
		    type={key}
			className={className || 'btn-primary'}
			{...rest}>
			{children}
		</button>
	)
}
