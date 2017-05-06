import * as types from '../constants/actionTypes'
import * as constants from '../constants/constants'

const initialState = {
	gridSize: constants.SMALL_GRID_SIZE,
	isTriviaQuestionEnable: false,
	triviaQuestionText: "",
	triviaQuestionCorrectAnswer: "",
	pieces:[],
  googleFiles:{},
  uploaderFiles:[],
  googleImagesResults: false,
  googleImagesLoading: false,
}

const arrayPieces = []
for (var i = 0; i < 24; i++) {
  arrayPieces[i] = {type:constants.MEMOTEST_PIECE_TYPE_EMPTY,text:'',src:'',id:i,textStyle:''}
}
initialState.pieces = arrayPieces

function selectGridSize(state, action){
  let newState = {...state}
  newState.gridSize = action.gridSize
  return newState
}

function toggleTriviaQuestion(state){
  let newState = {...state}
  newState.isTriviaQuestionEnable = !state.isTriviaQuestionEnable
  return newState
}

function saveTriviaQuestion(state, action){
  let newState = {...state}
  newState.triviaQuestionText = action.questionText
  return newState
}

function saveTriviaCorrectAnswer(state, action){
  let newState = {...state}
  newState.triviaQuestionCorrectAnswer = action.correctAnswer
  return newState
}

function saveUploadersFiles(state, action){
  let newState = {...state}
  newState.uploaderFiles = action.uploaderFiles
  return newState
}

function saveMemotestPiece(state, action){
  let newState = {...state}
  newState.pieces[action.id].type = action.pieceType
  if(action.pieceType === constants.MEMOTEST_PIECE_TYPE_TEXT){
    newState.pieces[action.id].textStyle = action.textStyle      
  } else if(action.pieceType === constants.MEMOTEST_PIECE_TYPE_IMAGE){
    newState.pieces[action.id].src = action.src      
  }
  return newState
}

function makeGoogleSearchSuccess(state, action){
  let newState = {...state}
  newState.googleFiles = action.images
  newState.googleImagesLoading = false
  newState.googleImagesResults = false
  return newState
}

function makeGoogleSearchFailed(state, action){
  let newState = {...state}
  newState.googleImagesLoading = false
  newState.googleImagesResults = true
  return newState
}

const memotestReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_GRID_SIZE:
      return selectGridSize(state, action)
    case types.TOGGLE_TRIVIA_QUESTION:
      return toggleTriviaQuestion(state)
    case types.SAVE_TRIVIA_QUESTION:
      return saveTriviaQuestion(state, action)
    case types.SAVE_TRIVIA_CORRECT_ANSWER:
      return saveTriviaCorrectAnswer(state, action)
    case types.SAVE_UPLOADERS_FILES:
      return saveUploadersFiles(state, action)
    case types.SAVE_MEMOTEST_PIECE:
      return saveMemotestPiece(state, action)
    case types.MAKE_GOOGLE_SEARCH_SUCCESS:
      return makeGoogleSearchSuccess(state, action)
    case types.MAKE_GOOGLE_SEARCH_FAILED:
      return makeGoogleSearchFailed(state, action)
    default:
      return state
  }
}

export default memotestReducer