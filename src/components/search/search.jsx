import React, { Component } from 'react';
import './search.css';
import IconButton from '../iconButton/iconButton'
import SearchMainImage from '../searchMainImage/searchMainImage'
import SearchMainText from '../searchMainText/searchMainText'

class Search extends Component {
	constructor(){
	  super()
	  this.state = {
	    showMainImage: true,
	    showMainText: false
	  }
	}

	openText(){
	  this.setState({showMainText:true, showMainImage:false})
	}

	openImage(){
	  this.setState({showMainText:false, showMainImage:true})
	}

	render() {
		let imageBtnOn = this.state.showMainImage ? 'on' : '';
		let textBtnOn = this.state.showMainText ? 'on' : '';
		let imageBtnClasses = `${imageBtnOn} button-icon image`;
		let textBtnClasses = `${textBtnOn} button-icon text`;

	    return (
	    	<div id="search" className={(this.props.hide)?'hide':''}>
	    		<IconButton text="Text Style" class={textBtnClasses} onClick={this.openText.bind(this)}/>
	    		<IconButton text="Images" class={imageBtnClasses} onClick={this.openImage.bind(this)}/>
	    	  	<SearchMainImage hide={!this.state.showMainImage}/>
	    	  	<SearchMainText hide={!this.state.showMainText}/>
	    	</div>
	    );
  	}
}

export default Search;
