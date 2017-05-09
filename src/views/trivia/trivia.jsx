import React, { Component } from 'react';
import { connect } from 'react-redux'
import classnames from 'classnames'

import './trivia.css';
import MemotestPiece from '../../components/memotestPiece/memotestPiece'
import TextButton from '../../components/textButton/textButton'
import triviaActions from '../../actions/triviaActions'
import appActions from '../../actions/appActions'
import triviaSelector from '../../selectors/trivia_selector'
import bindActionsToDispatch from '../../helpers/bindActionsToDispatch'
import * as constants from '../../constants/constants'
import { localize } from '../../helpers/translator'
import closeImage from '../../assets/searchPanelLocal/np-close-popup.svg'

class Trivia extends Component {

    constructor(){
        super()
        this.state = {
            showAlertMessage: false,
            alertMessageText: ""
        }
    }


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

    handleBackBtnClick(){
        this.props.actions.showTrivia(false)
    }

    handleDoneBtnClick(){
        if(this.props.triviaQuestionText === ""){
            this.setState({ showAlertMessage: true });
            this.setState({ alertMessageText: localize('empty_final_question') });
        } else if(this.props.triviaQuestionCorrectAnswer === ""){
            this.setState({ showAlertMessage: true });
            this.setState({ alertMessageText: localize('empty_final_question_correct_answer') });
        } else {
            this.props.actions.saveMemotestData()        
        }
    }

    listTriviaPieces(pieces, cantPieces){
        let elements = []
        var _this = this
        for (var i = 0; i < cantPieces; i++) {
            elements.push(
                <MemotestPiece key={i} disabled="true" correctAnswer={this.props.triviaQuestionCorrectAnswer} id={pieces[i].id} type={pieces[i].type} text={pieces[i].text} src={pieces[i].src} textStyle={pieces[i].textStyle} onClick={this.handleOnClickPiece.bind(this, pieces[i].id)}/>
            )
        }
        return elements
    }

    handleCloseBtnClick(){
      this.setState({ showAlertMessage: false });
    }

    handleGotItBtnClick(){
      this.setState({ showAlertMessage: false });
    }

    render() {

        var opacityModalClass = classnames({
          'opacityModal': true,
          'hide': !this.state.showAlertMessage,
        });

        var alertMessageClass = classnames({
          'alert-message': true,
          'hide': !this.state.showAlertMessage,
        });


        let cantPieces = 0;
        if (this.props.gridSize === constants.SMALL_GRID_SIZE) {
            cantPieces = 12;
        } else if (this.props.gridSize === constants.MEDIUM_GRID_SIZE){
            cantPieces = 16;
        } else if (this.props.gridSize === constants.LARGE_GRID_SIZE){
            cantPieces = 24;
        }

        return (
        	<div id="trivia" className={(this.props.showTrivia)?'':'hide'}>
        	    <div id="trivia-question-container">
        	    	<input type="text" className="triviaQuestion" placeholder={localize('trivia_question_placeholder')} onFocus={this.handleOnFocus.bind(this)} onBlur={this.handleOnBlur.bind(this)} value={this.props.triviaQuestionText} onChange={this.handleOnChange.bind(this)} name="triviaQuestion" maxLength="150"/>
        		</div>
        	    <div id="trivia-pieces-container" className={this.props.gridSize}>
                    {this.listTriviaPieces(this.props.pieces, cantPieces)}
                </div>
                <div className="control-panel">
                  <TextButton text={localize('btn_back')} id="button-back" class="button-text white" onClick={this.handleBackBtnClick.bind(this)}/>
                  <TextButton text={localize('btn_done')} id="button-done-trivia" class="button-text blue" onClick={this.handleDoneBtnClick.bind(this)}/>
                </div>
                <div id="opacityModal" className={opacityModalClass}/>
                <div className={alertMessageClass}>
                  <span id="alert-message-closeBtn" onClick={this.handleCloseBtnClick.bind(this)}>
                    <img alt="" src={closeImage} className="alert-message-closeBtn"/>
                  </span>
                  <div>
                    <span>{this.state.alertMessageText}</span>
                  </div>
                  <div className="buttons">
                    <button type="button" className="btn-gotIt" onClick={this.handleGotItBtnClick.bind(this)} value={localize('btn_got_it')}>{localize('btn_got_it')}</button>
                  </div>
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
        saveMemotestData: appActions.saveMemotestData,
        showTrivia: appActions.showTrivia,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
