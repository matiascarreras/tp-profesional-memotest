import React, { Component } from 'react';
import './searchPanelGoogle.css';

class SearchPanelGoogle extends Component {

    constructor(props) {  
        super(props);  
              
        this.state = {  
            googleSearchText : "",
            googleImagesArray:[],
        };                
    }

    handleOnChange(event){
        this.setState({googleSearchText : event.target.value});  
        if(event.target.value === ""){
            event.target.placeholder = "Search with Google SafeSearch"
        }
    }

    handleOnFocus(event){
        event.target.placeholder = ""
    }

    handleOnBlur(event){
        if(event.target.value === ""){
            event.target.placeholder = "Search with Google SafeSearch"
        }
    }

    makeGoogleSearch(search, page){
        fetch('http://ct.api.com/v1/ct/google_images?q='+search+'&page='+page, {
            method: 'get',
            headers: {
                'x-api-key':'7dabac64681a7c12c1cb97183c44de93',
                'JWT': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDVCIsImV4cCI6MzYzOTk0NTE2OCwiYXVkIjoiN2RhYmFjNjQ2ODFhN2MxMmMxY2I5NzE4M2M0NGRlOTMiLCJyZWZyZXNoIjoyMTQ3NDgzNjQ3LCJ1aWQiOiIiLCJpYXQiOjE0OTI0NjE1MjEsImlkIjoxNTQ5NSwiZW52IjoiaHR0cDpcL1wvMTg0LmN0LnBzZi1pdC5jb20uYXJcLyJ9.iWFf3TzR7uy3iG9bsZVHAjQ5mcQr8XVIsJrZqE0-Ja0',
            }
        })
        .then( (response) => {
            return response.json()    
        })
        .then( (json) => {
            console.log('parsed json', json.payload.images)
            for (var i = 0; i < json.payload.images.data.length; i++) {
                let thumbnailLink = json.payload.images.data[i].image.thumbnailLink
                this.state.googleImagesArray.push(
                    <div class="search-image ui-draggable" draggable="true">
                        <img src={thumbnailLink} alt=""/>
                    </div>
                )
            }
            //@todo: psf: remove this error log from searchPanelGoogle.jsx
            console.log(this.state.googleImagesArray);
            
        })
        .catch( (ex) => {
            console.log('parsing failed', ex)
        })
    }

    render() {
        return (
            <div id="search-panel-google" className={(this.props.hide)?'hide':''}>
                <span id="google-search-input_parent">
                    <input type="text" placeholder="Search with Google SafeSearch" onFocus={this.handleOnFocus.bind(this)} onBlur={this.handleOnBlur.bind(this)} value={this.state.googleSearchText} onChange={this.handleOnChange.bind(this)} id="google-search-input"/>
                    <div className="validateTextbox"></div>
                </span>
                <input type="button" id="google-search-btn" onClick={this.makeGoogleSearch.bind(this, this.state.googleSearchText, 1)}/>
                <div id="google-images-loading">
                    <img src="../../images/searchPanelGoogle/google_loading.gif" alt=""/>
                </div>
                <div id="google-search-content">
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
                <div className="googleImagesResults">
                    <h2>We're sorry!</h2>
                    <p>Too many awesome teachers are using this feature right now. Please try again later.</p>
                </div>
                <div className="googleNoResult">No results match your criteria</div>
                <span id="google-search-show-more" className="google-search-show-more hide">
                    <div className="poweredBy">Powered by Google</div>
                    <div className="spanLink hide"> - </div>
                    <a onClick="" className="spanLink hide">Show more</a>
                </span>
            </div>
        );
    }
}

export default SearchPanelGoogle;
