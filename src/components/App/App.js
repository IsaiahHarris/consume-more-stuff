import React, { Component } from 'react';

import './App.css';
import Header from '../Header'
import SearchBar from '../SearchBar';
import Row from '../Row';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar classNameLabel="mobile-search-bar" />
        <Row />
      </div>
    );
  }
}

export default App;
