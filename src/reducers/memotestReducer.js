import * as types from '../constants/actionTypes'
import * as constants from '../constants/constants'

const initialState = {
	gridSize: constants.SMALL_GRID_SIZE,
	isTriviaQuestionEnable: false,
	triviaQuestionText: "",
	triviaQuestionCorrectAnswer: "",
	pieces: [],
  googleFiles: [],
  uploaderFiles: [],
  googleImagesResults: false,
  googleImagesLoading: false,
  googleSearchShowMore: false,
  isSearch: false,
  showTrivia: false,
  selectedPieces: [],
  matches: [],
  slideId: "",
  jwt: "",
  presentationId: "",
  returnUrl: "",
}

const arrayPieces = []
for (var i = 0; i < 24; i++) {
  arrayPieces[i] = {type:constants.MEMOTEST_PIECE_TYPE_EMPTY,text:'',src:'',id:i,textStyle:''}
}

initialState.pieces = arrayPieces

function selectGridSize(state, action){
  let newState = {...state}
  let newPieces = [...state.pieces]
  if (action.gridSize == constants.MEDIUM_GRID_SIZE && newPieces.length < 16){
   for (var i = 12; i < 16; i++) {
     newPieces[i] = {type:constants.MEMOTEST_PIECE_TYPE_EMPTY,text:'',src:'',id:i,textStyle:''}
    }
   } else if (action.gridSize == constants.LARGE_GRID_SIZE && newPieces.length < 24){
    for (var i = 24 - newPieces.length; i < 24; i++) {
      newPieces[i] = {type:constants.MEMOTEST_PIECE_TYPE_EMPTY,text:'',src:'',id:i,textStyle:''}
    }
  }
  newState.pieces = newPieces
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
  let files = action.uploaderFiles
  if(state.uploaderFiles.length  > 0){
    files = state.uploaderFiles.concat(action.uploaderFiles)
  }
  newState.uploaderFiles = files
  return newState
}

function saveMemotestPiece(state, action){
  let newState = {...state}
  let newPieces = [...state.pieces]
  let newPiece = {...state.pieces[action.id]}
  newPiece.type = action.pieceType
  if(action.pieceType === constants.MEMOTEST_PIECE_TYPE_TEXT){
    newPiece.textStyle = action.textStyle
    newPiece.text = action.text
  } else if(action.pieceType === constants.MEMOTEST_PIECE_TYPE_IMAGE){
    newPiece.src = action.src      
  }
  newPieces[action.id] = newPiece
  newState.pieces = newPieces
  return newState
}

function makeGoogleSearch(state, action){
  let newState = {...state}
  newState.googleImagesLoading = true
  if(action.page === 1){
    newState.googleFiles = []  
  }
  newState.googleSearchShowMore = false
  newState.isSearch = false
  return newState
}

function makeGoogleSearchSuccess(state, action){
  let newState = {...state}
  let images = action.images
  if(state.googleFiles.length > 0){
    images = state.googleFiles.concat(action.images)
  }
  newState.googleFiles = images
  newState.googleImagesLoading = false
  newState.googleImagesResults = false
  newState.googleSearchShowMore = action.showMore
  newState.isSearch = true
  return newState
}

function makeGoogleSearchFailed(state, action){
  let newState = {...state}
  newState.googleImagesLoading = false
  newState.googleImagesResults = true
  newState.googleSearchShowMore = false
  newState.isSearch = true
  return newState
}

function getMemotestDataSuccess(state, action){
  let newState = {...state}
  newState.gridSize = action.payload.custom_slide.data_all.gridSize
  newState.isTriviaQuestionEnable = action.payload.custom_slide.data_all.isTriviaQuestionEnable
  newState.triviaQuestionText = action.payload.custom_slide.data_all.triviaQuestionText
  newState.triviaQuestionCorrectAnswer = action.payload.custom_slide.data_all.triviaQuestionCorrectAnswer
  newState.pieces = action.payload.custom_slide.data_all.pieces
  return newState
}

function getMemotestDataFailed(state, action){
  let newState = {...state}
  return newState
}

function saveMemotestDataSuccess(state, action){
  let newState = {...state}
  newState.slideId = action.payload.custom_slide.id
  window.top.location.href = action.returnUrl
  return newState
}

function saveMemotestDataFailed(state, action){
  let newState = {...state}
  return newState
}

function showTrivia(state, action){
  let newState = {...state}
  newState.showTrivia = action.show
  return newState
}

function saveMemotestPieceSelected(state, action){
  let newState = {...state}
  newState.selectedPieces = state.selectedPieces.concat(action.pieceId)
  return newState
}

function validateMatch(state, action){
  let newState = {...state}
  let firstPieceId = state.selectedPieces[0]
  let secondPieceId = state.selectedPieces[1]
  let newMatches = state.matches
  if(firstPieceId != undefined && secondPieceId != undefined){
    if(Math.abs(firstPieceId - secondPieceId) === 1){
      if(firstPieceId % 2 === 1 && firstPieceId > secondPieceId ||
        secondPieceId % 2 === 1 && secondPieceId > firstPieceId){
        newMatches = newMatches.concat(firstPieceId)
        newMatches = newMatches.concat(secondPieceId)
      }
    }
    newState.selectedPieces = [] 
  }
  newState.matches = newMatches
  return newState
}

function saveUrlParams(state, action){
  let newState = {...state}
  newState.presentationId = parseInt(action.presentationId)
  newState.jwt = action.jwt
  newState.returnUrl = action.returnUrl
  return newState
}

function updateMemotestDataSuccess(state, action){
  let newState = {...state}
  newState.slideId = action.payload.custom_slide.id
  window.top.location.href = action.returnUrl
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
    case types.MAKE_GOOGLE_SEARCH:
      return makeGoogleSearch(state, action)
    case types.MAKE_GOOGLE_SEARCH_SUCCESS:
      return makeGoogleSearchSuccess(state, action)
    case types.MAKE_GOOGLE_SEARCH_FAILED:
      return makeGoogleSearchFailed(state, action)
    case types.GET_MEMOTEST_DATA_SUCCESS:
      return getMemotestDataSuccess(state, action)
    case types.GET_MEMOTEST_DATA_FAILED:
      return getMemotestDataFailed(state, action)
    case types.SAVE_MEMOTEST_DATA_SUCCESS:
      return saveMemotestDataSuccess(state, action)
    case types.SAVE_MEMOTEST_DATA_FAILED:
      return saveMemotestDataFailed(state, action)
    case types.SHOW_TRIVIA:
      return showTrivia(state, action)
    case types.SAVE_MEMOTEST_PIECE_SELECTED:
      return saveMemotestPieceSelected(state, action)
    case types.VALIDATE_MATCH:
      return validateMatch(state, action)
    case types.SAVE_URL_PARAMS:
      return saveUrlParams(state, action)
    case types.UPDATE_MEMOTEST_DATA_SUCCESS:
      return updateMemotestDataSuccess(state, action)
    default:
      return state
  }
}

export default memotestReducer