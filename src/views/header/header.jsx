import React, { Component } from 'react';
import './header.css';
import { localize } from '../../helpers/translator'

class Header extends Component {

  render() {
    return (
    	<div className="header">
    		<h1 className="header-title">
    	    	<span>{this.props.title}</span>
    			<span className="header-beta-title">{localize('header_beta_title')}</span>
    	    </h1>
    	</div>
    );
  }
}

export default Header;
