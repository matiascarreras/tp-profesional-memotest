import React, { Component } from 'react';
import { connect } from 'react-redux'
import classnames from 'classnames'

import Header from 'views/header/header'
import Search from 'views/search/search'
import Memotest from 'views/memotest/memotest'
import Trivia from 'views/trivia/trivia'
import './App.css';
import icon from './assets/iconButton/btn-settings.png'
import iconOn from './assets/iconButton/btn-settings-on.png'
import iconList from './assets/memotest/icon-tick.png'
import appActions from './actions/appActions'
import appSelector from './selectors/app_selector'
import bindActionsToDispatch from './helpers/bindActionsToDispatch'
import * as constants from './constants/constants'
import { localize } from './helpers/translator'

class App extends Component {

  constructor(){
    super()
    this.state = {
      showGridSizeMenu: false,
    }
  }

  componentDidMount(){
    //this.props.actions.intializeMemotest()
  }

  getUrlParams() {
    var params = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      params[key] = value;
    });
    return params;
  }

  openGridSizeMenu(){
    this.setState({showGridSizeMenu:!this.state.showGridSizeMenu})
  }

  handleOnBlurGridMenu(){
    this.setState({showGridSizeMenu:false})
  }

  changeGridSize(gridSize){
    this.props.actions.selectGridSize(gridSize)
  }

  render() {

    var settingsBtnClass = classnames({
        'button-icon': true,
        'on': this.state.showGridSizeMenu,
    });

    var selectSmallGridSizeClass = classnames({
        'memotest-tick-chosen-size': true,
        'hide': this.props.gridSize !== constants.SMALL_GRID_SIZE,
    });

    var selectMediumGridSizeClass = classnames({
        'memotest-tick-chosen-size': true,
        'hide': this.props.gridSize !== constants.MEDIUM_GRID_SIZE,
    });

    var selectLargeGridSizeClass = classnames({
        'memotest-tick-chosen-size': true,
        'hide': this.props.gridSize !== constants.LARGE_GRID_SIZE,
    });

    let srcIcon = icon
    if(this.state.showGridSizeMenu){
      srcIcon = iconOn
    }

    return (
      <div id="memotest-content">
        <Header title={localize('header_title')}/>
        <div id="menu" className={this.props.showTrivia ? "hide" : ""}>
          <button className={settingsBtnClass} onBlur={this.handleOnBlurGridMenu.bind(this)} onClick={this.openGridSizeMenu.bind(this)}>
            {localize('btn_grid_size')}
            <img src={srcIcon} alt=""/>
            <ul id="item-list" className={this.state.showGridSizeMenu ? "" : "hide"}>
              <li className="memotest-size size_1" onClick={this.changeGridSize.bind(this, constants.SMALL_GRID_SIZE)}>
                <a>
                  <img src={iconList} className={selectSmallGridSizeClass} alt=""/>
                  <span>{localize('small_grid_size')}</span> 
                </a>
              </li>
              <li className="memotest-size size_2" onClick={this.changeGridSize.bind(this, constants.MEDIUM_GRID_SIZE)}>
                <a>
                  <img src={iconList} className={selectMediumGridSizeClass} alt=""/>
                  <span>{localize('medium_grid_size')}</span>
                </a>
              </li>
              <li className="memotest-size size_3" onClick={this.changeGridSize.bind(this, constants.LARGE_GRID_SIZE)}>
                <a>
                  <img src={iconList} className={selectLargeGridSizeClass} alt=""/>
                  <span>{localize('large_grid_size')}</span>
                </a>
              </li>
            </ul>
          </button>
        </div>
        <Search hide={this.props.showTrivia}/>
        <Memotest/>
        <Trivia/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return appSelector(state);
}

function mapDispatchToProps(dispatch){
  return bindActionsToDispatch({
      selectGridSize: appActions.selectGridSize,
      intializeMemotest: appActions.intializeMemotest,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
