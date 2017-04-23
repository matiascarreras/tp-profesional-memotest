import React, { Component } from 'react';
import './itemList.css';

class ItemList extends Component {

    constructor(){
      super()
      this.state = {
        showList: false,
      }
    }

    showList(){
      this.setState({showList:!this.state.showList})
    }

    render() {

        var classNames = require('classnames');

        var settingsBtnClass = classNames({
            'button-icon': true,
            'on': this.state.showList,
        });

        let srcIcon = this.props.icon
        if(this.state.showList){
            srcIcon = this.props.iconOn
        }

        let listArray = []
        
        for (var i = 0; i < this.props.list.length; i++) {
             listArray.push(
                <li className={this.props.classList} id={this.props.list[i].id} onClick={this.props.list[i].onClick}>
                  <a>
                    <img src={this.props.iconList} className={this.props.iconListClass} alt=""/>
                    <span>{this.props.list[i].text}</span> 
                  </a>
                </li>
             )
         }

    	return (
        	<li className={settingsBtnClass} onClick={this.showList.bind(this)}>
                {this.props.text}
                <img src={srcIcon} alt=""/>
            	<ul id="item-list" className={this.state.showList ? "" : "hide"}>
                    {listArray}
            	</ul>
            </li>
        );
    }
}

export default ItemList;
