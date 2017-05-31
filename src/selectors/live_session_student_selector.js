import { createSelector } from 'reselect'

const getMemotestData = (state) => state.memotest

const liveSessionStudentSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
   	
    return {
      gridSize: memotestData.gridSize,
      pieces: memotestData.pieces,
      triviaQuestionText: "messi",
      triviaQuestionCorrectAnswer: 2,
      selectedPieces: memotestData.selectedPieces,
      matches: memotestData.matches,
    }
  }
)

export default liveSessionStudentSelector