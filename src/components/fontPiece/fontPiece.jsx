import React, { Component } from 'react';
import '../../fonts/fonts.css';
import './fontPiece.css';

class FontPiece extends Component {

	onDragStart(event) {

	    var data = {
	      type: 'text',
	      textStyle: this.props.id,
	      src: ''
		}

		event.dataTransfer.setData('text', JSON.stringify(data)); 
	}

	render() {
		return (
	    	<div id={this.props.id} onDragStart={this.onDragStart.bind(this)} className="search-font ui-draggable" draggable="true" data-font-id={this.props.fontId}>
	    		<span>Aa</span>
	    	</div>
	    );
	}
}

export default FontPiece;
