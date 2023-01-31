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
						additionalClassName={'my-4 ml-3'}
					/>
				</div>
				<div className='flex-auto  items-center p-8 bg-white shadow rounded-lg'>
					<Form onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
						<React.Fragment>
							<div class='flex flex-wrap -mx-3 mb-6'>
								<div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-first-name'}>Enter {modalName}</Label>
									<InputComponent
										onChange={(e) => setStateName(e.target.value)}
										id='grid-first-name'
										className={
											'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
										}
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
									className={'btn-secondary'}
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
