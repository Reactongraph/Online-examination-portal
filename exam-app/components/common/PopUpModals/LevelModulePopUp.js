import PureModal from 'react-pure-modal'
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
		module,
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
									<label
										class='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
										for='grid-first-name'>
										Enter {modalName}
										{/* value={stateName} */}
									</label>
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

							<button
								type='submit'
								class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								{buttonText}
							</button>
						</form>
					</div>

					{/* */}
				</div>
			</PureModal>
		</>
	)
}

export default LevelModulePopup
