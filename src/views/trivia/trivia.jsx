import React, { Component } from 'react';
import { connect } from 'react-redux'
import './trivia.css';
import MemotestPiece from '../../components/memotestPiece/memotestPiece'
import TextButton from '../../components/textButton/textButton'
import triviaActions from '../../actions/triviaActions'
import triviaSelector from '../../selectors/trivia_selector'
import bindActionsToDispatch from '../../helpers/bindActionsToDispatch'
import * as constants from '../../constants/constants'
import { localize } from '../../helpers/translator'

class Trivia extends Component {

    handleOnChange(event){
        this.props.actions.saveTriviaQuestion(event.target.value)
        if(event.target.value === ""){
            event.target.placeholder = localize('trivia_question_placeholder')
        }
    }

    handleOnFocus(event){
        event.target.placeholder = ""
    }

    handleOnBlur(event){
        if(event.target.value === ""){
            event.target.placeholder = localize('trivia_question_placeholder')
        }
    }

    handleOnClickPiece(pieceId){
        this.props.actions.saveTriviaCorrectAnswer(pieceId)
    }

    render() {

        const triviaPieces = [];

        let cantPieces = 0;
        if (this.props.gridSize === constants.SMALL_GRID_SIZE) {
            cantPieces = 12;
        } else if (this.props.gridSize === constants.MEDIUM_GRID_SIZE){
            cantPieces = 16;
        } else if (this.props.gridSize === constants.LARGE_GRID_SIZE){
            cantPieces = 24;
        }

        for (var i = 0; i < cantPieces; i++) {
            triviaPieces.push(<MemotestPiece key={i} disabled="true" correctAnswer={this.props.triviaQuestionCorrectAnswer} id={this.props.pieces[i].id} type={this.props.pieces[i].type} text={this.props.pieces[i].text} src={this.props.pieces[i].src} textStyle={this.props.pieces[i].textStyle} onClick={this.handleOnClickPiece.bind(this, this.props.pieces[i].id)}/>);
        };

        return (
        	<div id="trivia" className={(this.props.hide)?'hide':''}>
        	    <div id="trivia-question-container">
        	    	<input type="text" className="triviaQuestion" placeholder={localize('trivia_question_placeholder')} onFocus={this.handleOnFocus.bind(this)} onBlur={this.handleOnBlur.bind(this)} value={this.props.triviaQuestionText} onChange={this.handleOnChange.bind(this)} name="triviaQuestion" maxLength="150"/>
        		</div>
        	    <div id="trivia-pieces-container" className={this.props.gridSize}>
                    {triviaPieces}
                </div>
                <div className="control-panel">
                  <TextButton text={localize('btn_back')} id="button-back" class="button-text white" onClick={this.props.backBtnClick}/>
                  <TextButton text={localize('btn_done')} id="button-done-trivia" class="button-text blue" onClick={this.props.doneBtnClick}/>
                </div>
        	</div>
        );
    }
}

function mapStateToProps(state){
  return triviaSelector(state);
}

function mapDispatchToProps(dispatch){
    return bindActionsToDispatch({
        saveTriviaQuestion: triviaActions.saveTriviaQuestion,
        saveTriviaCorrectAnswer: triviaActions.saveTriviaCorrectAnswer,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
