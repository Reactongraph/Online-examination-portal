import React, { useState } from 'react'
import { Label } from './label'

export default function Dropdown(props) {
	const [selectedRole, setSelectedRole] = useState('')

	const handleSelect = (event) => {
		setSelectedRole(event.target.value)
		if (props.onChange) props.onChange(event)
	}
	return (
		<>
		<Label className={props.labelClassName} key={props.key}> {props.labelText}</Label>
		<select
			id={props.id ? props.id : 'default'}
			onChange={handleSelect}
			required={props.required}
			value={props.value}
			className={
				props.className
					? props.className
					: 'bg-gray-50 border  w-40 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
			}>
			<option
				value=''
				hidden>
				{props.label ? props.label : 'Select'}
			</option>
			,
			{props.options?.map((option, index) => (
				<option
					key={index}
					value={option.id || option.value || option.name}>
					{option.name || option.level || option.module || option}
				</option>
			))}
		</select>
		</>
	)
}
