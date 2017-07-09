import * as types from '../constants/actionTypes'

let liveSessionStudentActions = {

	saveMemotestPieceSelected: function(pieceId) {
		return { 
			type: types.SAVE_MEMOTEST_PIECE_SELECTED,
      pieceId: pieceId
		}
	},

  validateMatch: function(firstPieceId, secondPieceId) {
   	return { 
     		type: types.VALIDATE_MATCH
   	}
  },

  saveStudentResponse: function(responseText, response, jwt) {
    return { 
        type: types.SAVE_STUDENT_RESPONSE,
        responseText: responseText,
        response: response, 
        jwt: jwt
    }
  },

}

export default liveSessionStudentActions