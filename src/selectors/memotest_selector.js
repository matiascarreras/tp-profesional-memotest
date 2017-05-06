import { createSelector } from 'reselect'

const getMemotestData = (state) => state.memotest

const memotestSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
   
    return {
      gridSize: memotestData.gridSize,
      pieces: memotestData.pieces,
      triviaQuestionEnable: memotestData.triviaQuestionEnable
    }
  }
)

export default memotestSelector