import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import GooglePicker from 'react-google-picker'
import DropboxChooser from 'react-dropbox-chooser'
import OneDriveAuth from 'onedrive-auth'
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
      this.setState({ showAlertMessage: true });
    }

    openLocalUploadFiles() {
        this.dropzone.open();
    }

    dropboxSuccessCallback(files){
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
    }

    googleDrivePickerOnChange(data){
        var token = window.gapi.auth.getToken().access_token;
        var _this = this
        if(data.action === "picked"){
            data.docs.forEach(function(file){
                _this.props.actions.getGoogleDriveDownloadLink(file.id, token)
            })
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

    // odauth calls our onAuthenticated method to give us the user's auth token.
    // in this demo app we just use this as the method to drive the page logic
    onAuthenticated(token, authWindow) {
      if (token) {
        /*ODAuth.removeLoginButton();
        (function($){
          // we extract the onedrive path from the url fragment and we
          // flank it with colons to use the api's path-based addressing scheme
          var path = "";
          var beforePath = "";
          var afterPath = "";
          if (window.location.hash) {
            path = window.location.hash.substr(1);
            beforePath =":";
            afterPath = ":";
          }
          var odurl = "https://api.onedrive.com/v1.0/drive/root" + beforePath + path + afterPath;
          // the expand and select parameters mean:
          //  "for the item i'm addressing, include its thumbnails and children,
          //   and for each of the children, include its thumbnails. for those
          //   thumbnails, return the 'large' and 'c200x150_Crop' sizes"
          // we also attach the access token as a query parameter to every request.
          // we could also pass it in through the 'Authorization: bearer' header,
          // but that would result in an extra CORS preflight request for every
          // unique path.
          var odquery = "?expand=thumbnails,children(expand=thumbnails(select=large,c200x150_Crop))&access_token=" + token;
          $.ajax({
            url: odurl + odquery,
            dataType: 'json',
            success: function(data) {
              if (data) {
                // clear out the old content
                $('#od-items').empty();
                $('#od-json').empty();
                // add the syntax-highlighted json response
                $("<pre>").html(syntaxHighlight(data)).appendTo("#od-json");
                // process the response data. if we get back children (data.children)
                // then render the tile view. otherwise, render the "one-up" view
                // for the item's individual data. we also look for children in
                // 'data.value' because if this app is ever configured to reqeust
                // '/children' directly instead of '/parent?expand=children', then
                // they'll be in an array called 'data'
                var children = data.children || data.value;
                if (children && children.length > 0) {
                  $.each(children, function(i,item) {
                    var tile = $("<div>").
                      attr("href", "#" + path + "/" + encodeURIComponent(item.name)).
                      addClass("item").
                      click(function() {
                        // when the page changes in response to a user click,
                        // we set loadedForHash to the new value and call
                        // odauth ourselves in user-click mode. this causes
                        // the catch-all hashchange event handler not to
                        // process the page again. see comment at the top.
                        loadedForHash = $(this).attr('href');
                        window.location = loadedForHash;
                        odauth(true);
                      }).
                      appendTo("#od-items");
                    // look for various facets on the items and style them accordingly
                    if (item.folder) {
                      tile.addClass("folder");
                    }
                    if (item.thumbnails && item.thumbnails.length > 0) {
                      $("<img>").
                        attr("src", item.thumbnails[0].c200x150_Crop.url).
                        appendTo(tile);
                    }
                    $("<div>").
                      addClass("nameplate").
                      text(item.name).
                      appendTo(tile);
                  });
                }
                else {
                  // 1-up view
                  var tile = $("<div>").
                    addClass("item").
                    addClass("oneup").
                    appendTo("#od-items");
                  var downloadUrl = data['@content.downloadUrl'];
                  if (downloadUrl) {
                    tile.click(function(){window.location = downloadUrl;});
                  }
                  if (data.folder) {
                    tile.addClass("folder");
                  }
                  if (data.thumbnails && data.thumbnails.length > 0) {
                    $("<img>").
                      attr("src", data.thumbnails[0].large.url).
                      appendTo(tile);
                  }
                }
              } else {
                $('#od-items').empty();
                $('<p>error.</p>').appendTo('#od-items');
                $('#od-json').empty();
              }
            }
          });
        })(jQuery);*/
      }
      else {
        alert("Error signing in");
      }
    }
    // start the whole thing off by calling odauth() in non-click mode.
    // if the user isn't logged in already, a sign-in link will appear
    // for them to click.
    odauth(ODAuth, wasClicked) {

        ODAuth.auth(this.onAuthenticated, wasClicked);
    }

    render() {

        var ODAuth = new OneDriveAuth({
          clientId: "000000004C16C833",
          scopes: "user.read files.read files.read.all sites.read.all",
          redirectUri: "http://localhost:3000/memotest"
        });

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
                <UploaderButton onClick={this.odauth.bind(this, ODAuth, true)} onMouseOver={this.handleOneDriveUploadMouseOver.bind(this)} onMouseOut={this.handleOneDriveUploadMouseOut.bind(this)} icon={this.state.oneDriveIcon} id="browse-onedrive-file" text={localize('upload_onedrive')} name="oneDriveFile"/>
                <GooglePicker clientId={CLIENT_ID}
                              developerKey={DEVELOPER_KEY}
                              scope={SCOPE}
                              onChange={data => this.googleDrivePickerOnChange(data)}
                              multiselect={true}
                              navHidden={true}
                              authImmediate={false}
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
