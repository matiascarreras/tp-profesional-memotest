import { createSelector } from 'reselect'
import * as constants from '../constants/constants'

const getMemotestData = (state) => state.memotest

const reportsSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
   	
    if (memotestData.gridSize === constants.SMALL_GRID_SIZE) {
        memotestData.pieces.splice(12)
    } else if (memotestData.gridSize === constants.MEDIUM_GRID_SIZE){
        memotestData.pieces.splice(16)
    }

    return {
      gridSize: memotestData.gridSize,
      pieces: memotestData.pieces,
      isTriviaQuestionEnable: memotestData.isTriviaQuestionEnable,
      triviaQuestionText: memotestData.triviaQuestionText,
      triviaQuestionCorrectAnswer: memotestData.triviaQuestionCorrectAnswer,
    }
  }
)

export default reportsSelector