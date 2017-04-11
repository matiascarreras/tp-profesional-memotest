import React, { Component } from 'react';
import './memotest.css';
import MemotestPiece from '../memotestPiece/memotestPiece'

class Memotest extends Component {

  render() {

    const memotestPieces = [];

    let cantPieces = 0;
    if (this.props.gridSize.indexOf("small") !== -1) {
        cantPieces = 12;
    } else if (this.props.gridSize.indexOf("medium") !== -1){
        cantPieces = 16;
    } else if (this.props.gridSize.indexOf("large") !== -1){
        cantPieces = 24;
    }

    for (var i = 0; i < cantPieces; i++) {
        memotestPieces.push(<MemotestPiece/>);
    };

    return (
    	<div id="memotest" className={(this.props.hide)?'hide':''}>
    	    <div id="memotest-pieces-main">
                <div id="memotest-pieces-container" className={this.props.gridSize}>
                    {memotestPieces}
                </div>
            </div>
    	</div>
    );
  }
}

export default Memotest;
