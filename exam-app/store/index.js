import { createStore, compose } from 'redux'
import rootReducer from './reducers'

const enhancers = compose(
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
)

const store = createStore(rootReducer, enhancers)
export default store
