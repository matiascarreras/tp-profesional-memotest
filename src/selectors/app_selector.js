import { createSelector } from 'reselect'

const getMemotestData = (state) => state.memotest

const appSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
   
    return {
      gridSize: memotestData.gridSize,
      pieces: memotestData.pieces,
      isTriviaQuestionEnable: memotestData.isTriviaQuestionEnable,
      showTrivia: memotestData.showTrivia,
      slideId: memotestData.slideId,
      jwt: memotestData.jwt,
      presentationId: memotestData.presentationId
    }
  }
)

export default appSelector