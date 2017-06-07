import * as types from '../constants/actionTypes'

let searchPanelGoogleActions = {

  makeGoogleSearch: function(search, page, jwt){
    return { 
      type: types.MAKE_GOOGLE_SEARCH,
      search: search,
      page: page,
      jwt: jwt
    }
  },
  
}

export default searchPanelGoogleActions