import React, { Component } from 'react';
import { connect } from 'react-redux'
import classnames from 'classnames'
import { localize } from '../../../helpers/translator'
import ReactCardFlip from 'react-card-flip';

import './liveSessionStudent.css';
import logo from '../../../assets/header/logo.svg'
import liveSessionStudentSelector from '../../../selectors/live_session_student_selector'
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
	        isFlipped: false,
	    }
	}

	listMemotestPieces(pieces, cantPieces, flippedCSS){
	    let elements = []
	    var _this = this
	    for (var i = 0; i < cantPieces; i++) {
	        elements.push(
	        	<ReactCardFlip key={i} isFlipped={this.state.isFlipped}>
	        		<div key="front" className="empty memotest-piece ui-droppable" onClick={this.handleClickMemotestPiece.bind(this)}></div>
        	    	<MemotestPiece key="back" disabled="true" id={pieces[i].id} type={pieces[i].type} text={pieces[i].text} src={pieces[i].src} textStyle={pieces[i].textStyle} onClick={this.handleClickMemotestPiece.bind(this)}/>
	        	</ReactCardFlip>
	        )
	    }
	    return elements
	}

	listTriviaPieces(pieces, cantPieces){
	    let elements = []
	    var _this = this
	    for (var i = 0; i < cantPieces; i++) {
	        elements.push(
	        	<MemotestPiece key={i} disabled="true" correctAnswer={this.state.triviaAnswer} id={pieces[i].id} type={pieces[i].type} text={pieces[i].text} src={pieces[i].src} textStyle={pieces[i].textStyle} onClick={this.handleClickTriviaPiece.bind(this, pieces[i].id)}/>        		
	        )
	    }
	    return elements
	}

	overlayButtonClick(){
		this.setState({ showOverlayBox: false });
		if(this.props.triviaQuestionText){
			this.setState({ showTriviaBox: true });
		} else {
			this.setState({ showOverlay: false });	
		}
	}

	handleClickTriviaPiece(pieceId){
	    this.setState({ triviaAnswer: pieceId });
	}

	handleClickMemotestPiece(e) {
	    e.preventDefault();
	    this.setState({ isFlipped: !this.state.isFlipped });
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
				this.setState({ triviaAnswer: '' })
				this.setState({ overlayButton: localize('live_session_student_trivia_incorrect_answer_btn') })
			}
		} else {
			this.setState({ showTriviaMissingAnswerMessage: true });
		}
	}

	render() {

		let cantPieces = 0;
		if (this.props.gridSize === constants.SMALL_GRID_SIZE) {
		    cantPieces = 12;
		} else if (this.props.gridSize === constants.MEDIUM_GRID_SIZE){
		    cantPieces = 16;
		} else if (this.props.gridSize === constants.LARGE_GRID_SIZE){
		    cantPieces = 24;
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

		if(this.props.triviaQuestionText){
			this.state.overlayButton =  localize('live_session_student_overlay_button_show_question')
		}

		var triviaMessagesClass = classnames({
			'errorMessage': true,
			'hide': !this.state.showTriviaMissingAnswerMessage,
		});

		var flippedCSS = this.state.flipped ? " Card-Back-Flip" : " Card-Front-Flip";
		if (!this.state.clicked) flippedCSS =  "";

	    return (
	    	<div id="live-session-student">
	    		<div id="overlay" className={overlayClass}></div>
	   			<div id="triviaBox" className="overlayBox" style={{display: triviaBoxStyle}}>
	        		<div className="triviaBoxContent">
			            <div id="triviaTitle" className="overlayTitle">{this.props.triviaQuestionText}</div>
			            <div id="triviaInfo" className="overlayInfo">
			            	{this.listTriviaPieces(this.props.pieces, cantPieces)}
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
			        	&& <span className="timetxt">14</span>
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
			    		{this.listMemotestPieces(this.props.pieces, cantPieces, flippedCSS)}
			    	</div>
			    </div>
			</div>
	    );
	}
}

function mapStateToProps(state){
	return liveSessionStudentSelector(state);
}

export default connect(mapStateToProps)(LiveSessionStudent);