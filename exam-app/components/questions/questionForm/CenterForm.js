import { RiDeleteBinLine } from 'react-icons/ri'
import Image from 'next/image'
import { Label } from '../../common/micro/label'
import React from 'react'
import { ButtonComponent } from '../../common/micro/buttonComponent'
import { InputComponent } from '../../common/micro/inputComponent'
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
		isViewOnly,
	} = props
	return (
		<>
			<section className='flex md:grid-cols-1 xl:grid-cols-1 gap-6'>
				<div className='card-container'>
					<div className='mr-6'>
						<div className='flex justify-center mt-8'>
							<div className='max-w-2xl rounded-lg shadow-xl bg-gray-50'>
								<div className='m-4'>
									{selectedImage ? (
										<>
											{' '}
											<Label
												key={'default'}
												className={'inline-block mb-2 text-gray-500'}>
												Your Image
											</Label>
											<div>
												<Image
													alt='not fount'
													width={'250px'}
													src={URL.createObjectURL(selectedImage)}
												/>
												<br />

												<ButtonComponent
													onClick={() => setSelectedImage(null)}
													className={
														'w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl'
													}>
													Remove
												</ButtonComponent>
											</div>
										</>
									) : (
										<>
											{' '}
											<Label
												key={'default'}
												className={'inline-block mb-2 text-gray-500'}>
												Upload Question image
											</Label>
											<div className='flex items-center justify-center w-full'>
												<Label
													key={'default'}
													className={
														'flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300'
													}>
													<React.Fragment>
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
														<InputComponent
															type='file'
															accept='image/*'
															className='opacity-0'
															onChange={(event) => {
																setSelectedImage(event.target.files[0])
															}}
														/>
													</React.Fragment>
												</Label>
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
						<InputComponent
							type='text'
							id='default-input'
							value={question}
							disabled={isViewOnly}
							required
							onChange={(e) => setQuestion(e.target.value)}
							placeholder='Type your question'
							className='text-field-question'
						/>
					</div>

					{/* for options section  */}

					<div className='mb-6'>
						{inputFields.map((input, index) => {
							return (
								<div
									className='flex items-center'
									key={index}>
									<InputComponent
										type='text'
										id='default-input'
										className='text-field-question'
										name='option'
										required
										disabled={isViewOnly}
										value={input.option}
										onChange={(event) => handleFormChange(index, event)}
										placeholder={`Option ${String.fromCharCode(65 + index)}`}
									/>
									<InputComponent
										type={optionType == 'Multiple' ? 'checkbox' : 'radio'}
										className={'mx-5'}
										onClick={(event) => handleSelectedOption(index, event)}
										disabled={isViewOnly}
										checked={input.correct}
										required={requiredOptionField}
										placeholder='Jane'
										name='fav_language'
										id={index}
									/>

									{!isViewOnly && (
										<ButtonComponent
											className={'bg-gray-100'}
											onClick={() => removeFields(index)}>
											<RiDeleteBinLine />
										</ButtonComponent>
									)}

									<br />
								</div>
							)
						})}
						{!isViewOnly && (
							<ButtonComponent
								type='button'
								onClick={addFields}
								className={'text-blue-400'}>
								Add More...
							</ButtonComponent>
						)}
					</div>

					{!isViewOnly && (
						<div className='flex justify-end'>
							<ButtonComponent
								key={'submit'}
								className='btn-secondary'>
								Submit
							</ButtonComponent>
						</div>
					)}
				</div>
				{/* </form> */}
			</section>
		</>
	)
}
export default CenterForm
