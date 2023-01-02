const sampleData = [
	{
		questionData: 'What is 2+2?',
		question_typeData: 'MCQ',
		option_typeData: 'Single',
		option1Data: 'sum is 2',
		correct1Data: 'false',
		option2Data: 'sum is 4',
		correct2Data: 'true',
		option3Data: 'sum is 5',
		correct3Data: 'false',
		option4Data: 'sum is 6',
		correct4Data: 'false',
		option5Data: 'sum is 7',
		correct5Data: 'false',
		option6Data: 'sum is 8',
		correct6Data: 'false',
		question_timeData: '10 seconds',
		level_name: '6395bd17a6fb787286b7dc3a',
		module_name: '6395bd23a6fb787286b7dc3b',
		marksData: '1',
	},
]

const headers = [
	{
		label: 'question',
		key: 'questionData',
	},
	{
		label: 'question_type',
		key: 'question_typeData',
	},
	{
		label: 'option_type',
		key: 'option_typeData',
	},
	{
		label: 'option1',
		key: 'option1Data',
	},
	{
		label: 'correct1',
		key: 'correct1Data',
	},
	{
		label: 'option2',
		key: 'option2Data',
	},
	{
		label: 'correct2',
		key: 'correct2Data',
	},
	{
		label: 'option3',
		key: 'option3Data',
	},
	{
		label: 'correct3',
		key: 'correct3Data',
	},
	{
		label: 'option4',
		key: 'option4Data',
	},
	{
		label: 'correct4',
		key: 'correct4Data',
	},
	{
		label: 'option5',
		key: 'option5Data',
	},
	{
		label: 'correct5',
		key: 'correct5Data',
	},
	{
		label: 'option6',
		key: 'option6Data',
	},
	{
		label: 'correct6',
		key: 'correct6Data',
	},
	{
		label: 'question_time',
		key: 'question_timeData',
	},
	{
		label: 'level',
		key: 'level_name',
	},
	{
		label: 'module',
		key: 'module_name',
	},
	{
		label: 'marks',
		key: 'marksData',
	},
]

export const csvObject = {
	filename: 'sampleQuestions.csv',
	headers: headers,
	data: sampleData,
}
