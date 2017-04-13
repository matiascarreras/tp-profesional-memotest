import React, { Component } from 'react';
import './searchPanelLocal.css';
import UploaderButton from '../uploaderButton/uploaderButton'

class SearchPanelLocal extends Component {

  render() {
    return (
        <div id="search-panel-local" className={(this.props.hide)?'hide':''}>
            <span className="uploadFile">
                <img alt=""/>
                <span id="browse-local-file">Browse my files</span>
                <form id="uploadForm" action="" method="POST" encType="multipart/form-data">
                    <input id="local-search-input" name="local-search-input[]" accept="image/jpg, image/png, image/jpeg" type="file" multiple=""/>
                </form>
            </span>
            <UploaderButton class="uploadFile dropbox" id="browse-dropbox-file" text="Dropbox" name="dropBoxFile"/>
            <UploaderButton class="uploadFile box" id="browse-box-file" text="Box" name="boxFile"/>
            <UploaderButton class="uploadFile onedrive" id="browse-onedrive-file" text="One Drive" name="oneDriveFile"/>
            <UploaderButton class="uploadFile gdrive" id="browse-gdrive-file" text="Google Drive" name="googleDriveFile"/>
            <div id="local-search-content"></div>
            <span id="google-search-show-more" className="google-search-show-more hide">
                <div className="poweredBy">Powered by Google</div>
                <div className="spanLink hide"> - </div>
                <a onClick="" className="spanLink hide">Show more</a>
            </span>
        </div>
    );
  }
}

export default SearchPanelLocal;
