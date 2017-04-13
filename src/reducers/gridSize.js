import * as types from '../constants/ActionTypes'
import * as constants from '../constants/constants'

const initialState = {
	gridSize: constants.SMALL_GRID_SIZE,
}

const gridSize = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_GRID_SIZE:
    	let newState = {...state}
    	newState.gridSize = action.gridSize
      	return newState
    default:
      return state
  }
}

export default gridSize