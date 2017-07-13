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
    }

    handleOnClickPiece(pieceId){
        this.props.actions.saveTriviaCorrectAnswer(pieceId)
    }

    handleBackBtnClick(){
        this.props.actions.showTrivia(false)
    }

    handleCancelBtnClick(){
      window.top.location.href = this.props.returnUrl
    }
    
    handleDoneBtnClick(){
        if(this.props.triviaQuestionText === ""){
            this.setState({ showAlertMessage: true });
            this.setState({ alertMessageText: localize('empty_final_question') });
        } else if(this.props.triviaQuestionCorrectAnswer === ""){
            this.setState({ showAlertMessage: true });
            this.setState({ alertMessageText: localize('empty_final_question_correct_answer') });
        } else {
            this.props.pieces.splice(this.props.cantPieces)
            this.shuffle(this.props.pieces)
            if(this.props.slideId){
                this.props.actions.updateMemotestData(this.props.presentationId, 1, "Memory Test", this.props, this.props, this.props.jwt, this.props.slideId, this.props.returnUrl)
            } else {
                this.props.actions.saveMemotestData(this.props.presentationId, 1, "Memory Test", this.props, this.props, this.props.jwt, this.props.returnUrl)            
            }
        }
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    listTriviaPieces(pieces, cantPieces){
        let elements = []
        var _this = this
        for (var i = 0; i < cantPieces; i++) {
            elements.push(
                <MemotestPiece key={i} correctAnswer={this.props.triviaQuestionCorrectAnswer} id={pieces[i].id} type={pieces[i].type} text={pieces[i].text} src={pieces[i].src} textStyle={pieces[i].textStyle} onClick={this.handleOnClickPiece.bind(this, pieces[i].id)}/>
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

        return (
        	<div id="trivia" className={(this.props.showTrivia)?'':'hide'}>
        	    <div id="trivia-question-container">
        	    	<input type="text" className="triviaQuestion" placeholder={localize('trivia_question_placeholder')} value={this.props.triviaQuestionText} onChange={this.handleOnChange.bind(this)} name="triviaQuestion" maxLength="150"/>
        		</div>
        	    <div id="trivia-pieces-container" className={this.props.gridSize}>
                    {this.listTriviaPieces(this.props.pieces, this.props.cantPieces)}
                </div>
                <div className="control-panel">
                  <TextButton text={localize('btn_back')} id="button-back" class="button-text white" onClick={this.handleBackBtnClick.bind(this)}/>
                  <TextButton text={localize('btn_cancel')} id="button-cancel" class="button-text white" onClick={this.handleCancelBtnClick.bind(this)}/>
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
        updateMemotestData: appActions.updateMemotestData,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
