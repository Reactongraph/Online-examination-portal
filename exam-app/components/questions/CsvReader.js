import { toast } from 'react-toastify'
import { UploadCsvQuestion } from '../../apis/questions'

const CsvReader = (cdata, user, mutate) => {
	let csvFile = cdata
	const reader = new FileReader()

	const processCSV = async (str, delim = ',') => {
		const headers = str.slice(0, str.indexOf('\n')).split(delim)

		const rows = str.slice(str.indexOf('\n') + 1).split('\n')

		const newArray = rows.map((row) => {
			const values = row.split(delim)
			const eachObject = headers.reduce((obj, header, i) => {
				obj[header] = values[i]
				return obj
			}, {})
			return eachObject
		})

		let newCSVDataArray = newArray.map((oneObject) => {
			let options = []
			let count = 0
			Object.entries(oneObject).forEach((entry) => {
				const [key, value] = entry
				if (key.includes('option') && !key.includes('option_type')) {
					let obj = {
						option: value,
						correct: oneObject[`correct${count + 1}`],
					}
					options.push(obj)
					count++
				}
				if (key.includes('\r')) {
					let newKey = key.replaceAll('\r', '')
					oneObject[newKey] = value
				}
			})
			oneObject['options'] = options
			oneObject['status'] = true
			return {
				question: oneObject.question,
				question_type: oneObject.question_type,
				options: oneObject.options,
				option_type: oneObject.option_type,
				level_id: oneObject.level,
				module_id: oneObject.module,
				question_time: oneObject.question_time,
				marks: oneObject.marks,
				status: oneObject.status,
			}
		})

		// to remove the last empty object that forms with csv file
		newCSVDataArray.pop()

		newCSVDataArray = JSON.stringify(newCSVDataArray)

		// call the bulk api for bulk insert

		UploadCsvQuestion(newCSVDataArray, user?.token)
			.then(() => {
				mutate()
				toast.success('CSV uploaded successfully!')
			})
			.catch(() => {
				toast.error('Problem while uploading CSV!')
			})
	}

	reader.onload = function (data) {
		const text = data.target.result
		processCSV(text)
	}
	reader.readAsText(csvFile)
	return 1
}

export { CsvReader }
