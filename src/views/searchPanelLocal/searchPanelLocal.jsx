import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import GooglePicker from 'react-google-picker'
import DropboxChooser from 'react-dropbox-chooser'
import classnames from 'classnames'
import superagentPromisePlugin from 'superagent-promise-plugin'
import http_agent from '../../sync/http_agent'

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
import closeImage from '../../assets/searchPanelLocal/np-close-popup.svg'
import './searchPanelLocal.css';
import searchPanelLocalActions from '../../actions/searchPanelLocalActions'
import searchPanelLocalSelector from '../../selectors/search_panel_local_selector'
import bindActionsToDispatch from '../../helpers/bindActionsToDispatch'
import { localize } from '../../helpers/translator'

class SearchPanelLocal extends Component {
  
    constructor(props){
      super(props)
      this.state = {
        localIcon: localIconButton,
        dropboxIcon: dropboxIconButton,
        boxIcon: boxIconButton,
        oneDriveIcon: oneDriveIconButton,
        gdriveIcon: gdriveIconButton,
        showAlertMessage: false
      }
    }

    handleLocalUploadMouseOver() {
        this.setState({ localIcon: localIconButtonHover });
    }

    handleLocalUploadMouseOut() {
        this.setState({ localIcon: localIconButton });
    }

    handleDropboxUploadMouseOver() {
        this.setState({ dropboxIcon: dropboxIconButtonHover });
    }

    handleDropboxUploadMouseOut() {
        this.setState({ dropboxIcon: dropboxIconButton });
    }

    handleBoxUploadMouseOver() {
        this.setState({ boxIcon: boxIconButtonHover });
    }

    handleBoxUploadMouseOut() {
        this.setState({ boxIcon: boxIconButton });
    }

    handleOneDriveUploadMouseOver() {
        this.setState({ oneDriveIcon: oneDriveIconButtonHover });
    }

    handleOneDriveUploadMouseOut() {
        this.setState({ oneDriveIcon: oneDriveIconButton });
    }

    handleGdriveUploadMouseOver() {
        this.setState({ gdriveIcon: gdriveIconButtonHover });
    }

    handleGdriveUploadMouseOut() {
        this.setState({ gdriveIcon: gdriveIconButton });
    }

    handleCloseBtnClick(){
      this.setState({ showAlertMessage: false });
    }

    handleGotItBtnClick(){
      this.setState({ showAlertMessage: false });
    }

    onDragStart(src, event) {
      if(event){
        var data = {
          type: 'image',
          src: src,
          textStyle: ''
        }

        event.dataTransfer.setData('text', JSON.stringify(data)); 
      }
    }

    onDropAccepted(files) {
        console.log('Received files: ', files);
        let filesArray = []
        files.forEach(function(file){
            filesArray.push({
                size: file.size,
                name: file.name,
                link: file.preview
            })
        })
        this.props.actions.saveUploadersFiles(filesArray)
    }

    onDropRejected(files) {
      console.log('drag rejected');
      this.setState({ showAlertMessage: true });
    }

    openLocalUploadFiles() {
        this.dropzone.open();
        console.log("local upload open");
    }

    dropboxSuccessCallback(files){
        //@todo: psf: remove this error log from searchPanelLocal.jsx
        console.log("dropbox files:", files);
        let filesArray = []
        files.forEach(function(file){
            filesArray.push({
                size: file.bytes,
                name: file.name,
                link: file.thumbnailLink
            })
        })
        this.props.actions.saveUploadersFiles(filesArray)
    }

    dropboxCancelCallback(){
        console.log('closed');
    }

    googleDrivePickerOnChange(data){
        //var token = window.gapi.auth.getToken().access_token;
        var token = 'ya29.GlxCBAgHG6G6At-kPxPTUnOXJK5_ypxysV3Hq7utdY3JCpS5Je5JOD0eEoKN8TJyaty_jBh7cDEzBGg58pQ9pG6iTRFPCuy5G2ZRj0H5qZSS6rgKx4e1J1v-h45KKg'
        if(data.action === "picked"){
            let filesArray = []
            data.docs.forEach(function(file){
                http_agent.get('https://www.googleapis.com/drive/v2/files/' + file.id + '?alt=media')
                .set('Authorization', 'Bearer ' + token)
                .send({})
                .withCredentials()
                .use(superagentPromisePlugin)
                .then(function(response) {
                    console.log('response', response)
                    console.log('response text', response.text)
                    let payload = JSON.parse(response.text)
                    console.log('response payload', payload)

                    /*filesArray.push({
                        size: file.sizeBytes,
                        name: file.name,
                        link: file.url
                    })*/
                })
                .catch( (ex) => {
                    console.log('parsing failed', ex)
                })
            })
            //this.props.actions.saveUploadersFiles(filesArray)
        }
    }

    localSearchContentElements(files){
        let elements = []
        var _this = this
        for (const key of Object.keys(files)) {
            elements.push(
                <div key={key} onDragStart={_this.onDragStart.bind(_this, files[key].link)} className="search-image ui-draggable" draggable="true">
                    <img src={files[key].link} alt=""/>
                </div>
            )
        }
        return elements
    }

    render() {

        var dropzoneClass = classnames({
          'drag-drop-zone': true,
          'hide': this.props.uploaderFiles.length > 0,
        });

        var opacityModalClass = classnames({
          'opacityModal': true,
          'hide': !this.state.showAlertMessage,
        });

        var alertMessageClass = classnames({
          'alert-message': true,
          'hide': !this.state.showAlertMessage,
        });

        var localSearchContentClass = classnames({
            'hide': this.props.uploaderFiles.length === 0,
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
                <UploaderButton onClick={this.openLocalUploadFiles.bind(this)} onMouseOver={this.handleLocalUploadMouseOver.bind(this)} onMouseOut={this.handleLocalUploadMouseOut.bind(this)} icon={this.state.localIcon} id="browse-local-file" text={localize('upload_local')} name="localFile"/>
                <DropboxChooser 
                    appKey={APP_KEY}
                    success={files => this.dropboxSuccessCallback(files)}
                    cancel={() => this.dropboxCancelCallback()}
                    multiselect={true}
                    extensions={['.png', '.jpg', '.jpeg']} >
                    <UploaderButton onMouseOver={this.handleDropboxUploadMouseOver.bind(this)} onMouseOut={this.handleDropboxUploadMouseOut.bind(this)} icon={this.state.dropboxIcon} id="browse-dropbox-file" text={localize('upload_dropbox')} name="dropBoxFile"/>       
                </DropboxChooser>
                <UploaderButton onMouseOver={this.handleBoxUploadMouseOver.bind(this)} onMouseOut={this.handleBoxUploadMouseOut.bind(this)} icon={this.state.boxIcon} id="browse-box-file" text={localize('upload_box')} name="boxFile"/>
                <UploaderButton onMouseOver={this.handleOneDriveUploadMouseOver.bind(this)} onMouseOut={this.handleOneDriveUploadMouseOut.bind(this)} icon={this.state.oneDriveIcon} id="browse-onedrive-file" text={localize('upload_onedrive')} name="oneDriveFile"/>
                <GooglePicker clientId={CLIENT_ID}
                              developerKey={DEVELOPER_KEY}
                              scope={SCOPE}
                              onChange={data => this.googleDrivePickerOnChange(data)}
                              multiselect={true}
                              navHidden={true}
                              authImmediate={true}
                              mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
                              viewId={'DOCS'}>
                   <UploaderButton onMouseOver={this.handleGdriveUploadMouseOver.bind(this)} onMouseOut={this.handleGdriveUploadMouseOut.bind(this)} icon={this.state.gdriveIcon} id="browse-gdrive-file" text={localize('upload_gdrive')} name="googleDriveFile"/>
                </GooglePicker>
                <div id="local-search-content" className={localSearchContentClass}>
                    {this.localSearchContentElements(this.props.uploaderFiles)}
                </div>
                <Dropzone 
                    ref={(node) => { this.dropzone = node; }}
                    className={dropzoneClass}
                    activeClassName="active"
                    rejectClassName="active"
                    disableClick={true}
                    accept={"image/png, image/jpeg"}
                    onDropAccepted={this.onDropAccepted.bind(this)}
                    onDropRejected={this.onDropRejected.bind(this)}>
                    <div>{localize('drag_and_drop')}</div>
                </Dropzone>
                <div id="opacityModal" className={opacityModalClass}/>
                <div className={alertMessageClass}>
                  <span id="alert-message-closeBtn" onClick={this.handleCloseBtnClick.bind(this)}>
                    <img alt="" src={closeImage} className="alert-message-closeBtn"/>
                  </span>
                  <div>
                    <span>{localize('invalid_file_type')}</span>
                  </div>
                  <div className="buttons">
                    <button type="button" className="btn-gotIt" onClick={this.handleGotItBtnClick.bind(this)} value={localize('btn_got_it')}>{localize('btn_got_it')}</button>
                  </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
  return searchPanelLocalSelector(state);
}

function mapDispatchToProps(dispatch){
    return bindActionsToDispatch({
        saveUploadersFiles: searchPanelLocalActions.saveUploadersFiles,
        getGoogleDriveDownloadLink: searchPanelLocalActions.getGoogleDriveDownloadLink
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanelLocal);
