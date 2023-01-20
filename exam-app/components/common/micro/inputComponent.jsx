export function InputComponent({ type, value, className, ...rest }) {
	return (
		<input
			type={type}
			value={value}
			className={
				className ||
				'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
			}
			{...rest}
		/>
	)
}
