export const columns = [
	{
		Header: 'Name',
		accessor: 'name',
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		width: 400,
		className: 'text-white bg-gray-800 p-2 border-r-2 border-b-2',
		rowClassName: 'bg-black-ripon',
	},
	{
		Header: 'Email',
		accessor: 'email',
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
		width: 400,
		className: 'text-white bg-gray-600 p-2 border-r-2 border-b-2',
	},
	{
		Header: 'Mobile',
		accessor: 'mobile',
		title: 'Mobile',
		dataIndex: 'mobile',
		key: 'mobile',
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
