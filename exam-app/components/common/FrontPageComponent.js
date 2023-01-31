import PageComponentTitle from './PageComponentTitle'

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
		<main className='p-6 sm:p-10 space-y-6'>
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

			<section className='grid md:grid-cols-1 xl:grid-cols-1 gap-6'>
				<div className='flex-grow items-center p-8 bg-white shadow rounded-lg'>
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
