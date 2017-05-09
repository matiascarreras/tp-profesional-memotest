import { createSelector } from 'reselect'

const getMemotestData = (state) => state.memotest

const searchPanelGoogleSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {

    let googleSearchData = {}
    if (memotestData.googleFiles.length > 0){
      googleSearchData.googleNoResult = false
      googleSearchData.googleSearchShowMore = memotestData.googleFiles.showMore
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
      googleSearchData.googleSearchShowMore = false
      googleSearchData.googleImages = []
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