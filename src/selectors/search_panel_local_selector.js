import { createSelector } from 'reselect'

const getMemotestData = (state) => state.memotest

const searchPanelLocalSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
   	
    return {
      uploaderFiles: memotestData.uploaderFiles,
    }
  }
)

export default searchPanelLocalSelector