const TableFilter = ({ filterData, value, headerGroups, count }) => {
	return (
		<div className='sm:flex sm:gap-x-2'>
			<label className='flex gap-x-2 items-baseline'>
				<span className='text-gray-700'>Search: </span>
				<input
					type='text'
					className='rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
					value={value || ''}
					onChange={filterData}
					placeholder={`${count} records...`}
				/>
			</label>
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
