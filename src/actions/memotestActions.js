import * as types from '../constants/actionTypes'

let memotestActions = {

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