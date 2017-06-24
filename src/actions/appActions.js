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

  saveUrlParams: function(presentationId, jwt) {
    return { 
      type: types.SAVE_URL_PARAMS,
      presentationId: presentationId,
      jwt: jwt
    }
  },

  updateMemotestData: function(presentationId, completed, title, data_all, data_teacher, jwt, slideId) {
    return { 
      type: types.UPDATE_MEMOTEST_DATA,
      presentationId: presentationId,
      completed: completed,
      title: title,
      data_all: data_all,
      data_teacher: data_teacher,
      jwt: jwt,
      slideId: slideId
    }
  },

}

export default appActions