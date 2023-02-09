export const ModuleColumns = [
	{
		Header: 'Module',
		accessor: 'modules',
		title: 'Module',
		dataIndex: 'modules',
		key: 'module',
		width: 400,
		className: 'text-white bg-gray-800 p-2 border-r-2 border-b-2',
		rowClassName: 'bg-black-ripon',
	},

	{
		Header: 'Status',
		accessor: 'status',
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		width: 400,
		className: 'text-white bg-gray-800 p-2 border-r-2 border-b-2',
	},
	{
		Header: 'Action',
		accessor: 'action',
		title: 'Action',
		dataIndex: 'action',
		key: 'operations',
		width: 250,
		className: 'text-white bg-gray-600 p-2 border-b-2',
	},
]
