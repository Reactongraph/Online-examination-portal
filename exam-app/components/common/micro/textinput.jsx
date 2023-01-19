import { useState } from 'react'

export function TextInput({
	type = 'text',
	value: initialValue,
	onChange: onChangeProp,
	...rest
}) {
	const [value, setValue] = useState(initialValue)

	const handleChange = (e) => {
		setValue(e.target.value)
		if (onChangeProp) {
			onChangeProp(e)
		}
	}

	return (
		<input
			type={type}
			value={value}
			onChange={handleChange}
			className={
				rest.className ||
				'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
			}
			{...rest}
		/>
	)
}
