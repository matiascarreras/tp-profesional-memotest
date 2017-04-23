import React, { Component } from 'react';
import './searchPanelLocal.css';
import UploaderButton from '../../components/uploaderButton/uploaderButton'
import localIconButton from '../../assets/uploaderButton/localBtn.svg'
import localIconButtonHover from '../../assets/uploaderButton/localBtn-hover.svg'
import dropboxIconButton from '../../assets/uploaderButton/dropboxIcon.svg'
import dropboxIconButtonHover from '../../assets/uploaderButton/dropboxIcon-hover.svg'
import boxIconButton from '../../assets/uploaderButton/boxIcon.svg'
import boxIconButtonHover from '../../assets/uploaderButton/boxIcon-hover.svg'
import oneDriveIconButton from '../../assets/uploaderButton/onedriveIcon.svg'
import oneDriveIconButtonHover from '../../assets/uploaderButton/onedriveIcon-hover.png'
import gdriveIconButton from '../../assets/uploaderButton/driveIcon.svg'
import gdriveIconButtonHover from '../../assets/uploaderButton/driveIcon-hover.png'
import Dropzone from 'react-dropzone'
import GooglePicker from 'react-google-picker'
import DropboxChooser from 'react-dropbox-chooser'

class SearchPanelLocal extends Component {
  
    constructor(){
      super()
      this.state = {
        localIcon: localIconButton,
        dropboxIcon: dropboxIconButton,
        boxIcon: boxIconButton,
        oneDriveIcon: oneDriveIconButton,
        gdriveIcon: gdriveIconButton
      }
    }

    handleLocalUploadMouseOver() {
        this.setState({
          localIcon: localIconButtonHover
        });
    }

    handleLocalUploadMouseOut() {
        this.setState({
          localIcon: localIconButton
        });
    }

    handleDropboxUploadMouseOver() {
        this.setState({
          dropboxIcon: dropboxIconButtonHover
        });
    }

    handleDropboxUploadMouseOut() {
        this.setState({
          dropboxIcon: dropboxIconButton
        });
    }

    handleBoxUploadMouseOver() {
        this.setState({
          boxIcon: boxIconButtonHover
        });
    }

    handleBoxUploadMouseOut() {
        this.setState({
          boxIcon: boxIconButton
        });
    }

    handleOneDriveUploadMouseOver() {
        this.setState({
          oneDriveIcon: oneDriveIconButtonHover
        });
    }

    handleOneDriveUploadMouseOut() {
        this.setState({
          oneDriveIcon: oneDriveIconButton
        });
    }

    handleGdriveUploadMouseOver() {
        this.setState({
          gdriveIcon: gdriveIconButtonHover
        });
    }

    handleGdriveUploadMouseOut() {
        this.setState({
          gdriveIcon: gdriveIconButton
        });
    }

    onDrop(files) {
        console.log('Received files: ', files);
    }

    onOpenClick() {
        //this.refs.dropzone.open();
    }

    render() {

        const CLIENT_ID = '206339496672-eie1j7vvr0plioslt41l2qsddmdjloqj.apps.googleusercontent.com';
        const DEVELOPER_KEY = 'AIzaSyChPXI8ByCl68kcpy0zwjrfjEc_8mtwH_w';
        const SCOPE = ['https://www.googleapis.com/auth/drive.readonly'];
        const APP_KEY = '158dtt39zf0zj9k';

        return (
            <div id="search-panel-local" className={(this.props.hide)?'hide':''}>
                <span onMouseOver={this.handleLocalUploadMouseOver.bind(this)} onMouseOut={this.handleLocalUploadMouseOut.bind(this)} className="uploadFile">
                    <img src={this.state.localIcon} alt=""/>
                    <span id="browse-local-file">Browse my files</span>
                    <form id="uploadForm" action="" method="POST" encType="multipart/form-data">
                        <input id="local-search-input" name="local-search-input[]" accept="image/jpg, image/png, image/jpeg" type="file" multiple=""/>
                    </form>
                </span>
                <DropboxChooser 
                    appKey={APP_KEY}
                    success={files => console.log('chose:', files)}
                    cancel={() => console.log('closed')}
                    multiselect={true}
                    extensions={['.png', '.jpg', '.jpeg']} >
                    <UploaderButton onMouseOver={this.handleDropboxUploadMouseOver.bind(this)} onMouseOut={this.handleDropboxUploadMouseOut.bind(this)} icon={this.state.dropboxIcon} id="browse-dropbox-file" text="Dropbox" name="dropBoxFile"/>       
                </DropboxChooser>
                <UploaderButton onMouseOver={this.handleBoxUploadMouseOver.bind(this)} onMouseOut={this.handleBoxUploadMouseOut.bind(this)} icon={this.state.boxIcon} id="browse-box-file" text="Box" name="boxFile"/>
                <UploaderButton onMouseOver={this.handleOneDriveUploadMouseOver.bind(this)} onMouseOut={this.handleOneDriveUploadMouseOut.bind(this)} icon={this.state.oneDriveIcon} id="browse-onedrive-file" text="One Drive" name="oneDriveFile"/>
                <GooglePicker clientId={CLIENT_ID}
                              developerKey={DEVELOPER_KEY}
                              scope={SCOPE}
                              onChange={data => console.log('on change:', data)}
                              multiselect={true}
                              navHidden={true}
                              authImmediate={false}
                              mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
                              viewId={'DOCS'}>
                   <UploaderButton onMouseOver={this.handleGdriveUploadMouseOver.bind(this)} onMouseOut={this.handleGdriveUploadMouseOut.bind(this)} icon={this.state.gdriveIcon} id="browse-gdrive-file" text="Google Drive" name="googleDriveFile"/>
                </GooglePicker>
                <div id="local-search-content">
                    <div className="search-image ui-draggable" draggable="true">
                        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTX7gHwv1vmfrt__Yo3cx1vJmWoQsp0ev_hshA_h_4E4vnVrCNCqFHduQQp" alt=""/>
                    </div>
                    <div className="search-image ui-draggable" draggable="true">
                        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTX7gHwv1vmfrt__Yo3cx1vJmWoQsp0ev_hshA_h_4E4vnVrCNCqFHduQQp" alt=""/>
                    </div>
                    <div className="search-image ui-draggable" draggable="true">
                        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTX7gHwv1vmfrt__Yo3cx1vJmWoQsp0ev_hshA_h_4E4vnVrCNCqFHduQQp" alt=""/>
                    </div>
                </div>
                <Dropzone onDrop={this.onDrop.bind(this)}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <button type="button" onClick={this.onOpenClick}>
                    Open Dropzone
                </button>
            </div>
        );
    }
}

export default SearchPanelLocal;
