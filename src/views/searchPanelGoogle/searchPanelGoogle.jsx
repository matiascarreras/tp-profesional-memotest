import React, { Component } from 'react';
import { connect } from 'react-redux'

import './searchPanelGoogle.css';
import classnames from 'classnames'
import loading from '../../assets/searchPanelGoogle/google_loading.gif'
import searchPanelGoogleSelector from '../../selectors/search_panel_google_selector'
import memotestActions from '../../actions/memotestActions'
import bindActionsToDispatch from '../../helpers/bindActionsToDispatch'

class SearchPanelGoogle extends Component {

    constructor(props) {  
        super(props);  
              
        this.state = {  
            googleSearchText : "",
            googleSearchPage: 1
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

    handleKeyPress(target){
        if(target.charCode === 13){
            if(this.state.googleSearchText !== ""){
                this.setState({googleSearchPage : 1});
                this.props.actions.makeGoogleSearch(this.state.googleSearchText, this.state.googleSearchPage)
            }
        }
    }

    handleOnClick(){
        if(this.state.googleSearchText !== ""){
            this.setState({googleSearchPage : 1});
            this.props.actions.makeGoogleSearch(this.state.googleSearchText, this.state.googleSearchPage)
        }

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

    handleGoogleSearchShowMoreClick(search, page){
        this.setState({googleSearchPage : page + 1});
        this.props.actions.makeGoogleSearch(search, page+1)
    }

    googleSearchContentElements(files){
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

        var googleImagesResultsClass = classnames({
            'googleImagesResults': true,
            'hide': !this.props.googleImagesResults,
        });

        var googleNoResultClass = classnames({
            'googleNoResult': true,
            'hide': !this.props.googleSearchData.googleNoResult,
        });

        var googleSearchShowMoreClass = classnames({
            'google-search-show-more': true,
            'hide': !this.props.googleSearchData.googleSearchShowMore,
        });

        var googleImagesLoadingClass = classnames({
            'google-images-loading': true,
            'hide': !this.props.googleImagesLoading,
        });


        return (
            <div id="search-panel-google" className={(this.props.hide)?'hide':''}>
                <span id="google-search-input_parent">
                    <input type="text" placeholder="Search with Google SafeSearch" onFocus={this.handleOnFocus.bind(this)} onBlur={this.handleOnBlur.bind(this)} value={this.state.googleSearchText} onChange={this.handleOnChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} id="google-search-input"/>
                    <div className="validateTextbox"></div>
                </span>
                <input type="button" id="google-search-btn" onClick={this.handleOnClick.bind(this)}/>
                <div className={googleImagesLoadingClass}>
                    <img src={loading} alt=""/>
                </div>
                <div id="google-search-content">
                    {this.googleSearchContentElements(this.props.googleSearchData.googleImages)}
                </div>
                <div className={googleImagesResultsClass}>
                    <h2>We're sorry!</h2>
                    <p>Too many awesome teachers are using this feature right now. Please try again later.</p>
                </div>
                <div className={googleNoResultClass}>No results match your criteria</div>
                <span id="google-search-show-more" className={googleSearchShowMoreClass}>
                    <div className="poweredBy">Powered by Google</div>
                    <div className="spanLink hide"> - </div>
                    <a onClick={this.handleGoogleSearchShowMoreClick.bind(this, this.state.googleSearchText, this.state.googleSearchPage)} className="spanLink hide">Show more</a>
                </span>
            </div>
        );
    }
}

function mapStateToProps(state){
  return searchPanelGoogleSelector(state);
}

function mapDispatchToProps(dispatch){
    return bindActionsToDispatch({
        makeGoogleSearch: memotestActions.makeGoogleSearch,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanelGoogle);
