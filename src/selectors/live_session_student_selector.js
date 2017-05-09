import { createSelector } from 'reselect'

const getMemotestData = (state) => state.memotest

const liveSessionStudentSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
   	
    return {
      gridSize: memotestData.gridSize,
      pieces: memotestData.pieces,
      triviaQuestionText: memotestData.triviaQuestionText,
      triviaQuestionCorrectAnswer: memotestData.triviaQuestionCorrectAnswer,
    }
  }
)

export default liveSessionStudentSelector