import PureModal from 'react-pure-modal'
import React, { useContext } from 'react'
import { Label } from '../micro/label'
import { ButtonComponent } from '../micro/buttonComponent'
import { Form } from '../micro/form'
import { InputComponent } from '../micro/inputComponent'
function LevelModulePopup(props) {
	const {
		setModal,
		modal,
		checkWithDatabase,
		handleSubmit,
		buttonText,
		stateName,
		setStateName,
		modalName,
		placeholderText,
	} = props

	return (
		<>
			<PureModal
				isOpen={modal}
				width='800px'
				onClose={() => {
					setStateName('')
					setModal(false)
				}}>
				<div className='flex-row space-y-3 relative'>
					<div className='bg-blue-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4'>
						<p>
							{buttonText} {modalName}
						</p>
					</div>

					<div class='py-6 px-6 lg:px-8'>
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
										/>
									</div>
								</div>

								<ButtonComponent key={'submit'}>{buttonText}</ButtonComponent>
							</React.Fragment>
						</Form>
					</div>

					{/* */}
				</div>
			</PureModal>
		</>
	)
}

export default LevelModulePopup
