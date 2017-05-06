import React, { Component } from 'react';
import './search.css';
import IconButton from '../../components/iconButton/iconButton'
import SearchMainImage from '../searchMainImage/searchMainImage'
import SearchMainText from '../searchMainText/searchMainText'
import textStyleIconButton from '../../assets/iconButton/btn-text.png'
import textStyleIconButtonOn from '../../assets/iconButton/btn-text-on.png'
import imageIconButton from '../../assets/iconButton/btn-imagen.png'
import imageIconButtonOn from '../../assets/iconButton/btn-imagen-on.png'
import { localize } from '../../helpers/translator'

class Search extends Component {
	constructor(){
	  super()
	  this.state = {
	    showMainImage: true,
	    showMainText: false,
	    imageIcon: imageIconButtonOn,
	    textStyleIcon: textStyleIconButton
	  }
	}

	showText(){
	  this.setState({
	  	showMainText:true,
	  	showMainImage:false,
	  	imageIcon: imageIconButton,
	  	textStyleIcon: textStyleIconButtonOn
	  })
	}

	showImage(){
	  this.setState({
	  	showMainText:false,
	  	showMainImage:true,
	  	imageIcon: imageIconButtonOn,
	  	textStyleIcon: textStyleIconButton
	  })
	}

	render() {
		var classNames = require('classnames');

		var imageBtnClass = classNames({
		    'button-icon': true,
		    'on': this.state.showMainImage,
		});

		var textBtnClass = classNames({
		   	'button-icon': true,
		   	'on': this.state.showMainText,
		});

	    return (
	    	<div id="search" className={(this.props.hide)?'hide':''}>
	    		<IconButton text={localize('search_icon_btn_text_style')} icon={this.state.textStyleIcon} class={textBtnClass} onClick={this.showText.bind(this)}/>
	    		<IconButton text={localize('search_icon_btn_images')} icon={this.state.imageIcon} class={imageBtnClass} onClick={this.showImage.bind(this)}/>
	    	  	<SearchMainImage hide={!this.state.showMainImage}/>
	    	  	<SearchMainText hide={!this.state.showMainText}/>
	    	</div>
	    );
  	}
}

export default Search;
