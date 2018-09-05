import React, { Component } from 'react';

import './App.css';
import Header from '../Header';
import SearchBar from '../SearchBar';
import MainContainer from '../MainContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser, LOGIN, checkUser } from '../../actions';

class App extends Component {

  componentDidMount() {
    this.props.checkUser()

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
    checkUser: () => {
      dispatch(checkUser())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));