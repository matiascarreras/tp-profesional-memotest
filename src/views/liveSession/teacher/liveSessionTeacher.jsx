import React, { Component } from 'react';
import { connect } from 'react-redux'
import { localize } from '../../../helpers/translator'

import './liveSessionTeacher.css';
import logo from '../../../assets/header/logo.svg'
import liveSessionTeacherSelector from '../../../selectors/live_session_teacher_selector'
import appActions from '../../../actions/appActions'
import bindActionsToDispatch from '../../../helpers/bindActionsToDispatch'
import * as constants from '../../../constants/constants'
import MemotestPiece from '../../../components/memotestPiece/memotestPiece'

class LiveSessionTeacher extends Component {

	componentDidMount(){
	  if(this.props.slideId){
	    this.props.actions.intializeMemotest(this.props.slideId, this.props.jwt)    
	  }
	}
	
	listMemotestPieces(pieces){
	    let elements = []
	    var _this = this
	    for (var i = 0; i < pieces.length; i++) {
	        elements.push(
	        	<MemotestPiece key={i} disabled="true" correctAnswer={this.props.triviaQuestionCorrectAnswer} id={pieces[i].id} type={pieces[i].type} text={pieces[i].text} src={pieces[i].src} textStyle={pieces[i].textStyle}/>
	        )
	    }
	    return elements
	}

	render() {

	    return (
	   		<div id="live-session-teacher">
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
	    		{this.props.triviaQuestionText
	    		&& <div id="memotest-final-question" className={this.props.gridSize}>
	    			{localize('live_session_final_question')} {this.props.triviaQuestionText}
	    		</div>
	    		}
	    		
	    	</div>
	    );
  	}
}

function mapStateToProps(state){
  return liveSessionTeacherSelector(state);
}

function mapDispatchToProps(dispatch){
    return bindActionsToDispatch({
        intializeMemotest: appActions.intializeMemotest
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveSessionTeacher);