import React, { Component } from 'react';
import './trivia.css';
import MemotestPiece from '../memotestPiece/memotestPiece'

class Trivia extends Component {

  render() {

    const triviaPieces = [];

    let cantPieces = 0;
    if (this.props.gridSize.indexOf("small") !== -1) {
        cantPieces = 12;
    } else if (this.props.gridSize.indexOf("medium") !== -1){
        cantPieces = 16;
    } else if (this.props.gridSize.indexOf("large") !== -1){
        cantPieces = 24;
    }

    for (var i = 0; i < cantPieces; i++) {
        triviaPieces.push(<MemotestPiece/>);
    };

    return (
    	<div id="trivia" className={(this.props.hide)?'hide':''}>
    	    <div id="trivia-question-container">
    	    	<input type="text" name="triviaQuestion" maxLength="150" className="hint" defaultValue="Write a question and select the right answer"/>
    		</div>
    	    <div id="trivia-pieces-container" className={this.props.gridSize}>
                {triviaPieces}
            </div>
    	</div>
    );
  }
}

export default Trivia;
