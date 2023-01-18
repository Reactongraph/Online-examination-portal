import PureModal from 'react-pure-modal'
import { default as ReactSelect } from 'react-select'
import QuizDatePicker from './QuizDatePicker'
import QuizLevelSelect from './QuizLevelSelect'
import QuizImage from './QuizImage'
import Option from './QuizOption'
import { ButtonComponent } from '../../micro/buttonComponent'
import { Label } from '../../micro/label'
import { TextArea } from '../../micro/textArea'
function QuizPopUp(props) {
	const {
		name,
		setName,
		modal,
		setModal,
		selectedLevelId,
		setSelectedLevelId,
		handleSubmit,
		buttonText,
		checkWithDatabase,
		selectedStartDate,
		setSelectedStartDate,
		selectedBufferDate,
		optionModuleSelected,
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
									<Label key={'grid-quiz-name'}> Quiz Name</Label>
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
								<QuizImage />
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
									<Label key={'grid-question-level'}>Question Level</Label>

									<QuizLevelSelect
										selectedLevelId={selectedLevelId}
										handleLevelTypeSelect={handleLevelTypeSelect}
										levelData={levelData}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label key={'gird-module'}> Choose Modules for Quiz</Label>
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
										value={optionModuleSelected}
									/>
								</div>
							</div>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full px-3'>
									<Label key={'grid-description'}> Description</Label>
									<TextArea
										id={'description'}
										type={'text'}
										placeholder={'A short description about quiz'}
										required={'required'}
										value={description}
										onChange={(e) => setDescription(e.target.value)}></TextArea>
									<p className='text-gray-600 text-xs italic'>
										Describe in Brief*
									</p>
								</div>
							</div>
							<ButtonComponent key={'submit'}> {buttonText}</ButtonComponent>
						</form>
					</div>
				</div>
			</PureModal>
		</>
	)
}

export default QuizPopUp
