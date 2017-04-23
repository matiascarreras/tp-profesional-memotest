import React, { Component } from 'react';
import './textButton.css';

class TextButton extends Component {

  render() {
    return (
      <button id={this.props.id} className={this.props.class} onClick={this.props.onClick}>{this.props.text}</button>
    );
  }
}

export default TextButton;
