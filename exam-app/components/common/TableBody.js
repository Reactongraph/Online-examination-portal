const TableBody = ({ getTableBodyProps, page, prepareRow }) => {
    return (
        <tbody
            {...getTableBodyProps()}
            className='bg-white divide-y divide-gray-200'>
            {page.map((row, i) => {
                // new
                prepareRow(row)
                return (
                    <tr
                        key={`row-${i}`}
                        {...row.getRowProps()}
                        className='bg-slate-50'>
                        {row.cells.map((cell, i) => {
                            return (
                                <td
                                    key={`cell-${i}`}
                                    {...cell.getCellProps()}
                                    className='px-6 py-4  uppercase whitespace-nowrap'
                                    role='cell'>
                                    {cell.column.Cell.name === 'defaultRenderer' ? (
                                        <div className='text-sm text-gray-500'>
                                            {cell.render('Cell')}
                                        </div>
                                    ) : (
                                        cell.render('Cell')
                                    )}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody