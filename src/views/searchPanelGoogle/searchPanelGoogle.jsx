import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import './searchPanelGoogle.css';
import * as actions from '../../actions'
import classnames from 'classnames'
import loading from '../../assets/searchPanelGoogle/google_loading.gif'

class SearchPanelGoogle extends Component {

    constructor(props) {  
        super(props);  
              
        this.state = {  
            googleSearchText : "",
            googleNoResult: false,
            googleImagesResults: false,
            googleSearchShowMore: false,
            showLoading: false,
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
                this.setState({googleNoResult : false});
                this.setState({googleImagesResults : false});
                this.makeGoogleSearch(this.state.googleSearchText, this.state.googleSearchPage)
            }
        }
    }

    handleOnClick(){
        if(this.state.googleSearchText !== ""){
            this.setState({googleSearchPage : 1});
            this.setState({googleNoResult : false});
            this.setState({googleImagesResults : false});  
            this.makeGoogleSearch(this.state.googleSearchText, this.state.googleSearchPage)
        }

    }
    makeGoogleSearch(search, page){
        this.setState({showLoading : true});
        this.setState({googleSearchShowMore : false});
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
            if(json.payload.images.data.length > 0){
                let filesArray = []
                json.payload.images.data.forEach(function(file){
                    filesArray.push({
                        size: file.image.byteSize,
                        name: file.title,
                        link: file.image.thumbnailLink
                    })
                })
                this.props.memotestActions.saveGoogleImagesFiles(filesArray)
                if(json.payload.images.data.length < 10){
                    this.setState({googleSearchPage : this.state.googleSearchPage + 1});
                    this.makeGoogleSearch(this.state.googleSearchText, this.state.googleSearchPage)
                } else if(json.payload.images.showMore){
                    this.setState({googleSearchShowMore : true});
                    this.setState({googleSearchPage : this.state.googleSearchPage + 1});
                } else {
                    this.setState({googleSearchShowMore : false});
                }
                this.setState({showLoading : false});  
            } else {
                this.setState({googleNoResult : true});
                this.setState({showLoading : false});
            }
        })
        .catch( (ex) => {
            console.log('parsing failed', ex)
            this.setState({googleImagesResults : true});  
            this.setState({showLoading : false}); 
        })
    }

    googleSearchContentElements(files){
        let elements = []
        for (const key of Object.keys(files)) {
            elements.push(
                <div key={key} className="search-image ui-draggable" draggable="true">
                    <img src={files[key].link} alt=""/>
                </div>
            )
        }
        return elements
    }

    render() {

        var googleImagesResultsClass = classnames({
            'googleImagesResults': true,
            'hide': !this.state.googleImagesResults,
        });

        var googleNoResultClass = classnames({
            'googleNoResult': true,
            'hide': !this.state.googleNoResult,
        });

        var googleSearchShowMoreClass = classnames({
            'google-search-show-more': true,
            'hide': !this.state.googleSearchShowMore,
        });

        var googleImagesLoadingClass = classnames({
            'google-images-loading': true,
            'hide': !this.state.showLoading,
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
                    {this.googleSearchContentElements(this.props.memotest.googleFiles)}
                </div>
                <div className={googleImagesResultsClass}>
                    <h2>We're sorry!</h2>
                    <p>Too many awesome teachers are using this feature right now. Please try again later.</p>
                </div>
                <div className={googleNoResultClass}>No results match your criteria</div>
                <span id="google-search-show-more" className={googleSearchShowMoreClass}>
                    <div className="poweredBy">Powered by Google</div>
                    <div className="spanLink hide"> - </div>
                    <a onClick={this.makeGoogleSearch.bind(this, this.state.googleSearchText, this.state.googleSearchPage)} className="spanLink hide">Show more</a>
                </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanelGoogle);
