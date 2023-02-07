import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/solid'
import { Button, PageButton } from '../shared/Button'
import { Label } from './micro/label'
import React from 'react'

const Pagination = ({
	previousPage,
	nextPage,
	canPreviousPage,
	canNextPage,
	state,
	pageCount,
	pageOptions,
	setPageSize,
	gotoPage,
}) => {
	return (
		<div className='py-3 flex items-center justify-between'>
			<div className='flex-1 flex justify-between sm:hidden'>
				<Button
					onClick={() => previousPage()}
					disabled={!canPreviousPage}>
					Previous
				</Button>
				<Button
					onClick={() => nextPage()}
					disabled={!canNextPage}>
					Next
				</Button>
			</div>
			<div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
				<div className='flex gap-x-2 items-baseline'>
					<span className='text-sm text-gray-700'>
						Page <span className='font-medium'>{state.pageIndex + 1}</span> of{' '}
						<span className='font-medium'>{pageOptions.length}</span>
					</span>

					<Label key={'default'}>
						<React.Fragment>
							<span className='sr-only'>Items Per Page</span>
							<select
								className='mt-1 block w-full input-field-base'
								value={state.pageSize}
								onChange={(e) => {
									setPageSize(Number(e.target.value))
								}}>
								{[5, 10, 20].map((pageSize) => (
									<option
										key={pageSize}
										value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
						</React.Fragment>
					</Label>
				</div>
				<div>
					<nav
						className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
						aria-label='Pagination'>
						<PageButton
							className='rounded-l-md'
							onClick={() => gotoPage(0)}
							disabled={!canPreviousPage}>
							<span className='sr-only'>First</span>
							<ChevronDoubleLeftIcon
								className='h-5 w-5 text-gray-400'
								aria-hidden='true'
							/>
						</PageButton>
						<PageButton
							onClick={() => previousPage()}
							disabled={!canPreviousPage}>
							<span className='sr-only'>Previous</span>
							<ChevronLeftIcon
								className='h-5 w-5 text-gray-400'
								aria-hidden='true'
							/>
						</PageButton>
						<PageButton
							onClick={() => nextPage()}
							disabled={!canNextPage}>
							<span className='sr-only'>Next</span>
							<ChevronRightIcon
								className='h-5 w-5 text-gray-400'
								aria-hidden='true'
							/>
						</PageButton>
						<PageButton
							className='rounded-r-md'
							onClick={() => gotoPage(pageCount - 1)}
							disabled={!canNextPage}>
							<span className='sr-only'>Last</span>
							<ChevronDoubleRightIcon
								className='h-5 w-5 text-gray-400'
								aria-hidden='true'
							/>
						</PageButton>
					</nav>
				</div>
			</div>
		</div>
	)
}

export default Pagination
