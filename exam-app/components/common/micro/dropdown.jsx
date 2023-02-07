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
			<Label
				className={props.labelClassName}
				key={props.key}>
				{' '}
				{props.labelText}
			</Label>
			<select
				id={props.id ? props.id : 'default'}
				onChange={handleSelect}
				required={props.required}
				disabled={props.disabled}
				value={props.value}
				className={props.className ? props.className : 'text-input-style'}>
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
