import PureModal from 'react-pure-modal'
import { default as ReactSelect } from 'react-select'
import QuizDatePicker from './QuizDatePicker'
import { components } from 'react-select'
function QuizPopUp(props) {
	const {
		name,
		setName,
		modal,
		setModal,
		selectedLevelId,
		setSelectedLevelId,
		selectedModules,
		setSelectedModules,
		handleSubmit,
		buttonText,
		checkWithDatabase,
		selectedStartDate,
		setSelectedStartDate,
		selectedBufferDate,
		setSelectedBufferDate,
		selectedEndDate,
		setSelectedEndDate,
		handleLevelTypeSelect,
		handleModuleTypeSelect,
		description,
		setDescription,
		moduleData,
		levelData,
	} = props
	const Option = (props) => {
		return (
			<div>
				<components.Option {...props}>
					<input
						type='checkbox'
						checked={props.isSelected}
						onChange={() => null}
					/>{' '}
					<label>{props.label}</label>
				</components.Option>
			</div>
		)
	}
	return (
		<>
			<PureModal
				isOpen={modal}
				width='800px'
				onClose={() => {
					setName('')
					setSelectedBufferDate('')
					setSelectedEndDate('')
					setSelectedStartDate('')
					setDescription('')
					setSelectedLevelId('')
					setModal(false)
					return true
				}}>
				<div className='flex-row space-y-3 relative'>
					<div className='bg-blue-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4'>
						<p>{buttonText} Quiz</p>
					</div>

					<div className='py-6 px-6 lg:px-8'>
						<form
							className='w-full max-w-lg'
							onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-first-name'>
										Quiz Name
									</label>
									<input
										className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										id='name'
										type='text'
										value={name}
										onChange={(e) => setName(e.target.value)}
										required='required'
										placeholder='Jane'
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-last-name'>
										Choose Quiz image
									</label>

									<div class='flex items-center justify-center'>
										<div
											className='datepicker bg-gray-200relative form-floating mb-3 xl:w-96'
											data-mdb-toggle-button='false'>
											<input
												className='block w-full text-sm appearance-none  bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												aria-describedby='file_input_help'
												accept='image/*'
												id='file_input'
												type='file'
											/>
											<p
												class='mt-1 text-sm text-gray-500 dark:text-gray-300'
												id='file_input_help'>
												SVG, PNG, JPG *.
											</p>
										</div>
									</div>
								</div>

								<div className='w-full md:w-1/2 px-3'>
									<QuizDatePicker
										timeTitle='Start Time'
										selectedDate={selectedStartDate}
										setSelectedDate={setSelectedStartDate}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<QuizDatePicker
										timeTitle='End Time'
										selectedDate={selectedEndDate}
										setSelectedDate={setSelectedEndDate}
									/>
								</div>
								<div className='w-96 my-3 md:w-1/2 px-3'>
									<QuizDatePicker
										timeTitle='Buffer Time (Access Time for Quiz)'
										selectedDate={selectedBufferDate}
										setSelectedDate={setSelectedBufferDate}
									/>
								</div>
							</div>

							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-last-name'>
										Question Level
									</label>
									<select
										id='default'
										value={selectedLevelId}
										onChange={(e) => {
											handleLevelTypeSelect(e)
										}}
										required
										className='bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'>
										<option
											value=''
											hidden>
											Select
										</option>
										{levelData &&
											levelData.map((response, i) => (
												<option
													key={i}
													value={response.id}>
													{response.level}
												</option>
											))}
									</select>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-last-name'>
										Choose Modules for Quiz
									</label>
									<ReactSelect
										options={moduleData}
										className='bg-gray-50 w-50 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
										isMulti
										closeMenuOnSelect={false}
										hideSelectedOptions={false}
										components={{
											Option,
										}}
										onChange={handleModuleTypeSelect}
										allowSelectAll={true}
										// value={optionSelected}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<label
										className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-password'>
										Description
									</label>
									<textarea
										className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										id='description'
										type='text'
										placeholder='A short description about quiz'
										required='required'
										value={description}
										onChange={(e) => setDescription(e.target.value)}></textarea>
									<p className='text-gray-600 text-xs italic'>
										Describe in Brief*
									</p>
								</div>
							</div>
							<button
								type='submit'
								className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								{buttonText}
							</button>
						</form>
					</div>
				</div>
			</PureModal>
		</>
	)
}

export default QuizPopUp
