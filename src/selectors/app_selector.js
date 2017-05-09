import { createSelector } from 'reselect'

const getMemotestData = (state) => state.memotest

const appSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
   
    return {
      gridSize: memotestData.gridSize,
      pieces: memotestData.pieces,
      isTriviaQuestionEnable: memotestData.isTriviaQuestionEnable,
      showTrivia: memotestData.showTrivia
    }
  }
)

export default appSelector