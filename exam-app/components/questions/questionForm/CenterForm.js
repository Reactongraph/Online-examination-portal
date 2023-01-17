import { RiDeleteBinLine } from 'react-icons/ri'
import Image from 'next/image'
function CenterForm(props) {
	const {
		selectedImage,
		handleSelectedOption,
		setSelectedImage,
		question,
		setQuestion,
		inputFields,
		handleFormChange,
		addFields,
		optionType,
		requiredOptionField,
		removeFields,
	} = props
	return (
		<>
			<section className='flex md:grid-cols-1 xl:grid-cols-1 gap-6'>
				<div className='flex-auto  items-center p-8 bg-white shadow rounded-lg'>
					<div className='mr-6'>
						<div className='flex justify-center mt-8'>
							<div className='max-w-2xl rounded-lg shadow-xl bg-gray-50'>
								<div className='m-4'>
									{selectedImage ? (
										<>
											{' '}
											<label className='inline-block mb-2 text-gray-500'>
												Your Image
											</label>
											<div>
												<Image
													alt='not fount'
													width={'250px'}
													src={URL.createObjectURL(selectedImage)}
												/>
												<br />
												<button
													onClick={() => setSelectedImage(null)}
													className='w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl'>
													Remove
												</button>
											</div>
										</>
									) : (
										<>
											{' '}
											<label className='inline-block mb-2 text-gray-500'>
												Upload Question image
											</label>
											<div className='flex items-center justify-center w-full'>
												<label className='flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300'>
													<div className='flex flex-col items-center justify-center pt-7'>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															className='w-8 h-8 text-gray-400 group-hover:text-gray-600'
															fill='none'
															viewBox='0 0 24 24'
															stroke='currentColor'>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																strokeWidth='2'
																d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
															/>
														</svg>

														<br />

														<p className='pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600'>
															Attach a file
														</p>
													</div>
													<input
														type='file'
														accept='image/*'
														className='opacity-0'
														onChange={(event) => {
															setSelectedImage(event.target.files[0])
														}}
													/>
												</label>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
					<br />
					<br />

					<div className='mb-6'>
						<input
							type='text'
							id='default-input'
							value={question}
							required
							onChange={(e) => setQuestion(e.target.value)}
							placeholder='Type your question'
							className='bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						/>
					</div>

					{/* for options section  */}

					<div className='mb-6'>
						{inputFields.map((input, index) => {
							return (
								<div
									className='flex items-center'
									key={index}>
									<input
										type='text'
										id='default-input'
										className='bg-gray-50 border my-3 text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500'
										name='option'
										required
										value={input.option}
										onChange={(event) => handleFormChange(index, event)}
										placeholder={`Option ${String.fromCharCode(65 + index)}`}
									/>

									<input
										type={optionType == 'Multiple' ? 'checkbox' : 'radio'}
										className='mx-5'
										checked={input.correct}
										required={requiredOptionField}
										id={index}
										name='fav_language'
										onClick={(event) => handleSelectedOption(index, event)}
									/>
									<button onClick={() => removeFields(index)}>
										<RiDeleteBinLine />
									</button>

									<br />
								</div>
							)
						})}
						<button
							type='button'
							onClick={addFields}
							className='text-blue-400'>
							Add More...
						</button>
					</div>

					<div className='flex justify-end'>
						<button
							type='submit'
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
							Submit
						</button>
					</div>
				</div>
				{/* </form> */}
			</section>
		</>
	)
}
export default CenterForm
