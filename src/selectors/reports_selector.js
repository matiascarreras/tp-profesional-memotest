import { createSelector } from 'reselect'
import * as constants from '../constants/constants'

const getMemotestData = (state) => state.memotest

const reportsSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
   	
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