import * as types from '../constants/actionTypes'

let reportsActions = {

  getStudentResponses: function(response) {
    return { 
        type: types.GET_STUDENT_RESPONSES,
        response: response
    }
  },

}

export default reportsActions