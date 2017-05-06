import * as types from '../constants/actionTypes'

let searchPanelGoogleActions = {

  makeGoogleSearch: function(search, page){
    return { 
      type: types.MAKE_GOOGLE_SEARCH,
      search: search,
      page: page,
    }
  },
  
}

export default searchPanelGoogleActions