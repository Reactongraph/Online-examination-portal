import React from 'react'
import { Label } from './micro/label'
import { InputComponent } from './micro/inputComponent'

const TableFilter = ({ filterData, value, headerGroups, count }) => {
	return (
		<div className='sm:flex sm:gap-x-2'>
			<Label
				key={'default'}
				className={'flex gap-x-2 items-baseline'}>
				<React.Fragment>
					<span className='text-gray-700'>Search: </span>
					<InputComponent
						type='text'
						className='input-field-base'
						value={value || ''}
						onChange={filterData}
						placeholder={`${count} records...`}
					/>
				</React.Fragment>
			</Label>

			{headerGroups.map((headerGroup) =>
				headerGroup.headers.map((column) =>
					column.Filter ? (
						<div
							className='mt-2 sm:mt-0'
							key={column.id}>
							{column.render('Filter')}
						</div>
					) : null
				)
			)}
		</div>
	)
}

export default TableFilter
