import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import Header from './views/header/header'
import Search from './views/search/search'
import Memotest from './views/memotest/memotest'
import Trivia from './views/trivia/trivia'
import './App.css';
import icon from './assets/iconButton/btn-settings.png'
import iconOn from './assets/iconButton/btn-settings-on.png'
import iconList from './assets/memotest/icon-tick.png'
import * as actions from './actions'
import * as constants from './constants/constants'

class App extends Component {

  constructor(){
    super()
    this.state = {
      showGridSizeMenu: false,
      showTrivia: false
    }
  }

  openGridSizeMenu(){
    this.setState({showGridSizeMenu:!this.state.showGridSizeMenu})
  }

  handleOnBlurGridMenu(){
    this.setState({showGridSizeMenu:false})
  }

  changeGridSize(gridSize){
    this.props.memotestActions.selectGridSize(gridSize)
  }

  handleTriviaQuestionClick(){
    this.props.memotestActions.toggleTriviaQuestion()
  }

  handleNextBtnClick(){
    this.setState({showTrivia:true})
  }

  handleDoneBtnClick(){
    //save
  }

  handleBackBtnClick(){
    this.setState({showTrivia:false})
  }

  render() {

    var classNames = require('classnames');

    var settingsBtnClass = classNames({
        'button-icon': true,
        'on': this.state.showGridSizeMenu,
    });

    let srcIcon = icon
    if(this.state.showGridSizeMenu){
      srcIcon = iconOn
    }

    return (
      <div id="memotest-content">
        <Header title="Memory Test"/>
        <div id="menu" className={this.state.showTrivia ? "hide" : ""}>
          <button className={settingsBtnClass} onBlur={this.handleOnBlurGridMenu.bind(this)} onClick={this.openGridSizeMenu.bind(this)}>
            Grid Size
            <img src={srcIcon} alt=""/>
            <ul id="item-list" className={this.state.showGridSizeMenu ? "" : "hide"}>
              <li className="memotest-size size_1" onClick={this.changeGridSize.bind(this, constants.SMALL_GRID_SIZE)}>
                <a>
                  <img src={iconList} className={this.props.memotest.gridSize === constants.SMALL_GRID_SIZE ? "memotest-tick-chosen-size" : "memotest-tick-chosen-size hide"} alt=""/>
                  <span>6 pairs</span> 
                </a>
              </li>
              <li className="memotest-size size_2" onClick={this.changeGridSize.bind(this, constants.MEDIUM_GRID_SIZE)}>
                <a>
                  <img src={iconList} className={this.props.memotest.gridSize === constants.MEDIUM_GRID_SIZE ? "memotest-tick-chosen-size" : "memotest-tick-chosen-size hide"} alt=""/>
                  <span>8 pairs</span>
                </a>
              </li>
              <li className="memotest-size size_3" onClick={this.changeGridSize.bind(this, constants.LARGE_GRID_SIZE)}>
                <a>
                  <img src={iconList} className={this.props.memotest.gridSize === constants.LARGE_GRID_SIZE ? "memotest-tick-chosen-size" : "memotest-tick-chosen-size hide"} alt=""/>
                  <span>12 pairs</span>
                </a>
              </li>
            </ul>
          </button>
        </div>
        <Search hide={this.state.showTrivia}/>
        <Memotest gridSize={this.props.memotest.gridSize} pieces={this.props.memotest.pieces} hide={this.state.showTrivia} isTriviaQuestionEnable={this.props.memotest.isTriviaQuestionEnable} switchButtonClick={this.handleTriviaQuestionClick.bind(this)} nextBtnClick={this.handleNextBtnClick.bind(this)} doneBtnClick={this.handleDoneBtnClick.bind(this)}/>
        <Trivia hide={!this.state.showTrivia} backBtnClick={this.handleBackBtnClick.bind(this)} doneBtnClick={this.handleDoneBtnClick.bind(this)}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return { 
    memotestActions: bindActionCreators(actions, dispatch),
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
