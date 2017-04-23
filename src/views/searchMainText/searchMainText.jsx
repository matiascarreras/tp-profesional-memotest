import React, { Component } from 'react';
import './searchMainText.css';
import FontPiece from '../../components/fontPiece/fontPiece'

class SearchMainText extends Component {

  render() {
    return (
        <div id="search-main-text" className={(this.props.hide)?'hide':''}>
            <FontPiece id="font1" fontId="1"/>
            <FontPiece id="font2" fontId="2"/>
            <FontPiece id="font3" fontId="3"/>
            <FontPiece id="font4" fontId="4"/>
            <FontPiece id="font5" fontId="5"/>
            <FontPiece id="font6" fontId="6"/>
            <FontPiece id="font7" fontId="7"/>
            <FontPiece id="font8" fontId="8"/>
            <FontPiece id="font9" fontId="9"/>
            <FontPiece id="font10" fontId="10"/>
        </div>
    );
  }
}

export default SearchMainText;
