import * as types from '../constants/actionTypes'
import * as constants from '../constants/constants'

const initialState = {
	gridSize: constants.SMALL_GRID_SIZE,
	isTriviaQuestionEnable: false,
	triviaQuestionText: "",
	triviaQuestionCorrectAnswer: "",
	pieces:[],
  googleFiles:[],
  uploaderFiles:[]
}

const arrayPieces = []
for (var i = 0; i < 24; i++) {
  arrayPieces[i] = {type:'empty',text:'',src:'',id:i,textStyle:''}
}
initialState.pieces = arrayPieces

const memotestReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case types.SELECT_GRID_SIZE:
    	newState.gridSize = action.gridSize
      	return newState
    case types.TOGGLE_TRIVIA_QUESTION:
    	newState.isTriviaQuestionEnable = !state.isTriviaQuestionEnable
      	return newState
    case types.SAVE_TRIVIA_QUESTION:
    	newState.triviaQuestionText = action.questionText
      	return newState
    case types.SAVE_TRIVIA_CORRECT_ANSWER:
      newState.triviaQuestionCorrectAnswer = action.correctAnswer
        return newState
    case types.SAVE_GOOGLE_IMAGES_FILES:
      newState.googleFiles = action.googleFiles
        return newState
    case types.SAVE_UPLOADERS_FILES:
      newState.uploaderFiles = action.uploaderFiles
        return newState
    default:
      return state
  }
}

export default memotestReducer