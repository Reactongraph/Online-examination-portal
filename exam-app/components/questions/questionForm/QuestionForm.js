import React from 'react'
import { Form } from '../../common/micro/form'
import CenterForm from './CenterForm'
import { Banner } from '../../common/micro/banner'

function QuestionForm(props) {
	const {
		handleSubmit,
		checkWithDatabase,
		handleSelectedOption,
		pageTitle,
		selectedImage,
		setSelectedImage,
		removeFields,
		question,
		setQuestion,
		inputFields,
		handleFormChange,
		addFields,
		optionType,
		requiredOptionField,
		isViewOnly,
	} = props
	return (
		<>
			<Form
				className={'flex  sm:p-10 '}
				onSubmit={handleSubmit((data) => checkWithDatabase(data))}>
				<React.Fragment>
					<div className='flex-auto mx-7'>
						<div className='multi-column-spacing'>
							<Banner
								heading={`${pageTitle} Question`}
								subHeading={'Easy to understand'}
								additionalClassName={'my-4'}
							/>
						</div>

						<CenterForm
							selectedImage={selectedImage}
							removeFields={removeFields}
							handleSelectedOption={handleSelectedOption}
							setSelectedImage={setSelectedImage}
							question={question}
							setQuestion={setQuestion}
							inputFields={inputFields}
							handleFormChange={handleFormChange}
							addFields={addFields}
							optionType={optionType}
							requiredOptionField={requiredOptionField}
							isViewOnly={isViewOnly}
						/>
					</div>

					{/* corner side  */}
					<div className='flex-wrap items-center px-8 bg-dark '>
						{props.children}
					</div>
				</React.Fragment>
			</Form>
		</>
	)
}
export default QuestionForm
