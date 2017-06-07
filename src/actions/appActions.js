import * as types from '../constants/actionTypes'

let appActions = {
  selectGridSize: function(gridSize) {
    return { 
    	type: types.SELECT_GRID_SIZE,
    	gridSize: gridSize
    }
  },

  intializeMemotest: function(id, jwt) {
    return { 
      type: types.INITIALIZE_MEMOTEST,
      id: id,
      jwt: jwt
    }
  },

  saveMemotestData: function(presentationId, completed, title, data_all, data_teacher, jwt) {
    return { 
      type: types.SAVE_MEMOTEST_DATA,
      presentationId: presentationId,
      completed: completed,
      title: title,
      data_all: data_all,
      data_teacher: data_teacher,
      jwt: jwt
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