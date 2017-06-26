import * as types from '../constants/actionTypes'

let reportsActions = {

  getStudentResponses: function(jwt) {
    return { 
        type: types.GET_STUDENT_RESPONSES,
        jwt: jwt
    }
  },

}

export default reportsActions