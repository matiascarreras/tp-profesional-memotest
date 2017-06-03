import React, { Component } from 'react';
import { connect } from 'react-redux'
import classnames from 'classnames'
import { localize } from '../../../helpers/translator'
import ReactCardFlip from 'react-card-flip';

import './liveSessionStudent.css';
import logo from '../../../assets/header/logo.svg'
import liveSessionStudentSelector from '../../../selectors/live_session_student_selector'
import liveSessionStudentActions from '../../../actions/liveSessionStudentActions'
import bindActionsToDispatch from '../../../helpers/bindActionsToDispatch'
import * as constants from '../../../constants/constants'
import MemotestPiece from '../../../components/memotestPiece/memotestPiece'

class LiveSessionStudent extends Component {

	constructor(){
	    super()
	    this.state = {
	    	showOverlay: false,
	        showOverlayBox: false,
	        showTriviaBox: false,
	        showTriviaIncorrectAnswerMessage: false,
	        showTriviaCorrectAnswerMessage: false,
	        showTriviaMissingAnswerMessage: false,
	        overlayTitle: localize('live_session_student_overlay_title'),
	        overlayInfoBeforeTxt: localize('live_session_student_overlay_info'),
	        overlayInfoAfterTxt: localize('live_session_student_overlay_info_moves'),
	        overlayButton: localize('live_session_student_overlay_button'),
	        triviaAnswer: '',
	        moves: 0,
	        finalQuestionAttemps: 0,
	        gameFinish: false,
	    }
	}

	listMemotestPieces(pieces){
	    let elements = []
	    var _this = this
	    for (var i = 0; i < pieces.length; i++) {
	    	var isFlipped = false
	    	if((this.props.selectedPieces.indexOf(pieces[i].id) !== -1) ||
	    		this.props.matches.indexOf(pieces[i].id) !== -1){
	    		isFlipped = true
	    	}
	        elements.push(
	        	<ReactCardFlip key={i} isFlipped={isFlipped}>
	        		<div key="front" id={pieces[i].id} className="empty memotest-piece ui-droppable" onClick={this.handleClickMemotestPiece.bind(this, pieces[i].id)}></div>
        	    	<MemotestPiece key="back" disabled="true" id={pieces[i].id} type={pieces[i].type} text={pieces[i].text} src={pieces[i].src} textStyle={pieces[i].textStyle}/>
	        	</ReactCardFlip>
	        )
	    }
	    //this.shuffle(elements)
	    return elements
	}

	listTriviaPieces(pieces){
	    let elements = []
	    var _this = this
	    for (var i = 0; i < pieces.length; i++) {
	        elements.push(
	        	<MemotestPiece key={i} disabled="true" correctAnswer={this.state.triviaAnswer} id={pieces[i].id} type={pieces[i].type} text={pieces[i].text} src={pieces[i].src} textStyle={pieces[i].textStyle} onClick={this.handleClickTriviaPiece.bind(this, pieces[i].id)}/>        		
	        )
	    }
	    return elements
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

	overlayButtonClick(){
		this.setState({ showOverlayBox: false });
		if(this.props.triviaQuestionText && (this.state.overlayInfoAfterTxt || this.state.triviaAnswer)){
			this.setState({ showTriviaBox: true });
		} else {
			this.setState({ showOverlay: false });
			this.setState({ gameFinish: true });	
		}
	}

	handleClickTriviaPiece(pieceId){
	    this.setState({ triviaAnswer: pieceId });
	}

	handleClickMemotestPiece(pieceId) {
		this.props.actions.saveMemotestPieceSelected(pieceId)
		setTimeout(()=>this.props.actions.validateMatch(),2000)
		this.setState({ moves: this.state.moves + 1 })
	}

	triviaButtonClick(){
		this.setState({ showTriviaMissingAnswerMessage: false });
		if(this.state.triviaAnswer){
			this.setState({ showTriviaBox: false })
			this.setState({ showOverlayBox: true })
			if(this.props.triviaQuestionCorrectAnswer === this.state.triviaAnswer){
				this.setState({ overlayTitle: localize('live_session_student_trivia_correct_answer_title') })
				this.setState({ overlayInfoBeforeTxt: localize('live_session_student_trivia_correct_answer_message') })
				this.setState({ overlayInfoAfterTxt: '' })
				this.setState({ triviaAnswer: '' })
				this.setState({ overlayButton: localize('live_session_student_trivia_correct_answer_btn')})
			} else {
				this.setState({ overlayTitle: localize('live_session_student_trivia_incorrect_answer_title') })
				this.setState({ overlayInfoBeforeTxt: localize('live_session_student_trivia_incorrect_answer_message') })
				this.setState({ overlayInfoAfterTxt: ''})
				this.setState({ overlayButton: localize('live_session_student_trivia_incorrect_answer_btn') })
				this.setState({ finalQuestionAttemps: this.state.finalQuestionAttemps + 1 });
			}
		} else {
			this.setState({ showTriviaMissingAnswerMessage: true });
		}
	}

	render() {

		if(this.props.cantPieces === this.props.matches.length
		 && !this.state.gameFinish
		 && !this.state.showTriviaBox){
			this.state.showOverlay = true
			this.state.showOverlayBox = true
		}

		var overlayBoxClass = classnames({
			'overlayBox': true,
			'hide': !this.state.showOverlayBox,
		});

		let triviaBoxStyle = 'none'
		if(this.state.showTriviaBox){
			triviaBoxStyle = 'table'
		}

		var overlayClass = classnames({
			'hide': !this.state.showOverlay,
		})

		if(this.props.triviaQuestionText && this.state.overlayInfoAfterTxt){
			this.state.overlayButton =  localize('live_session_student_overlay_button_show_question')
		}

		var triviaMessagesClass = classnames({
			'errorMessage': true,
			'hide': !this.state.showTriviaMissingAnswerMessage,
		});

		var triviaInfoClass = classnames(this.props.gridSize, {
			'overlayInfo': true,
		})

	    return (
	    	<div id="live-session-student">
	    		<div id="overlay" className={overlayClass}></div>
	   			<div id="triviaBox" className="overlayBox" style={{display: triviaBoxStyle}}>
	        		<div className="triviaBoxContent">
			            <div id="triviaTitle" className="overlayTitle">{this.props.triviaQuestionText}</div>
			            <div id="triviaInfo" className={triviaInfoClass}>
			            	{this.listTriviaPieces(this.props.pieces)}
			            </div>
			            <div className="wrapperButton">
			            	<input id="triviaButton" onClick={this.triviaButtonClick.bind(this)} className="overlayButton" type="button" value={localize('live_session_student_trivia_button')}/>
			            </div>
			            <span id="triviaMessages">
			            	<p className={triviaMessagesClass}>{localize('live_session_student_trivia_missing_answer')}</p>
			            </span>
	        		</div>
	    		</div>
			    <div id="overlayBox" className={overlayBoxClass}>
			        <div id="overlayTitle" className="overlayTitle">{this.state.overlayTitle}</div>
			        <div id="overlayInfo" className="overlayInfo">
			        	{this.state.overlayInfoBeforeTxt}
			        	{this.state.overlayInfoAfterTxt
			        	&& <span className="timetxt">{this.state.moves}</span>
			        	}
			        	{this.state.overlayInfoAfterTxt}
			        </div>
			        <div className="wrapperButton">
			        	<input id="overlayButton" onClick={this.overlayButtonClick.bind(this)} className="overlayButton" type="button" value={this.state.overlayButton}/>
			        </div>
			    </div>
			    <div id="header">
			        <div className="container">
			            <img id="logo" src={logo} alt=""/>
			            <h2 id="title">{localize('header_title')}</h2>
			        </div>
			    </div>
			    <div id="memotest-pieces-main" className={this.props.gridSize}>
			    	<div id="memotest-pieces-container" className={this.props.gridSize}>
			    		{this.listMemotestPieces(this.props.pieces)}
			    	</div>
			    </div>
			</div>
	    );
	}
}

function mapStateToProps(state){
	return liveSessionStudentSelector(state);
}

function mapDispatchToProps(dispatch){
    return bindActionsToDispatch({
        saveMemotestPieceSelected: liveSessionStudentActions.saveMemotestPieceSelected,
        validateMatch: liveSessionStudentActions.validateMatch,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSessionStudent);