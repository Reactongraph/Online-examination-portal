import { GetLevelData } from '../../apis/levels'
import { LevelContext } from './context'

export const LevelProvider = ({ children }) => {
	const { data: level_data } = GetLevelData()
	return (
		<LevelContext.Provider value={{ level_data }}>
			{children}
		</LevelContext.Provider>
	)
}
