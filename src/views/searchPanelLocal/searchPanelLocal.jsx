import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import Dropzone from 'react-dropzone'
import GooglePicker from 'react-google-picker'
import DropboxChooser from 'react-dropbox-chooser'
import classnames from 'classnames'

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
import './searchPanelLocal.css';
import * as actions from '../../actions'

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
        this.props.memotestActions.saveUploadersFiles(files)
    }

    onOpenClick() {
        this.dropzone.open();
        console.log("local upload open");
    }

    dropboxSuccessCallback(files){
        //@todo: psf: remove this error log from searchPanelLocal.jsx
        console.log("dropbox files:", files);
        this.props.memotestActions.saveUploadersFiles(files)
    }

    dropboxCancelCallback(){
        console.log('closed');
    }

    googleDrivePickerOnChange(data){
        console.log("gdrive files:", data);
        if(data.action === "picked"){
            this.props.memotestActions.saveUploadersFiles(data.docs)
        }
    }

    localSearchContentElements(files){
        for (var i = 0; i < files.length; i++) {
            return(
                <div className="search-image ui-draggable" draggable="true">
                    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTX7gHwv1vmfrt__Yo3cx1vJmWoQsp0ev_hshA_h_4E4vnVrCNCqFHduQQp" alt=""/>
                </div>
            )
        }
    }

    render() {

        var dropzoneClass = classnames({
            'drag-drop-zone': true,
            'hide': this.props.memotest.uploaderFiles.length > 0,
        });

        var localSearchContentClass = classnames({
            'hide': this.props.memotest.uploaderFiles.length === 0,
        });

        const CLIENT_ID = '843876855982-gr36gak7lm9pbitlcj4t5r7k6mosrrtc.apps.googleusercontent.com';
        const DEVELOPER_KEY = 'AIzaSyBxKfnBnJNs0WoCvUo6As5kYpIGhjS2r4E';
        //const SCOPE = ['https://www.googleapis.com/auth/drive.readonly'];
        const SCOPE = ['https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile'];
        const APP_KEY = '158dtt39zf0zj9k';

        return (
            <div id="search-panel-local" className={(this.props.hide)?'hide':''}>
                <UploaderButton onClick={this.onOpenClick.bind(this)} onMouseOver={this.handleLocalUploadMouseOver.bind(this)} onMouseOut={this.handleLocalUploadMouseOut.bind(this)} icon={this.state.localIcon} id="browse-local-file" text="Browse my files" name="localFile"/>
                <DropboxChooser 
                    appKey={APP_KEY}
                    success={files => this.dropboxSuccessCallback(files)}
                    cancel={() => this.dropboxCancelCallback()}
                    multiselect={true}
                    extensions={['.png', '.jpg', '.jpeg']} >
                    <UploaderButton onMouseOver={this.handleDropboxUploadMouseOver.bind(this)} onMouseOut={this.handleDropboxUploadMouseOut.bind(this)} icon={this.state.dropboxIcon} id="browse-dropbox-file" text="Dropbox" name="dropBoxFile"/>       
                </DropboxChooser>
                <UploaderButton onMouseOver={this.handleBoxUploadMouseOver.bind(this)} onMouseOut={this.handleBoxUploadMouseOut.bind(this)} icon={this.state.boxIcon} id="browse-box-file" text="Box" name="boxFile"/>
                <UploaderButton onMouseOver={this.handleOneDriveUploadMouseOver.bind(this)} onMouseOut={this.handleOneDriveUploadMouseOut.bind(this)} icon={this.state.oneDriveIcon} id="browse-onedrive-file" text="One Drive" name="oneDriveFile"/>
                <GooglePicker clientId={CLIENT_ID}
                              developerKey={DEVELOPER_KEY}
                              scope={SCOPE}
                              onChange={data => this.googleDrivePickerOnChange(data)}
                              multiselect={true}
                              navHidden={true}
                              authImmediate={false}
                              mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
                              viewId={'DOCS'}>
                   <UploaderButton onMouseOver={this.handleGdriveUploadMouseOver.bind(this)} onMouseOut={this.handleGdriveUploadMouseOut.bind(this)} icon={this.state.gdriveIcon} id="browse-gdrive-file" text="Google Drive" name="googleDriveFile"/>
                </GooglePicker>
                <div id="local-search-content" className={localSearchContentClass}>
                    {this.localSearchContentElements(this.props.memotest.uploaderFiles)}
                </div>
                <Dropzone 
                    ref={(node) => { this.dropzone = node; }}
                    className={dropzoneClass}
                    activeClassName="active"
                    rejectClassName="reject"
                    onDrop={this.onDrop.bind(this)}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
            </div>
        );
    }
}

function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return { 
    memotestActions: bindActionCreators(actions, dispatch),
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanelLocal);
