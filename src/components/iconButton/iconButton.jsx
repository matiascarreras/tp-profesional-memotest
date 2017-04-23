import React, { Component } from 'react';
import './iconButton.css';

class IconButton extends Component {

  render() {
    return (
    	<button className={this.props.class} onClick={this.props.onClick}>
    		{this.props.text}
    		<img src={this.props.icon} alt=""/>
    	</button>
    );
  }
}

export default IconButton;
