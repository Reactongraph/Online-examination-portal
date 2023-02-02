export function InputComponent({ type, value, className, ...rest }) {
	return (
		<input
			type={type}
			value={value}
			className={
				className ||
				'input-field'
			}
			{...rest}
		/>
	)
}
