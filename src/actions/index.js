import * as types from '../constants/ActionTypes'

export function selectGridSize(gridSize) {
  return { 
  	type: types.SELECT_GRID_SIZE,
  	gridSize: gridSize
  }
}