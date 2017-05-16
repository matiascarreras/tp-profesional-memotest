import * as types from '../constants/actionTypes'

let memotestActions = {

	toggleTriviaQuestion: function() {
		return { 
			type: types.TOGGLE_TRIVIA_QUESTION,
		}
	},

  saveMemotestPiece: function(id, type, textStyle, src) {
   	return { 
     		type: types.SAVE_MEMOTEST_PIECE,
     		id: id,
     		pieceType: type,
     		textStyle: textStyle,
     		src: src
   	}
  },

}

export default memotestActions