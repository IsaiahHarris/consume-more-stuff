import React, { Component } from 'react';

import './App.css';
import Header from '../Header'
import SearchBar from '../SearchBar';
import Card from '../Card'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar classNameLabel="mobile-search-bar" />
        <Card />
      </div>
    );
  }
}

export default App;
