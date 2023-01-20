export function Label({ key, children, className, ...rest }) {
	return (
		<label
			className={
				className ||
				'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
			}
			htmlFor={key || 'default'}
			{...rest}>
			{children}
		</label>
	)
}
