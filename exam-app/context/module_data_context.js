import { GetModuleData } from '../apis/modules'
import { ModuleContext } from './context'

export const ModuleProvider = ({ children }) => {
	const { data: module_data } = GetModuleData()

	const updatedModuleData = module_data?.map((item) => {
		return {
			...item,
			label: item.module,
			value: item.module,
		}
	})

	return (
		<ModuleContext.Provider value={{ module_data: updatedModuleData }}>
			{children}
		</ModuleContext.Provider>
	)
}
