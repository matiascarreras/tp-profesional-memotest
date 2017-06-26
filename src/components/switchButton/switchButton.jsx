import React, { Component } from 'react';
import './switchButton.css';

class SwitchButton extends Component {

	constructor(){
	  super()
	  this.state = {
	    isChecked: null
	  }
	}

	componentDidMount(){
		debugger
		this.setState({isChecked: this.props.isChecked})
	}

	handleOnChange(){
		this.setState({isChecked: !this.state.isChecked})
	}

	render() {
    	return (
	    	<label className="switch-button">
	  			<input type="checkbox" checked={this.state.isChecked} onChange={this.handleOnChange.bind(this)} onClick={this.props.onClick}/>
	  			<div className="slider round"></div>
				<span className="switch-button-label">{this.props.text}</span>	
			</label>
	    );
	}
}

export default SwitchButton;
