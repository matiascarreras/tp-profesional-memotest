import * as types from '../constants/actionTypes'

let searchPanelLocalActions = {

  saveUploadersFiles: function(files) {
    return { 
      type: types.SAVE_UPLOADERS_FILES,
      uploaderFiles: files
    }
  },

  getGoogleDriveDownloadLink: function(fileId, token) {
    return { 
      type: types.GET_GOOGLE_DRIVE_DOWNLOAD_LINK,
      fileId: fileId,
      token: token
    }
  },

}

export default searchPanelLocalActions