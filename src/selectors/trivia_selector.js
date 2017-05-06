import { createSelector } from 'reselect'

const getMemotestData = (state) => state.memotest

const triviaSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
   
    return {
      gridSize: memotestData.gridSize,
      pieces: memotestData.pieces,
      triviaQuestionCorrectAnswer: memotestData.triviaQuestionCorrectAnswer,
      triviaQuestionText: memotestData.triviaQuestionText
    }
  }
)

export default triviaSelector