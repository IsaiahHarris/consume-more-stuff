import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.css';
import Logout from '../Logout';
import SearchBar from '../SearchBar';

class Header extends React.Component {
  render() {
    return (
      <div className="header-container">
        <img src="https://i.imgur.com/34axnfY.png" className="logo" alt="" />
        <SearchBar classNameLabel="wrap" />
        {!this.props.user.username && <Link to="/login">Login</Link>}
        {!this.props.user.username && <Link to="/register">Register</Link>}
        {this.props.user.username && (
          <div className="welcome-user">
            Welcome, {this.props.user.username}
          </div>
        )}
        {this.props.user.username && <Logout />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersList
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
