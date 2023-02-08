import { default as ReactSelect } from 'react-select'
import QuizDatePicker from './quiz_date_picker'
import QuizLevelSelect from './quiz_level_select'
import QuizImage from './quiz_image'
import Option from './quiz_option'
import { Form } from '../../micro/form'
import { ButtonComponent } from '../../micro/button'
import { Label } from '../../micro/label'
import { TextArea } from '../../micro/textarea'
import React from 'react'
import { Banner } from '../../micro/banner'
import { InputComponent } from '../../micro/input'
function QuizModal(props) {
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
				<div className='multi-column-spacing'>
					<Banner
						heading={`${buttonText} Quiz`}
						subHeading={'Easy to understand'}
						additionalClassName='banner-header'
					/>
				</div>

				<div className='card-container'>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div className='flex-grid-wrap'>
								<div className='form-field mb-6 md:mb-0'>
									<Label key={'grid-quiz-name'}> Quiz Name</Label>
									<InputComponent
										className='input-field'
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
								<div className='form-field'>
									<QuizDatePicker
										timeTitle='Start Time'
										selectedDate={selectedStartDate}
										setSelectedDate={setSelectedStartDate}
										isViewOnly={isViewOnly}
									/>
								</div>
								<div className='form-field'>
									<QuizDatePicker
										timeTitle='End Time'
										selectedDate={selectedEndDate}
										setSelectedDate={setSelectedEndDate}
										isViewOnly={isViewOnly}
									/>
								</div>
								<div className='form-field'>
									<QuizDatePicker
										timeTitle='Buffer Time (Access Time for Quiz)'
										selectedDate={selectedBufferDate}
										setSelectedDate={setSelectedBufferDate}
										isViewOnly={isViewOnly}
									/>
								</div>
								<div className='form-field'>
									<QuizLevelSelect
										selectedLevelId={selectedLevelId}
										handleLevelTypeSelect={handleLevelTypeSelect}
										levelData={levelData}
										isViewOnly={isViewOnly}
									/>
								</div>
								<div className='form-field'>
									<Label key={'gird-module'}> Choose Modules for Quiz</Label>
									<ReactSelect
										options={moduleData}
										className='quiz-module-data'
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
								<div className='form-field mb-6 md:mb-0'>
									<Label key={'grid-quiz-name'}> Organization Name </Label>
									<InputComponent
										className='input-field'
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
										className={'btn-secondary'}>
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

export default QuizModal
