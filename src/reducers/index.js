import { combineReducers } from 'redux'
import gridSize from './gridSize'

const rootReducer = combineReducers({
  gridSize: gridSize
})

export default rootReducer