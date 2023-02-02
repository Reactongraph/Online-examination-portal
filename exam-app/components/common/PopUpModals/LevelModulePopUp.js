import React from 'react'
import { Label } from '../micro/label'
import { ButtonComponent } from '../micro/buttonComponent'
import { Form } from '../micro/form'
import { InputComponent } from '../micro/inputComponent'
import { Banner } from '../micro/banner'
function LevelModulePopup(props) {
	const {
		checkWithDatabase,
		handleSubmit,
		buttonText,
		stateName,
		setStateName,
		modalName,
		placeholderText,
		isViewOnly,
	} = props
	return (
		<>
			<div className='flex-row space-y-3 relative p-10'>
				<div className='multi-column-spacing'>
					<Banner
						heading={`${buttonText} ${modalName}`}
						subHeading={'Easy to understand'}
						additionalClassName='BannerHeader'
					/>
				</div>
				<div className='card-container'>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div class='flex-grid-wrap'>
								<div class='form-field-md-width-half mb-6 md:mb-0'>
									<Label key={'grid-first-name'}>Enter {modalName}</Label>
									<InputComponent
										onChange={(e) => setStateName(e.target.value)}
										id='grid-first-name'
										className={'form-input'}
										type={'text'}
										placeholder={placeholderText}
										required={'required'}
										value={stateName}
										disabled={isViewOnly}
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

export default LevelModulePopup
