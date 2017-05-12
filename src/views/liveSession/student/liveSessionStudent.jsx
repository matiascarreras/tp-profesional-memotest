import React, { Component } from 'react';
import { connect } from 'react-redux'
import classnames from 'classnames'
import { localize } from '../../../helpers/translator'

import './liveSessionStudent.css';
import logo from '../../../assets/header/logo.svg'
import liveSessionStudentSelector from '../../../selectors/live_session_student_selector'
import * as constants from '../../../constants/constants'
import MemotestPiece from '../../../components/memotestPiece/memotestPiece'

class LiveSessionStudent extends Component {

	listMemotestPieces(pieces, cantPieces){
	    let elements = []
	    var _this = this
	    for (var i = 0; i < cantPieces; i++) {
	        elements.push(
	        	<div key={i} className="full-piece-container">
		        	<div className="front">
		        		<div className="empty memotest-piece ui-droppable"></div>
		        	</div>
		        	<div className="back">
			        	<MemotestPiece disabled="true" id={pieces[i].id} type={pieces[i].type} text={pieces[i].text} src={pieces[i].src} textStyle={pieces[i].textStyle}/>        		
		        	</div>
	        	</div>
	        )
	    }
	    return elements
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

		var memotestPiecesMainClass = classnames(this.props.gridSize, {
			'flip-container': true,
		});

		var memotestPiecesContainerClass = classnames(this.props.gridSize, {
			'flipper': true,
		});

	    return (
	    	<div id="live-session-student">
	    		<div id="overlay"></div>
	   			<div id="triviaBox" className="overlayBox">
	        		<div className="triviaBoxContent">
			            <div id="triviaTitle" className="overlayTitle">{this.props.triviaQuestionText}</div>
			            <div id="triviaInfo" className="overlayInfo">
			            	trivia pieces
			            </div>
			            <div className="wrapperButton">
			            	<input id="triviaButton" className="overlayButton" type="button" value="Check my answer!"/>
			            </div>
			            <span id="triviaMessages"></span>
	        		</div>
	    		</div>
			    <div id="overlayBox" className="overlayBox">
			        <div id="overlayTitle" className="overlayTitle">Well done!</div>
			        <div id="overlayInfo" className="overlayInfo">
			        	You made it in
			        	<span className="timetxt">14</span>
			        	 moves!
			        </div>
			        <div className="wrapperButton">
			        	<input id="overlayButton" className="overlayButton" type="button" value="Show Question"/>
			        </div>
			    </div>
			    <div id="header">
			        <div className="container">
			            <img id="logo" src={logo} alt=""/>
			            <h2 id="title">{localize('header_title')}</h2>
			        </div>
			    </div>
			    <div id="memotest-pieces-main" className={memotestPiecesMainClass}>
			    	<div id="memotest-pieces-container" className={memotestPiecesContainerClass}>
			    		{this.listMemotestPieces(this.props.pieces, cantPieces)}
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