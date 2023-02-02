import { Label } from '../../micro/label'
import { InputComponent } from '../../micro/inputComponent'

function QuizImage() {
	return (
		<>
			<div className='form-field-md-width-half'>
				<Label key={'grid-last-name'}> Choose Quiz Image</Label>

				<div class='flex items-center justify-center'>
					<div
						className='datepicker bg-gray-200relative form-floating mb-3 w-full'
						data-mdb-toggle-button='false'>
						<InputComponent
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
