import React, { Component } from 'react';
import './searchPanelGoogle.css';

class SearchPanelGoogle extends Component {

  render() {
    return (
        <div id="search-panel-google" className={(this.props.hide)?'hide':''}>
            <span id="google-search-input_parent">
                <label className="google-search-label">Search with Google SafeSearch</label>
                <input type="text" id="google-search-input"/>
                <div className="validateTextbox"></div>
            </span>
            <input type="button" id="google-search-btn"/>
            <div id="google-images-loading">
                <img src="../../images/searchPanelGoogle/google_loading.gif" alt=""/>
            </div>
            <div id="google-search-content" className="mCustomScrollbar _mCS_1"></div>
            <div className="googleImagesResults">
                <h2>We're sorry!</h2>
                <p>Too many awesome teachers are using this feature right now. Please try again later.</p>
            </div>
            <div className="googleNoResult">No results match your criteria</div>
        </div>
    );
  }
}

export default SearchPanelGoogle;
