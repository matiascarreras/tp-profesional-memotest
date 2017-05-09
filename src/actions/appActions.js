import * as types from '../constants/actionTypes'

let appActions = {
  selectGridSize: function(gridSize) {
    return { 
    	type: types.SELECT_GRID_SIZE,
    	gridSize: gridSize
    }
  },

  intializeMemotest: function() {
    return { 
      type: types.INITIALIZE_MEMOTEST,
    }
  },

  saveMemotestData: function() {
    return { 
      type: types.SAVE_MEMOTEST_DATA,
    }
  },

  showTrivia: function(show) {
    return { 
      type: types.SHOW_TRIVIA,
      show: show
    }
  },

}

export default appActions