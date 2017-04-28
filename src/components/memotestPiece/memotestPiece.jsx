import React, { Component } from 'react';
import './memotestPiece.css';
import classnames from 'classnames';

class MemotestPiece extends Component {

  render() {

  	let content = ""
  	if(this.props.type === "text"){
  		content = <textarea disabled={this.props.disabled} defaultValue={this.props.text}></textarea>
  	} else if(this.props.type === "image"){
  		content = <img src={this.props.src} alt=""/>
  	}

  	var memotestPieceClass = classnames(this.props.textStyle, {
  	    'text': this.props.type === "text",
  	    'image': this.props.type === "image",
  	    'empty': this.props.type === "empty",
  	    'memotest-piece ui-droppable': true,
        'selected': this.props.id === this.props.correctAnswer,
  	});

    return (
        <div className={memotestPieceClass} id={this.props.id} onClick={this.props.onClick}>
        	{content}
        </div>
    );
  }
}

export default MemotestPiece;
