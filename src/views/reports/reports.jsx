import React, { Component } from 'react';
import { connect } from 'react-redux'
import classnames from 'classnames'
import { localize } from '../../helpers/translator'

import './reports.css';
import logo from '../../assets/header/logo.svg'
import reportsSelector from '../../selectors/reports_selector'
import reportsActions from '../../actions/reportsActions'
import appActions from '../../actions/appActions'
import bindActionsToDispatch from '../../helpers/bindActionsToDispatch'
import * as constants from '../../constants/constants'
import MemotestPiece from '../../components/memotestPiece/memotestPiece'

class Reports extends Component {

	componentDidMount(){
	  let params = this.getUrlParams()
	  if(params.id){
	  	this.props.actions.intializeMemotest(params.id, params.jwt)
	  }
	}

	getUrlParams() {
	  var params = {};
	  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	    params[key] = value;
	  });
	  return params;
	}

	listMemotestPieces(pieces){
	    let elements = []
	    var _this = this
	    for (var i = 0; i < pieces.length; i++) {
	        elements.push(
	        	<MemotestPiece key={i} disabled="true" correctAnswer={(this.props.isTriviaQuestionEnable)?this.props.triviaQuestionCorrectAnswer:""} id={pieces[i].id} type={pieces[i].type} text={pieces[i].text} src={pieces[i].src} textStyle={pieces[i].textStyle}/>
	        )
	    }
	    return elements
	}

	showStudentsResponsesTable(){
		let params = this.getUrlParams()
		if(params.jwt){
			this.props.actions.getStudentResponses(params.jwt)		
		}
	}

	render() {

		var memotestPiecesMainClass = classnames(this.props.gridSize, {
		    'no-final-question': !this.props.isTriviaQuestionEnable,
		});

	    return (
	   		<div id="reports">
			    <div id="header">
	    		    <div className="container">
	    		        <img id="logo" src={logo} alt=""/>
	    		        <h2 id="title">{localize('header_title')}</h2>
	    		    </div>
	    		</div>
	    		<div id="reports-content">
		    		<div id="memotest-pieces-main" className={memotestPiecesMainClass}>
		    		    <div id="memotest-pieces-container" className={this.props.gridSize}>
		    		        {this.listMemotestPieces(this.props.pieces)}
		    		    </div>
		    		</div>
		    		{this.props.isTriviaQuestionEnable
		    		&& <div id="memotest-final-question">
		    			{localize('live_session_final_question')} {this.props.triviaQuestionText}
		    		</div>
		    		}
		    		{this.showStudentsResponsesTable()}
		    		<table className="memotest-reports-table">
		    			<thead>
		    				<tr>
		    					<th>{localize('reports_student_nickname')}</th>
		    				   	<th>{localize('reports_moves')}</th> 
		    				    {this.props.isTriviaQuestionEnable
		    				    && <th>{localize('reports_final_question_trials')}</th>
		    					}
		    				</tr>
		    			</thead>
		    		  	<tbody>
		    		  		<tr>
		    		  			<td>Mati</td>
		    		  		    <td>14</td> 
		    		  		    {this.props.isTriviaQuestionEnable
		    		  		    && <td>2</td>
		    		  			}
		    		  		</tr>
		    		  		<tr>
		    		  			<td>Alario</td>
		    		  		    <td>10</td> 
		    		  		    {this.props.isTriviaQuestionEnable
		    		  		    && <td>3</td>
		    		  			}
		    		  		</tr>
		    		  	</tbody>
		    		</table>
	    		</div>
	    	</div>
	    );
  	}
}

function mapStateToProps(state){
  return reportsSelector(state);
}

function mapDispatchToProps(dispatch){
    return bindActionsToDispatch({
        getStudentResponses: reportsActions.getStudentResponses,
        intializeMemotest: appActions.intializeMemotest
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports);