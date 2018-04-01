import React, { Component } from 'react';
import Header from '../Header/Header.js';
import Ratings from '../Ratings/Ratings.js';

class App extends Component {

  componentDidMount() {
    document.title = "Movie Ratings";
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Ratings />
      </div>
    );
  }
}

export default App;
