import { default as ReactSelect } from 'react-select'
import QuizDatePicker from './QuizDatePicker'
import QuizLevelSelect from './QuizLevelSelect'
import QuizImage from './QuizImage'
import Option from './QuizOption'
import { Form } from '../../micro/form'
import { ButtonComponent } from '../../micro/buttonComponent'
import { Label } from '../../micro/label'
import { TextArea } from '../../micro/textArea'
import React from 'react'
import { Banner } from '../../micro/banner'
import { InputComponent } from '../../micro/inputComponent'
function QuizPopUp(props) {
	const {
		name,
		setName,
		selectedLevelId,
		isViewOnly,
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
			<div className='flex-row space-y-3 relative p-10'>
				<div className='flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between'>
					<Banner
						heading={`${buttonText} Quiz`}
						subHeading={'Easy to understand'}
						additionalClassName={'my-4 ml-3'}
					/>
				</div>

				<div className='flex-auto  items-center p-8 bg-white shadow rounded-lg'>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div className='flex flex-wrap -mx-3 mb-6'>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-quiz-name'}> Quiz Name</Label>
									<InputComponent
										className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										id='name'
										type='text'
										value={name}
										disabled={isViewOnly}
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
										isViewOnly={isViewOnly}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<QuizDatePicker
										timeTitle='End Time'
										selectedDate={selectedEndDate}
										setSelectedDate={setSelectedEndDate}
										isViewOnly={isViewOnly}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<QuizDatePicker
										timeTitle='Buffer Time (Access Time for Quiz)'
										selectedDate={selectedBufferDate}
										setSelectedDate={setSelectedBufferDate}
										isViewOnly={isViewOnly}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									{/* <Label key={'grid-question-level'}>Question Level</Label> */}

									<QuizLevelSelect
										selectedLevelId={selectedLevelId}
										handleLevelTypeSelect={handleLevelTypeSelect}
										levelData={levelData}
										isViewOnly={isViewOnly}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3'>
									<Label
										key={'gird-module'}
										className={
											'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										}>
										{' '}
										Choose Modules for Quiz
									</Label>
									<ReactSelect
										options={moduleData}
										className='bg-gray-50 w-50 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block    dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500'
										isMulti
										closeMenuOnSelect={false}
										hideSelectedOptions={false}
										components={{
											Option,
										}}
										isDisabled={isViewOnly}
										onChange={handleModuleTypeSelect}
										allowSelectAll={true}
										value={optionModuleSelected}
									/>
								</div>
								<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-quiz-name'}> Organization Name </Label>
									<InputComponent
										className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										disabled
										id='jane'
										type='text'
										value={name}
										onChange={(e) => setName(e.target.value)}
										required='required'
										placeholder='Ongraph Tech'
									/>
								</div>
								<div className='w-full px-3'>
									<Label key={'grid-description'}> Description</Label>
									<TextArea
										id={'description'}
										type={'text'}
										disabled={isViewOnly}
										placeholder={'A short description about quiz'}
										required={'required'}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</div>
							</div>

							{!isViewOnly && (
								<div className='flex justify-end'>
									<ButtonComponent
										key={'submit'}
										className={
											'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
										}>
										{buttonText} QUIZ
									</ButtonComponent>
								</div>
							)}
						</React.Fragment>
					</Form>
				</div>
			</div>
		</>
	)
}

export default QuizPopUp
