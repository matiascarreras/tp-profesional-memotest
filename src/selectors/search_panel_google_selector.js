import { createSelector } from 'reselect'

const getMemotestData = (state) => state.memotest

let defaultData = {
  googleSearchShowMore: false,
  googleNoResult: false,
  googleImages: []
}

const searchPanelGoogleSelector = createSelector(
  [ getMemotestData ],
  (memotestData) => {
    console.log(memotestData)

    let googleSearchData = {}
    if (!(Object.keys(memotestData.googleFiles).length === 0 && memotestData.googleFiles.constructor === Object)){
      if (memotestData.googleFiles.data.length > 0){
        googleSearchData.googleNoResult = false
        googleSearchData.googleSearchShowMore = memotestData.googleFiles.showMore
        let googleImagesArray = []
        memotestData.googleFiles.data.forEach(function(file){
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
    } else {
      googleSearchData = defaultData
    }
    
    console.log(googleSearchData)


    return {
      googleSearchData: googleSearchData,
      googleImagesResults: memotestData.googleImagesResults,
      googleImagesLoading: memotestData.googleImagesLoading
    }
  }
)

export default searchPanelGoogleSelector