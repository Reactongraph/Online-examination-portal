function QuizImage() {
	return (
		<>
			<div className='w-full md:w-1/2 px-3'>
				<label
					className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
					for='grid-last-name'>
					Choose Quiz image
				</label>

				<div class='flex items-center justify-center'>
					<div
						className='datepicker bg-gray-200relative form-floating mb-3 xl:w-96'
						data-mdb-toggle-button='false'>
						<input
							className='block w-full text-sm appearance-none  bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
							aria-describedby='file_input_help'
							accept='image/*'
							id='file_input'
							type='file'
						/>
						<p
							class='mt-1 text-sm text-gray-500 dark:text-gray-300'
							id='file_input_help'>
							SVG, PNG, JPG *.
						</p>
					</div>
				</div>
			</div>
		</>
	)
}
export default QuizImage
