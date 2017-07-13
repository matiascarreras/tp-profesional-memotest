import { createSelector } from 'reselect'
import * as constants from '../constants/constants'

const getMemotestData = (state) => state.memotest

const liveSessionStudentSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
   	
    let cantPieces = 0
    if (memotestData.gridSize === constants.SMALL_GRID_SIZE) {
        memotestData.pieces.splice(12)
        cantPieces = 12
    } else if (memotestData.gridSize === constants.MEDIUM_GRID_SIZE){
        memotestData.pieces.splice(16)
        cantPieces = 16
    } else if (memotestData.gridSize === constants.LARGE_GRID_SIZE){
        cantPieces = 24
    }

    return {
      gridSize: memotestData.gridSize,
      pieces: memotestData.pieces,
      isTriviaQuestionEnable: memotestData.isTriviaQuestionEnable,
      triviaQuestionText: memotestData.triviaQuestionText,
      triviaQuestionCorrectAnswer: memotestData.triviaQuestionCorrectAnswer,
      selectedPieces: memotestData.selectedPieces,
      matches: memotestData.matches,
      cantPieces: cantPieces,
    }
  }
)

export default liveSessionStudentSelector