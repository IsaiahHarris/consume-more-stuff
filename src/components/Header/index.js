import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar';
import Logout from '../Logout';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header-container">
        <img src="https://i.imgur.com/34axnfY.png" className="logo" alt="" />
        <SearchBar classNameLabel="wrap" />
        {!this.props.user.username && <Link to="/login">Login</Link>}
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
