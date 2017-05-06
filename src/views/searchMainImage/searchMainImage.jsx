import React, { Component } from 'react';
import './searchMainImage.css';
import SearchPanelLocal from '../searchPanelLocal/searchPanelLocal'
import SearchPanelGoogle from '../searchPanelGoogle/searchPanelGoogle'
import { localize } from '../../helpers/translator'

class SearchMainImage extends Component {
	constructor(){
	  super()
	  this.state = {
	    showPanelGoogle: true,
	    showPanelLocal: false
	  }
	}

	openPanelGoogle(){
	  this.setState({showPanelGoogle:true, showPanelLocal:false})
	}

	openPanelLocal(){
	  this.setState({showPanelGoogle:false, showPanelLocal:true})
	}

	render() {

		let googleSearchBtnClass = this.state.showPanelGoogle ? 'on' : '';
		let localSearchBtnClass = this.state.showPanelLocal ? 'on' : '';

	    return (
	        <div id="search-main-image" className={(this.props.hide)?'hide':''}>
		        <ul id="search-options">
		        	<li id="google-search-option" className={googleSearchBtnClass} onClick={this.openPanelGoogle.bind(this)}>
		        		<a href="#">{localize('search_google_images')}</a>
		         	</li>
		         	<li id="local-search-option" className={localSearchBtnClass} onClick={this.openPanelLocal.bind(this)}>
		        		| <a href="#">{localize('search_other_images')}</a>
		         	</li>
		        </ul>  
		        <SearchPanelGoogle hide={!this.state.showPanelGoogle}/>
		        <SearchPanelLocal hide={!this.state.showPanelLocal}/>
	        </div>
	    );
	}
}

export default SearchMainImage;
