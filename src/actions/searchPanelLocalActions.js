import * as types from '../constants/actionTypes'

let searchPanelLocalActions = {

  saveUploadersFiles: function(files) {
    return { 
      type: types.SAVE_UPLOADERS_FILES,
      uploaderFiles: files
    }
  },

}

export default searchPanelLocalActions