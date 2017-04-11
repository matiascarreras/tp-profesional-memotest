import React, { Component } from 'react';
import './fontPiece.css';

class FontPiece extends Component {

  render() {
    return (
    	<div id={this.props.id} className="search-font ui-draggable" draggable="true" data-font-id={this.props.fontId}>
    		<span>Aa</span>
    	</div>
    );
  }
}

export default FontPiece;
