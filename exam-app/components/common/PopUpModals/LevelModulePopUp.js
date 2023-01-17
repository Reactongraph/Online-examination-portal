import PureModal from 'react-pure-modal'
import { Label } from '../micro/label'
import { Button } from '../micro/button'
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
		// module,
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
						<form
							class='w-full max-w-lg'
							onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
							<div class='flex flex-wrap -mx-3 mb-6'>
								<div class='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
									<Label key={'grid-first-name'}>Enter {modalName}</Label>

									<input
										class='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
										id='grid-first-name'
										type='text'
										value={stateName}
										onChange={(e) => setStateName(e.target.value)}
										placeholder={placeholderText}
									/>
								</div>
							</div>

							<Button key={'submit'}>{buttonText}</Button>
						</form>
					</div>

					{/* */}
				</div>
			</PureModal>
		</>
	)
}

export default LevelModulePopup
