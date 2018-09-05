import React, { Component } from 'react';

import './App.css';
import Header from '../Header';
import SearchBar from '../SearchBar';
import MainContainer from '../MainContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser, LOGIN } from '../../actions';

class App extends Component {

  componentDidMount() {
    console.log('this.props', this.props);
    if (localStorage.user) {
      this.props.dispatch({
        type: LOGIN,
        user: { username: localStorage.user }
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar classNameLabel="mobile-search-bar" />
        <MainContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersList.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));