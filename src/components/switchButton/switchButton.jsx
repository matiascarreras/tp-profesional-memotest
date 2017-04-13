import React, { Component } from 'react';
import './switchButton.css';

class SwitchButton extends Component {

  render() {
    return (
    	<label className="switch-button">
  			<input type="checkbox" onClick={this.props.onClick}/>
  			<div className="slider round"></div>
			<span className="switch-button-label">{this.props.text}</span>	
		</label>
    );
  }
}

export default SwitchButton;
