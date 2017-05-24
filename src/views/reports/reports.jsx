import React, { Component } from 'react';
import { connect } from 'react-redux'
import classnames from 'classnames'
import { localize } from '../../helpers/translator'

import './reports.css';
import logo from '../../assets/header/logo.svg'
import reportsSelector from '../../selectors/reports_selector'
import * as constants from '../../constants/constants'
import MemotestPiece from '../../components/memotestPiece/memotestPiece'

class Reports extends Component {

	listMemotestPieces(pieces, cantPieces){
	    let elements = []
	    var _this = this
	    for (var i = 0; i < cantPieces; i++) {
	        elements.push(
	        	<MemotestPiece key={i} disabled="true" id={pieces[i].id} type={pieces[i].type} text={pieces[i].text} src={pieces[i].src} textStyle={pieces[i].textStyle}/>
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
		    'no-final-question': !this.props.triviaQuestionText,
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
		    		        {this.listMemotestPieces(this.props.pieces, cantPieces)}
		    		    </div>
		    		</div>
		    		{this.props.triviaQuestionText
		    		&& <div id="memotest-final-question" className={this.props.gridSize}>
		    			{localize('live_session_final_question')} {this.props.triviaQuestionText}
		    			<div id="memotest-pieces-container" className={this.props.gridSize}>
		    				<MemotestPiece key={1000} disabled="true" id={this.props.pieces[this.props.triviaQuestionCorrectAnswer].id} type={this.props.pieces[this.props.triviaQuestionCorrectAnswer].type} text={this.props.pieces[this.props.triviaQuestionCorrectAnswer].text} src={this.props.pieces[this.props.triviaQuestionCorrectAnswer].src} textStyle={this.props.pieces[this.props.triviaQuestionCorrectAnswer].textStyle}/>
		    			</div>
		    		</div>
		    		}
		    		<table className="memotest-reports-table">
		    			<thead>
		    				<tr>
		    					<th>{localize('reports_student_nickname')}</th>
		    				   	<th>{localize('reports_moves')}</th> 
		    				    {this.props.triviaQuestionText
		    				    && <th>{localize('reports_final_question_trials')}</th>
		    					}
		    				</tr>
		    			</thead>
		    		  	<tbody>
		    		  		<tr>
		    		  			<td>Mati</td>
		    		  		    <td>14</td> 
		    		  		    {this.props.triviaQuestionText
		    		  		    && <td>2</td>
		    		  			}
		    		  		</tr>
		    		  		<tr>
		    		  			<td>Alario</td>
		    		  		    <td>10</td> 
		    		  		    {this.props.triviaQuestionText
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

export default connect(mapStateToProps)(Reports);