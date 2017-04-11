import React, { Component } from 'react';
import Header from './component/header/header'
import Search from './component/search/search'
import Memotest from './component/memotest/memotest'
import Trivia from './component/trivia/trivia'
import TextButton from './component/textButton/textButton'
import SwitchButton from './component/switchButton/switchButton'
import './App.css';
import iconTick from './images/icon-tick.png'

class App extends Component {

  constructor(){
    super()
    this.state = {
      showGridSizeMenu: false,
      smallGridSizeSelected: true,
      mediumGridSizeSelected: false,
      largeGridSizeSelected: false, 
      isSwitchOn: false,
      showTrivia: false
    }
  }

  openGridSizeMenu(){
    this.setState({showGridSizeMenu:!this.state.showGridSizeMenu})
  }

  showSmallGrid(){
    this.setState({smallGridSizeSelected:true, mediumGridSizeSelected:false, largeGridSizeSelected:false})
  }

  showMediumGrid(){
    this.setState({smallGridSizeSelected:false, mediumGridSizeSelected:true, largeGridSizeSelected:false})
  }

  showLargeGrid(){
    this.setState({smallGridSizeSelected:false, mediumGridSizeSelected:false, largeGridSizeSelected:true})
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

    let settingsBtnOn = this.state.showGridSizeMenu ? 'on' : '';
    let settingsBtnClasses = `${settingsBtnOn} button-icon settings`;

    let showSmallSizeTick = this.state.smallGridSizeSelected ? '' : 'hide';
    let smallTickClasses = `${showSmallSizeTick} memotest-tick-chosen-size`;

    let showMediumSizeTick = this.state.mediumGridSizeSelected ? '' : 'hide';
    let mediumTickClasses = `${showMediumSizeTick} memotest-tick-chosen-size`;

    let showLargeSizeTick = this.state.largeGridSizeSelected ? '' : 'hide';
    let largeTickClasses = `${showLargeSizeTick} memotest-tick-chosen-size`;

    let smallSize = this.state.smallGridSizeSelected ? "small" : "";
    let mediumSize = this.state.mediumGridSizeSelected ? "medium" : "";
    let largeSize = this.state.largeGridSizeSelected ? "large" : "";

    let memoteGridSizeClass = `${smallSize} ${mediumSize} ${largeSize}`;

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
              <li className="memotest-size size_1" onClick={this.showSmallGrid.bind(this)}>
                <a>
                  <img src={iconTick} className={smallTickClasses} alt=""/>
                  <span>6 pairs</span> 
                </a>
              </li>
              <li className="memotest-size size_2" onClick={this.showMediumGrid.bind(this)}>
                <a>
                  <img src={iconTick} className={mediumTickClasses} alt=""/>
                  <span>8 pairs</span>
                </a>
              </li>
              <li className="memotest-size size_3" onClick={this.showLargeGrid.bind(this)}>
                <a>
                  <img src={iconTick} className={largeTickClasses} alt=""/>
                  <span>12 pairs</span>
                </a>
              </li>
            </ul>
          </li>
        </div>
        <Search hide={this.state.showTrivia}/>
        <Memotest gridSize={memoteGridSizeClass} hide={this.state.showTrivia}/>
        <Trivia gridSize={memoteGridSizeClass} hide={!this.state.showTrivia}/>
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

export default App;
