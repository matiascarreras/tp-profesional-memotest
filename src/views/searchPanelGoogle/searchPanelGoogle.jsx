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
            showLoading: false
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
            this.makeGoogleSearch(this.state.googleSearchText, 1)
        }
    }

    makeGoogleSearch(search, page){
        if(search !== ""){
            this.setState({showLoading : true});  
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
                    for (var i = 0; i < json.payload.images.data.length; i++) {
                        this.props.memotestActions.saveGoogleImagesFiles(json.payload.images.data)
                    }
                    //if show more
                    //this.setState({googleSearchShowMore : true});  
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
    }

    googleSearchContentElements(files){
        for (var i = 0; i < files.length; i++) {
            return(
                <div className="search-image ui-draggable" draggable="true">
                    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTX7gHwv1vmfrt__Yo3cx1vJmWoQsp0ev_hshA_h_4E4vnVrCNCqFHduQQp" alt=""/>
                </div>
            )
        }
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
                <input type="button" id="google-search-btn" onClick={this.makeGoogleSearch.bind(this, this.state.googleSearchText, 1)}/>
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
                    <a onClick={this.makeGoogleSearch.bind(this, this.state.googleSearchText, 2)} className="spanLink hide">Show more</a>
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
