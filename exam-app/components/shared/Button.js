import React from 'react'
import { classNames } from './Utils'

export function Button({ children, className, ...rest }) {
	return (
		<button
			type='button'
			className={classNames('btn-action', className)}
			{...rest}>
			{children}
		</button>
	)
}

export function PageButton({ children, className, ...rest }) {
	return (
		<button
			type='button'
			className={classNames('page-btn', className)}
			{...rest}>
			{children}
		</button>
	)
}
