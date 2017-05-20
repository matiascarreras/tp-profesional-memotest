import React, { Component } from 'react';
import './memotestPiece.css';
import classnames from 'classnames';
import Textarea from 'react-textarea-autosize';

import * as constants from '../../constants/constants'

class MemotestPiece extends Component {

  constructor(props){
    super(props)
    this.state = {
      dragOver: false
    }
  }

  onDragOver(event) {
      this.setState({ dragOver: true });
      event.preventDefault();
  }

  onDragLeave(event) {
      this.setState({ dragOver: false });
      event.preventDefault();
  }

  onDrop(event) {
    
      this.setState({ dragOver: false });

      event.preventDefault();

      var data;
      try {
        data = JSON.parse(event.dataTransfer.getData('text'));
        this.props.handleOnDrop(this.props.id, data.type, data.textStyle, data.src)
      } catch (e) {
        // If the text data isn't parsable we'll just ignore it.
        return;
      }
  }

  render() {

  	let content = ""
  	if(this.props.type === constants.MEMOTEST_PIECE_TYPE_TEXT){
      content = <Textarea  disabled={this.props.disabled} defaultValue={this.props.text}/>
  	} else if(this.props.type === constants.MEMOTEST_PIECE_TYPE_IMAGE){
  		content = <img src={this.props.src} alt=""/>
  	}

  	var memotestPieceClass = classnames(this.props.textStyle, {
  	    'text': this.props.type === constants.MEMOTEST_PIECE_TYPE_TEXT,
  	    'image': this.props.type === constants.MEMOTEST_PIECE_TYPE_IMAGE,
  	    'empty': this.props.type === constants.MEMOTEST_PIECE_TYPE_EMPTY,
  	    'memotest-piece ui-droppable': true,
        'selected': this.props.id === this.props.correctAnswer,
        'drag-over': this.state.dragOver
  	});

    return (
        <div className={memotestPieceClass} id={this.props.id} onClick={this.props.onClick} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)} onDrop={this.onDrop.bind(this)}>
        	{content}
        </div>
    );
  }
}

export default MemotestPiece;
