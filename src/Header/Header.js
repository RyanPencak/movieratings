import './Header.css';
import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
        <div id="topOfPage" className="Header">
          <h1>Movie Rating Database</h1>
        </div>
    );
  }
}
