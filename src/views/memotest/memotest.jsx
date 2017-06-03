import React, { Component } from 'react';
import { connect } from 'react-redux'
import classnames from 'classnames'

import './memotest.css';
import MemotestPiece from '../../components/memotestPiece/memotestPiece'
import SwitchButton from '../../components/switchButton/switchButton'
import TextButton from '../../components/textButton/textButton'
import * as constants from '../../constants/constants'
import memotestActions from '../../actions/memotestActions'
import appActions from '../../actions/appActions'
import memotestSelector from '../../selectors/memotest_selector'
import bindActionsToDispatch from '../../helpers/bindActionsToDispatch'
import { localize } from '../../helpers/translator'
import closeImage from '../../assets/searchPanelLocal/np-close-popup.svg'

class Memotest extends Component {

    constructor(){
        super()
        this.state = {
            showAlertMessage: false
        }
    }

    handleTriviaQuestionClick(){
        this.props.actions.toggleTriviaQuestion()
    }

    handleDoneBtnClick(){
        if(!this.isMemotestCompleted(this.props.pieces, this.props.cantPieces)){
            this.setState({ showAlertMessage: true });
        } else {
            this.props.actions.saveMemotestData(106135, 1, "Memory Test", this.props, this.props)
        }
    }

    isMemotestCompleted(pieces, cantPieces){
        for (var i = 0; i < cantPieces; i++) {
            if (pieces[i].type === constants.MEMOTEST_PIECE_TYPE_EMPTY){
                return false
            }
        }
        return true
    }

    handleNextBtnClick(){
        if(!this.isMemotestCompleted(this.props.pieces, this.props.cantPieces)){
            this.setState({ showAlertMessage: true });
        } else {
            this.props.actions.showTrivia(true)
        }
    }

    handleOnDrop(id, type, textStyle, src){
        this.props.actions.saveMemotestPiece(id, type, textStyle, src)
    }

    listMemotestPieces(pieces, cantPieces){
        let elements = []
        var _this = this
        for (var i = 0; i < cantPieces; i++) {
            elements.push(
                <MemotestPiece handleOnDrop={this.handleOnDrop.bind(this)} key={i} id={pieces[i].id} type={pieces[i].type} text={pieces[i].text} src={pieces[i].src} textStyle={pieces[i].textStyle}/>
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

        var nextBtnClass = classnames({
            'button-text blue': true,
            'hide': !this.props.isTriviaQuestionEnable,
        });

        var doneBtnClass = classnames({
            'button-text blue': true,
            'hide': this.props.isTriviaQuestionEnable,
        });

        var opacityModalClass = classnames({
          'opacityModal': true,
          'hide': !this.state.showAlertMessage,
        });

        var alertMessageClass = classnames({
          'alert-message': true,
          'hide': !this.state.showAlertMessage,
        });

        return (
        	<div id="memotest" className={(this.props.showTrivia)?'hide':''}>
        	    <div id="memotest-pieces-main">
                    <div id="memotest-pieces-container" className={this.props.gridSize}>
                        {this.listMemotestPieces(this.props.pieces, this.props.cantPieces)}
                    </div>
                </div>
                <div className="control-panel">
                  <SwitchButton text={localize('final_question_switch')} onClick={this.handleTriviaQuestionClick.bind(this)}/>
                  <TextButton text={localize('btn_next')} id="button-next" class={nextBtnClass} onClick={this.handleNextBtnClick.bind(this)}/>
                  <TextButton text={localize('btn_done')} id="button-done" class={doneBtnClass} onClick={this.handleDoneBtnClick.bind(this)}/>
                </div>
                <div id="opacityModal" className={opacityModalClass}/>
                <div className={alertMessageClass}>
                  <span id="alert-message-closeBtn" onClick={this.handleCloseBtnClick.bind(this)}>
                    <img alt="" src={closeImage} className="alert-message-closeBtn"/>
                  </span>
                  <div>
                    <span>{localize('empty_pieces_error_msg')}</span>
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
  return memotestSelector(state);
}

function mapDispatchToProps(dispatch){
    return bindActionsToDispatch({
        toggleTriviaQuestion: memotestActions.toggleTriviaQuestion,
        saveMemotestPiece: memotestActions.saveMemotestPiece,
        saveMemotestData: appActions.saveMemotestData,
        showTrivia: appActions.showTrivia,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Memotest);