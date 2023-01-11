import React from 'react'
import { useEffect } from 'react'
import {
    useTable,
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
} from 'react-table'
import TableFilter from './TableFilter'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import Pagination from './Pagination'

// Define a default UI for filtering
function Table({ columns, data }) {
    const [value, setValue] = React.useState('')
    const [dataSource, setDataSource] = React.useState(data)
    const [tableFilter, setTableFilter] = React.useState([])

    useEffect(() => {
        setDataSource(data)
    }, [data])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        state,
        preGlobalFilteredRows,
        // setGlobalFilter,
    } = useTable(
        {
            columns,
            data: value.length > 0 ? tableFilter : dataSource,
        },
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
        usePagination // new
    )

    const count = preGlobalFilteredRows.length

    // for searching the data
    const filterData = (e) => {
        if (e.target.value != '') {
            setValue(e.target.value)
            const filterTable = dataSource.filter((o) =>
                Object.keys(o).some((k) =>
                    String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
                )
            )
            setTableFilter([...filterTable])
        } else {
            setValue(e.target.value)
            setDataSource([...dataSource])
        }
    }

    // Use the state and functions returned from useTable to build your UI

    // Render the UI for your table
    return (
        <>
            <TableFilter filterData={filterData} value={value} headerGroups={headerGroups} count={count} />
            {/* table */}
            <div className='mt-4 flex flex-col'>
                <div className='-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8'>
                    <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                        <div className='shadow-lg  overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                            <table
                                {...getTableProps()}
                                className='min-w-full divide-y divide-gray-200'>
                                <TableHeader headerGroups={headerGroups} />
                                <TableBody getTableBodyProps={getTableBodyProps} page={page} prepareRow={prepareRow} />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <Pagination previousPage={previousPage} nextPage={nextPage} canPreviousPage={canPreviousPage} canNextPage={canNextPage} state={state} pageCount={pageCount} pageOptions={pageOptions} setPageSize={setPageSize} gotoPage={gotoPage} />
        </>
    )
}

export default Table
