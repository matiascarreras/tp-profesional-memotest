import React, { Component } from 'react';
import './uploaderButton.css';

class UploaderButton extends Component {

  render() {
    return (
        <span onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut} className="uploadFile">
            <img src={this.props.icon} alt=""/>
            <span id={this.props.id}>{this.props.text}</span>
            <input type="hidden" id={this.props.name} name={this.props.name} value=""/>
        </span> 
    );
  }
}

export default UploaderButton;
