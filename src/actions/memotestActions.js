import * as types from '../constants/actionTypes'

let memotestActions = {
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

  saveTriviaQuestion: function(questionText) {
    return { 
    	type: types.SAVE_TRIVIA_QUESTION,
  	  questionText: questionText
    }
  },

  saveTriviaCorrectAnswer: function(correctAnswer) {
    return { 
      type: types.SAVE_TRIVIA_CORRECT_ANSWER,
      correctAnswer: correctAnswer
    }
  },

  saveGoogleImagesFiles: function(files) {
    return { 
      type: types.SAVE_GOOGLE_IMAGES_FILES,
      googleFiles: files
    }
  },

  saveUploadersFiles: function(files) {
    return { 
      type: types.SAVE_UPLOADERS_FILES,
      uploaderFiles: files
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

  makeGoogleSearch: function(search, page){
    return { 
      type: types.MAKE_GOOGLE_SEARCH,
      search: search,
      page: page,
    }
  },
}

export default memotestActions