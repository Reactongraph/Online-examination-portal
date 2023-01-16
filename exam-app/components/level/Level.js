import React from 'react'
// import { mutate } from 'swr'
import PageComponentTitle from '../common/PageComponentTitle'
import LevelTable from './LevelTable'

const Level = ({ level_data, mutate }) => {
	return (
		<main className='p-6 sm:p-10 space-y-6'>
			<div className='flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between'>
				<PageComponentTitle
					title='LEVEL'
					titleDescription='List of all levels'
					buttonTitle='ADD NEW LEVEL'
					editForm={false}
				/>
			</div>

			<section className='grid md:grid-cols-1 xl:grid-cols-1 gap-6'>
				<div className='flex-grow items-center p-8 bg-white shadow rounded-lg'>
					<LevelTable
						level_data={level_data}
						mutate={mutate}
					/>
					{/* <ModuleTable module_data={module_data} 
					mutate={mutate}/> */}
				</div>
			</section>
		</main>
	)
}

export default Level
