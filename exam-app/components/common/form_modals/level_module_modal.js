import React, { useEffect } from 'react'
import { Label } from '../micro/label'
import { ButtonComponent } from '../micro/button'
import { Form } from '../micro/form'
import { InputComponent } from '../micro/input'
import { Banner } from '../micro/banner'
import { Controller, useForm } from 'react-hook-form'
import { GetModuleDataWithId } from '../../../apis/modules'
import { GetLevelDataWithId } from '../../../apis/levels'
function LevelModuleModal(props) {
	const {
		checkWithDatabase,
		buttonText,
		modalName,
		placeholderText,
		isViewOnly,
		ModelId,

	} = props

	const fieldName = modalName.toLowerCase()
	const modalDefaultValues = {
		[fieldName]: '',
	}
	const { handleSubmit, control, setValue } = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		defaultValues: modalDefaultValues,
	})

	// for checking if it is a edit request
	useEffect(() => {
		let modalById = ModelId

		async function getModalData() {
			const results =
				fieldName == 'level'
					? await GetLevelDataWithId(modalById)
					: await GetModuleDataWithId(modalById)

			const modalData = results.data[fieldName]

			setValue(fieldName, modalData, true)
		}

		if (modalById) {
			getModalData()
		}
	}, [ModelId, fieldName, setValue])

	return (
		<>
			<div className='flex-row space-y-3 relative p-10'>
				<div className='multi-column-spacing'>
					<Banner
						heading={`${buttonText} ${modalName}`}
						subHeading={'Easy to understand'}
						additionalClassName='banner-header'
					/>
				</div>
				<div className='card-container'>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div class='flex-grid-wrap'>
								<div class='form-field mb-6 md:mb-0'>
									<Label key={'grid-first-name'}>Enter {modalName}</Label>

									<Controller
										as={InputComponent}
										name={`${fieldName}`}
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
												placeholder={placeholderText}
												required='required'
												disabled={isViewOnly}
												id='grid-modal'
											/>
										)}
									/>
								</div>
							</div>
							{isViewOnly == false && (
								<ButtonComponent
									className='btn-secondary'
									key={'submit'}>
									{buttonText}
								</ButtonComponent>
							)}
						</React.Fragment>
					</Form>
				</div>
			</div>
		</>
	)
}

export default LevelModuleModal
