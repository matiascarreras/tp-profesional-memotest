import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

import './memotest.css';
import MemotestPiece from '../../components/memotestPiece/memotestPiece'
import SwitchButton from '../../components/switchButton/switchButton'
import TextButton from '../../components/textButton/textButton'
import * as constants from '../../constants/constants'
import * as actions from '../../actions'

class Memotest extends Component {

    handleOnDrop(id, type, textStyle, src){
        this.props.memotestActions.saveMemotestPiece(id, type, textStyle, src)
    }

    render() {

        var classNames = require('classnames');

        var nextBtnClass = classNames({
            'button-text blue': true,
            'hide': !this.props.isTriviaQuestionEnable,
        });

        var doneBtnClass = classNames({
            'button-text blue': true,
            'hide': this.props.isTriviaQuestionEnable,
        });

        const memotestPieces = [];

        let cantPieces = 0;
        if (this.props.gridSize === constants.SMALL_GRID_SIZE) {
            cantPieces = 12;
        } else if (this.props.gridSize === constants.MEDIUM_GRID_SIZE){
            cantPieces = 16;
        } else if (this.props.gridSize === constants.LARGE_GRID_SIZE){
            cantPieces = 24;
        }

        for (var i = 0; i < cantPieces; i++) {
            memotestPieces.push(<MemotestPiece handleOnDrop={this.handleOnDrop.bind(this)} key={i} id={this.props.pieces[i].id} type={this.props.pieces[i].type} text={this.props.pieces[i].text} src={this.props.pieces[i].src} textStyle={this.props.pieces[i].textStyle}/>);
        };

        return (
        	<div id="memotest" className={(this.props.hide)?'hide':''}>
        	    <div id="memotest-pieces-main">
                    <div id="memotest-pieces-container" className={this.props.gridSize}>
                        {memotestPieces}
                    </div>
                </div>
                <div className="control-panel">
                  <SwitchButton text="Final Question" onClick={this.props.switchButtonClick}/>
                  <TextButton text="Next" id="button-next" class={nextBtnClass} onClick={this.props.nextBtnClick}/>
                  <TextButton text="Done" id="button-done" class={doneBtnClass} onClick={this.props.doneBtnClick}/>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Memotest);