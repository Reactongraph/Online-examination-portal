import PageComponentTitle from './page_component_title'

export const FrontPageComponent = ({
	title,
	titleDescription,
	buttonTitle,
	editForm,
	data,
	mutate,
	TableComponent,
	...OtherData
}) => {
	return (
		<main className='main-content'>
			<div className='multi-column-spacing'>
				<PageComponentTitle
					title={title}
					titleDescription={titleDescription}
					buttonTitle={buttonTitle}
					editForm={editForm}
					mutate={mutate}
					{...OtherData}
				/>
			</div>

			<section className='grid-section'>
				<div className='table-section'>
					<TableComponent
						data={data}
						mutate={mutate}
						{...OtherData}
					/>
				</div>
			</section>
		</main>
	)
}
