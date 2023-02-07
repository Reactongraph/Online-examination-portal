import { SortDownIcon, SortIcon, SortUpIcon } from '../shared/Icons'

const TableHeader = ({ headerGroups }) => {
	return (
		<thead className='bg-gray-50'>
			{headerGroups.map((headerGroup, i) => (
				<tr
					key={`column-${i}`}
					{...headerGroup.getHeaderGroupProps()}
					className='bg-slate-200 '>
					{headerGroup.headers.map((column, i) => (
						// Add the sorting props to control sorting. For this example
						// we can add them into the header props
						<th
							key={`head-${i}`}
							scope='col'
							className='group px-6 py-3 text-center font-bold text-black-700 uppercase tracking-wider'
							{...column.getHeaderProps(column.getSortByToggleProps())}>
							<div className='flex items-center justify-between'>
								{column.render('Header')}
								{/* Add a sort direction indicator */}
								<span>
									{column.isSorted ? (
										column.isSortedDesc ? (
											<SortDownIcon className='w-4 h-4 text-gray-400' />
										) : (
											<SortUpIcon className='w-4 h-4 text-gray-400' />
										)
									) : (
										<SortIcon className='w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100' />
									)}
								</span>
							</div>
						</th>
					))}
				</tr>
			))}
		</thead>
	)
}

export default TableHeader
