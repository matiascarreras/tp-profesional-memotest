import * as types from '../constants/actionTypes'

let appActions = {

  selectGridSize: function(gridSize) {
    return { 
    	type: types.SELECT_GRID_SIZE,
    	gridSize: gridSize,
    }
  },

  intializeMemotest: function(id, jwt, isStudent) {
    return { 
      type: types.INITIALIZE_MEMOTEST,
      id: id,
      jwt: jwt,
      isStudent: isStudent
    }
  },

  saveMemotestData: function(presentationId, completed, title, data_all, data_teacher, jwt, returnUrl) {
    return { 
      type: types.SAVE_MEMOTEST_DATA,
      presentationId: presentationId,
      completed: completed,
      title: title,
      data_all: data_all,
      data_teacher: data_teacher,
      jwt: jwt,
      returnUrl: returnUrl
    }
  },

  showTrivia: function(show) {
    return { 
      type: types.SHOW_TRIVIA,
      show: show
    }
  },

  saveUrlParams: function(presentationId, jwt, returnUrl) {
    return { 
      type: types.SAVE_URL_PARAMS,
      presentationId: presentationId,
      jwt: jwt,
      returnUrl: returnUrl
    }
  },

  updateMemotestData: function(presentationId, completed, title, data_all, data_teacher, jwt, slideId, returnUrl) {
    return { 
      type: types.UPDATE_MEMOTEST_DATA,
      presentationId: presentationId,
      completed: completed,
      title: title,
      data_all: data_all,
      data_teacher: data_teacher,
      jwt: jwt,
      slideId: slideId,
      returnUrl: returnUrl
    }
  },

}

export default appActions