import React, { Component } from 'react';
import './uploaderButton.css';

class UploaderButton extends Component {

  render() {
    return (
        <span className={this.props.class}>
            <img alt=""/>
            <span id={this.props.id}>{this.props.text}</span>
            <input type="hidden" id={this.props.name} name={this.props.name} value=""/>
        </span> 
    );
  }
}

export default UploaderButton;
