import { default as ReactSelect } from 'react-select'
import QuizDatePicker from './quiz_date_picker'
import QuizImage from './quiz_image'
import Option from './quiz_option'
import { Form } from '../../micro/form'
import { ButtonComponent } from '../../micro/button'
import { Label } from '../../micro/label'
import { TextArea } from '../../micro/textarea'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Banner } from '../../micro/banner'
import { InputComponent } from '../../micro/input'
import { Controller, useForm } from 'react-hook-form'
import Dropdown from '../../micro/dropdown'
import { GetQuizDataWithId } from '../../../../apis/quizzes'
import { useRouter } from 'next/router'
import moment from 'moment'
import { LevelContext, ModuleContext } from '../../../../context/context'
function QuizModal(props) {
	const { isViewOnly, buttonText, checkWithDatabase } = props

	const router = useRouter()

	const { module_data: moduleData } = useContext(ModuleContext)
	const { level_data: levelData } = useContext(LevelContext)

	const [selectedStartDate, setSelectedStartDate] = useState(null)
	const [selectedEndDate, setSelectedEndDate] = useState(null)
	const [selectedBufferDate, setSelectedBufferDate] = useState(null)

	const quizDefaultValues = useMemo(
		() => ({
			quiz_name: '',
			start_date: '',
			end_date: '',
			buffer_time: '',
			module_id: [],
			description: '',
			level_id: '',
			Org_name: '',
		}),
		[]
	)

	const { handleSubmit, control, setValue } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: quizDefaultValues,
	})
	useEffect(() => {
		let quiz_id = router.query.id

		async function getQuizData() {
			const results = await GetQuizDataWithId(quiz_id)
			const { quiz: quizData } = results.data

			let seletedModuleDataArray = []

			quizData.buffer_time = moment(quizData.buffer_time).toDate()
			quizData.start_date = moment(quizData.start_date).toDate()
			quizData.end_date = moment(quizData.end_date).toDate()

			// to create an array of object of moduleData
			moduleData?.map((oneModule) => {
				quizData.module_id.map((selectedId) => {
					if (selectedId == oneModule.id) {
						seletedModuleDataArray.push(oneModule)
					}
				})
			})
			quizData.module_id = seletedModuleDataArray

			// quizData is being modified to set the appropriate values
			const keys = Object.keys(quizDefaultValues)
			keys.forEach((key) => {
				setValue(key, quizData[key], true)
			})
		}

		if (quiz_id) {
			getQuizData()
		}
	}, [router.query?.id, quizDefaultValues, moduleData, setValue])
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

									<Controller
										as={InputComponent}
										name={'quiz_name'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<InputComponent
												type='text'
												onChange={onChange}
												onBlur={onBlur}
												value={value}
												className={
													'appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												}
												placeholder='Jane'
												required='required'
												disabled={isViewOnly}
												id='name'
											/>
										)}
									/>
								</div>
								<QuizImage />
								<div className='form-field'>
									<Controller
										as={QuizDatePicker}
										name={'start_date'}
										control={control}
										render={({ field: { value, onChange, onBlur } }) => (
											<QuizDatePicker
												selectedDate={value || selectedStartDate}
												setSelectedDate={(date) => {
													setSelectedStartDate(date)
													onChange(date)
												}}
												onBlur={onBlur}
												isViewOnly={isViewOnly}
												timeTitle='Start Time'
											/>
										)}
									/>
								</div>
								<div className='form-field'>
									<Controller
										as={QuizDatePicker}
										name={'end_date'}
										control={control}
										render={({ field: { value, onChange, onBlur } }) => (
											<QuizDatePicker
												selectedDate={value || selectedEndDate}
												setSelectedDate={(date) => {
													setSelectedEndDate(date)
													onChange(date)
												}}
												onBlur={onBlur}
												isViewOnly={isViewOnly}
												timeTitle='End Time'
											/>
										)}
									/>
								</div>
								<div className='form-field'>
									<Controller
										as={QuizDatePicker}
										name={'buffer_time'}
										control={control}
										render={({ field: { value, onChange, onBlur } }) => (
											<QuizDatePicker
												selectedDate={value || selectedBufferDate}
												setSelectedDate={(date) => {
													setSelectedBufferDate(date)
													onChange(date)
												}}
												onBlur={onBlur}
												isViewOnly={isViewOnly}
												timeTitle='Buffer Time (Access Time for Quiz)'
											/>
										)}
									/>
								</div>
								<div className='form-field'>
									<Controller
										as={Dropdown}
										name={'level_id'}
										control={control}
										render={({ field: { onChange, value, onBlur } }) => (
											<Dropdown
												id='default'
												labelClassName={
													'mr-2 text-sm font-medium text-gray-900'
												}
												labelText={'Question Level '}
												key={'grid-level_id'}
												value={value}
												onBlur={onBlur}
												required={true}
												disabled={isViewOnly}
												className={'input-style'}
												label='Select '
												options={levelData}
												onChange={onChange}
											/>
										)}
									/>
								</div>
								<div className='form-field'>
									<Label key={'gird-module'}> Choose Modules for Quiz</Label>

									<Controller
										as={ReactSelect}
										name={'module_id'}
										control={control}
										render={({ field: { value, onChange, onBlur } }) => (
											<ReactSelect
												options={moduleData}
												className='quiz-module-data'
												isMulti
												closeMenuOnSelect={false}
												hideSelectedOptions={false}
												components={{
													Option,
												}}
												onBlur={onBlur}
												isDisabled={isViewOnly}
												onChange={onChange}
												allowSelectAll={true}
												value={value}
											/>
										)}
									/>
								</div>
								<div className='form-field mb-6 md:mb-0'>
									<Label key={'grid-quiz-name'}> Organization Name </Label>

									<Controller
										as={InputComponent}
										name={'Org_name'}
										control={control}
										render={({ field: { value, onChange, onBlur } }) => (
											<InputComponent
												className='input-field'
												disabled
												id='jane'
												onBlur={onBlur}
												onChange={onChange}
												type='text'
												value={value}
												required='required'
												placeholder='Ongraph Tech'
											/>
										)}
									/>
								</div>
								<div className='w-full px-3'>
									<Label key={'grid-description'}> Description</Label>

									<Controller
										as={TextArea}
										name={'description'}
										control={control}
										render={({ field: { value, onChange, onBlur } }) => (
											<TextArea
												id={'description'}
												type={'text'}
												disabled={isViewOnly}
												placeholder={'A short description about quiz'}
												required={'required'}
												value={value}
												onChange={onChange}
												onBlur={onBlur}
											/>
										)}
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
