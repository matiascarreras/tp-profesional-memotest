import React, { Component } from 'react';
import Header from './components/header/header'
import Search from './components/search/search'
import Memotest from './components/memotest/memotest'
import Trivia from './components/trivia/trivia'
import TextButton from './components/textButton/textButton'
import SwitchButton from './components/switchButton/switchButton'
import './App.css';
import iconTick from './images/icon-tick.png'
import * as actions from './actions'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import * as constants from './constants/constants'

class App extends Component {

  constructor(){
    super()
    this.state = {
      showGridSizeMenu: false,
      isSwitchOn: false,
      showTrivia: false
    }
  }

  openGridSizeMenu(){
    this.setState({showGridSizeMenu:!this.state.showGridSizeMenu})
  }

  changeGridSize(gridSize){
    this.props.gridSizeActions.selectGridSize(gridSize)
  }

  handleSwitchClick(){
    this.setState(prevState => ({
      isSwitchOn: !prevState.isSwitchOn
    }));
  }

  handleNextBtnClick(){
    this.setState({showTrivia:true})
  }

  handleBackBtnClick(){
    this.setState({showTrivia:false})
  }

  render() {
    //@todo: psf: remove this error log from App.js
    console.log(this.props);
    
    let settingsBtnOn = this.state.showGridSizeMenu ? 'on' : '';
    let settingsBtnClasses = `${settingsBtnOn} button-icon settings`;

    let showNextBtn = this.state.isSwitchOn ? "" : "hide";
    let nextBtnClass = `${showNextBtn} button-text blue`;

    let showDoneBtn = this.state.isSwitchOn ? "hide" : "";
    let doneBtnClass = `${showDoneBtn} button-text blue`;

    let showTriviaDoneBtn = this.state.showTrivia ? "" : "hide";
    let triviaDoneBtnClass = `${showTriviaDoneBtn} button-text blue`;

    let showBackBtn = this.state.showTrivia ? "" : "hide";
    let backBtnClass = `${showBackBtn} button-text white`;

    let memotestControlPanelClass = this.state.showTrivia ? "control-panel hide" : "control-panel";
    let triviaControlPanelClass = this.state.showTrivia ? "control-panel" : "control-panel hide";

    return (
      <div id="memotest-content">
        <Header title="Memory Test"/>
        <div id="menu" className={this.state.showTrivia ? "hide" : ""}>
          <li className={settingsBtnClasses} onClick={this.openGridSizeMenu.bind(this)}>Grid Size
            <ul id="settings-menu" className={this.state.showGridSizeMenu ? "" : "hide"}>
              <li className="memotest-size size_1" onClick={this.changeGridSize.bind(this, constants.SMALL_GRID_SIZE)}>
                <a>
                  <img src={iconTick} className={this.props.gridSize.gridSize == constants.SMALL_GRID_SIZE ? "memotest-tick-chosen-size" : "memotest-tick-chosen-size hide"} alt=""/>
                  <span>6 pairs</span> 
                </a>
              </li>
              <li className="memotest-size size_2" onClick={this.changeGridSize.bind(this, constants.MEDIUM_GRID_SIZE)}>
                <a>
                  <img src={iconTick} className={this.props.gridSize.gridSize == constants.MEDIUM_GRID_SIZE ? "memotest-tick-chosen-size" : "memotest-tick-chosen-size hide"} alt=""/>
                  <span>8 pairs</span>
                </a>
              </li>
              <li className="memotest-size size_3" onClick={this.changeGridSize.bind(this, constants.LARGE_GRID_SIZE)}>
                <a>
                  <img src={iconTick} className={this.props.gridSize.gridSize == constants.LARGE_GRID_SIZE ? "memotest-tick-chosen-size" : "memotest-tick-chosen-size hide"} alt=""/>
                  <span>12 pairs</span>
                </a>
              </li>
            </ul>
          </li>
        </div>
        <Search hide={this.state.showTrivia}/>
        <Memotest gridSize={this.props.gridSize.gridSize} hide={this.state.showTrivia}/>
        <Trivia gridSize={this.props.gridSize.gridSize} hide={!this.state.showTrivia}/>
        <div className={memotestControlPanelClass}>
          <SwitchButton text="Final Question" onClick={this.handleSwitchClick.bind(this)}/>
          <TextButton value="Next" id="button-next" class={nextBtnClass} onClick={this.handleNextBtnClick.bind(this)}/>
          <TextButton value="Done" id="button-done" class={doneBtnClass}/>
        </div>
        <div className={triviaControlPanelClass}>
          <TextButton value="Back" id="button-back" class={backBtnClass} onClick={this.handleBackBtnClick.bind(this)}/>
          <TextButton value="Done" id="button-done-trivia" class={triviaDoneBtnClass}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return { 
    gridSizeActions: bindActionCreators(actions, dispatch),
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
