import * as types from '../constants/actionTypes'

let appActions = {
  selectGridSize: function(gridSize) {
    return { 
    	type: types.SELECT_GRID_SIZE,
    	gridSize: gridSize
    }
  },

  toggleTriviaQuestion: function() {
    return { 
    	type: types.TOGGLE_TRIVIA_QUESTION,
    }
  },

}

export default appActions