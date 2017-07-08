import { createSelector } from 'reselect'
import * as constants from '../constants/constants'

const getMemotestData = (state) => state.memotest

const triviaSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
    
    let cantPieces = 0;
    if (memotestData.gridSize === constants.SMALL_GRID_SIZE) {
        cantPieces = 12;
    } else if (memotestData.gridSize === constants.MEDIUM_GRID_SIZE){
        cantPieces = 16;
    } else if (memotestData.gridSize === constants.LARGE_GRID_SIZE){
        cantPieces = 24;
    }

    return {
      gridSize: memotestData.gridSize,
      pieces: memotestData.pieces,
      isTriviaQuestionEnable: memotestData.isTriviaQuestionEnable,
      triviaQuestionCorrectAnswer: memotestData.triviaQuestionCorrectAnswer,
      triviaQuestionText: memotestData.triviaQuestionText,
      showTrivia: memotestData.showTrivia,
      cantPieces:cantPieces,
      presentationId: memotestData.presentationId,
      jwt: memotestData.jwt,
      slideId: memotestData.slideId,
      returnUrl: memotestData.returnUrl
    }
  }
)

export default triviaSelector