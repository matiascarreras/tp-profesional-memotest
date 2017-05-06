import { combineReducers } from 'redux'
import memotestReducer from './memotestReducer'

const rootReducer = combineReducers({
	memotest: memotestReducer
})

export default rootReducer