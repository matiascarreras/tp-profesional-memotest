import * as types from '../constants/actionTypes'

export function selectGridSize(gridSize) {
  return { 
  	type: types.SELECT_GRID_SIZE,
  	gridSize: gridSize
  }
}

export function toggleTriviaQuestion() {
  return { 
  	type: types.TOGGLE_TRIVIA_QUESTION,
  }
}

export function saveTriviaQuestion(questionText) {
  return { 
  	type: types.SAVE_TRIVIA_QUESTION,
  	questionText: questionText
  }
}

export function saveTriviaCorrectAnswer(correctAnswer) {
  return { 
    type: types.SAVE_TRIVIA_CORRECT_ANSWER,
    correctAnswer: correctAnswer
  }
}

export function saveGoogleImagesFiles(files) {
  return { 
    type: types.SAVE_GOOGLE_IMAGES_FILES,
    googleFiles: files
  }
}

export function saveUploadersFiles(files) {
  return { 
    type: types.SAVE_UPLOADERS_FILES,
    uploaderFiles: files
  }
}

export function saveMemotestPiece(id, type, textStyle, src) {
  return { 
    type: types.SAVE_MEMOTEST_PIECE,
    id: id,
    pieceType: type,
    textStyle: textStyle,
    src: src
  }
}