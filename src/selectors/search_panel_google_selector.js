import { createSelector } from 'reselect'

const getMemotestData = (state) => state.memotest

let defaultData = {
  googleImages: [],
  googleNoResult: false
}

const searchPanelGoogleSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {

    let googleSearchData = {}
    if(memotestData.isSearch){
      if (memotestData.googleFiles.length > 0){
        googleSearchData.googleNoResult = false
        let googleImagesArray = []
        memotestData.googleFiles.forEach(function(file){
          googleImagesArray.push({
            size: file.image.byteSize,
            name: file.title,
            link: file.image.thumbnailLink
          })
        })
        googleSearchData.googleImages = googleImagesArray
      } else {
        googleSearchData.googleNoResult = true
        googleSearchData.googleImages = memotestData.googleFiles
      }
    } else {
      googleSearchData = defaultData
    }

    return {
      googleSearchData: googleSearchData,
      googleImagesResults: memotestData.googleImagesResults,
      googleImagesLoading: memotestData.googleImagesLoading,
      googleSearchShowMore: memotestData.googleSearchShowMore,
    }
  }
)

export default searchPanelGoogleSelector