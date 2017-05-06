import React, { Component } from 'react';
import './liveSessionStudent.css';
import logo from '../../../assets/header/logo.svg'

class LiveSessionStudent extends Component {

  render() {
    return (
    	<div id="body">
    		<div id="overlay"></div>
   			<div id="triviaBox" className="overlayBox">
        		<div className="triviaBoxContent">
		            <div id="triviaTitle" className="overlayTitle">asdadasdasasd</div>
		            <div id="triviaInfo" className="overlayInfo">
		                <div className="pieces-row">
		                	<div className="triviaPiece" data-trivia-piece="0"><img src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837529/icon1.jpg" alt=""/></div>
			                <div className="triviaPiece" data-trivia-piece="1"><img src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837529/icon1.jpg" alt=""/></div>
			                <div className="triviaPiece" data-trivia-piece="2"><img src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837529/icon1.jpg" alt=""/></div>
		                </div>
		                <div className="pieces-row">
		                	<div className="triviaPiece" data-trivia-piece="3"><img src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837529/icon1.jpg" alt=""/></div>
		                	<div className="triviaPiece" data-trivia-piece="4"><img src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837529/icon1.jpg" alt=""/></div>
		                	<div className="triviaPiece" data-trivia-piece="5"><img src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837529/icon1.jpg" alt=""/></div>
		                </div>
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
		            <h2 id="title">Memory Test</h2>
		        </div>
		    </div>
		    <div id="content">
		        <div id="imageContainer">
		            <img id="memotest-dorso" src="images/dorso-big.png" alt=""/>
		        	<img className="memotest-image-0" src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837529/icon1.jpg" id="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837529/icon1.jpg" alt=""/>
		        	<img className="memotest-image-1" src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837530/icon1.jpg" id="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837530/icon1.jpg" alt=""/>
		        	<img className="memotest-image-2" src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837531/icon1.jpg" id="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837531/icon1.jpg" alt=""/>
		        	<img className="memotest-image-3" src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837532/icon1.jpg" id="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837532/icon1.jpg" alt=""/>
		        	<img className="memotest-image-4" src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837534/icon1.jpg" id="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837534/icon1.jpg" alt=""/>
		        	<img className="memotest-image-5" src="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837535/icon1.jpg" id="https://cf.nearpod.com/neareducation/new/MemotestPiece/329837535/icon1.jpg" alt=""/>
		        </div>
		        <div className="board">
		            <canvas id="backgroundCanvas" width="1024" height="500"></canvas>
		            <canvas id="revealedCanvas" width="1024" height="500"></canvas>
		            <canvas id="piece1" className="memotest-piece" width="1024" height="500"></canvas>
		            <canvas id="piece2" className="memotest-piece" width="1024" height="500"></canvas>
		        </div>
		    </div>
		</div>
    );
  }
}

export default LiveSessionStudent;
