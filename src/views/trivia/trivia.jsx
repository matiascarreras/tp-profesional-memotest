import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import './trivia.css';
import MemotestPiece from '../../components/memotestPiece/memotestPiece'
import TextButton from '../../components/textButton/textButton'
import * as actions from '../../actions'
import * as constants from '../../constants/constants'

class Trivia extends Component {

    handleOnChange(event){
        this.props.memotestActions.saveTriviaQuestion(event.target.value)
        if(event.target.value === ""){
            event.target.placeholder = "Write a question and select the right answer"
        }
    }

    handleOnFocus(event){
        event.target.placeholder = ""
    }

    handleOnBlur(event){
        if(event.target.value === ""){
            event.target.placeholder = "Write a question and select the right answer"
        }
    }

    handleOnClickPiece(pieceId){
        this.props.memotestActions.saveTriviaCorrectAnswer(pieceId)
    }

    render() {

        const triviaPieces = [];

        let cantPieces = 0;
        if (this.props.memotest.gridSize === constants.SMALL_GRID_SIZE) {
            cantPieces = 12;
        } else if (this.props.memotest.gridSize === constants.MEDIUM_GRID_SIZE){
            cantPieces = 16;
        } else if (this.props.memotest.gridSize === constants.LARGE_GRID_SIZE){
            cantPieces = 24;
        }

        for (var i = 0; i < cantPieces; i++) {
            triviaPieces.push(<MemotestPiece disabled="true" correctAnswer={this.props.memotest.triviaQuestionCorrectAnswer}id={this.props.memotest.pieces[i].id} type={this.props.memotest.pieces[i].type} text={this.props.memotest.pieces[i].text} src={this.props.memotest.pieces[i].src} textStyle={this.props.memotest.pieces[i].textStyle} onClick={this.handleOnClickPiece.bind(this, this.props.memotest.pieces[i].id)}/>);
        };

        return (
        	<div id="trivia" className={(this.props.hide)?'hide':''}>
        	    <div id="trivia-question-container">
        	    	<input type="text" className="triviaQuestion" placeholder="Write a question and select the right answer" onFocus={this.handleOnFocus.bind(this)} onBlur={this.handleOnBlur.bind(this)} value={this.props.memotest.triviaQuestionText} onChange={this.handleOnChange.bind(this)} name="triviaQuestion" maxLength="150"/>
        		</div>
        	    <div id="trivia-pieces-container" className={this.props.memotest.gridSize}>
                    {triviaPieces}
                </div>
                <div className="control-panel">
                  <TextButton text="Back" id="button-back" class="button-text white" onClick={this.props.backBtnClick}/>
                  <TextButton text="Done" id="button-done-trivia" class="button-text blue" onClick={this.props.doneBtnClick}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
