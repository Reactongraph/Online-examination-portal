import { GetModuleData } from '../../apis/modules'
import { ModuleContext } from './context'

export const ModuleContextProvider = ({ children }) => {
	const { data: module_data } = GetModuleData()

	return (
		<ModuleContext.Provider value={{ module_data }}>
			{children}
		</ModuleContext.Provider>
	)
}
