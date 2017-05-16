import { createSelector } from 'reselect'

const getMemotestData = (state) => state.memotest

const memotestSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
   	
    return {
      gridSize: memotestData.gridSize,
      pieces: memotestData.pieces,
      isTriviaQuestionEnable: memotestData.isTriviaQuestionEnable,
      triviaQuestionText: memotestData.triviaQuestionText,
      triviaQuestionCorrectAnswer: memotestData.triviaQuestionCorrectAnswer,
      showTrivia: memotestData.showTrivia
    }
  }
)

export default memotestSelector