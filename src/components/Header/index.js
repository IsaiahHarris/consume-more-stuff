import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkUser } from '../../actions';
import './Header.css';
import Logout from '../Logout';
import SearchBar from '../SearchBar';

class Header extends React.Component {
  render() {
    const { username } = this.props.user;
    console.log('Header render', username);
    let loginButton = null;

    if (username) {
      loginButton = (
        <div className="welcome-container">
          <div className="welcome-user">Welcome, {username}</div>
          <Logout />
        </div>
      );
    } else {
      loginButton = (
        <div className="welcome-container">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      );
    }

    return (
      <div className="header-container">
        <img src="https://i.imgur.com/34axnfY.png" className="logo" alt="" />
        <SearchBar classNameLabel="wrap" />
        {loginButton}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersList
  };
};

export default connect(mapStateToProps)(Header);

//this is commented out jsx header if i need it later

/* {!this.props.user.username && <Link to="/login">Login</Link>} */
/* {!this.props.user.username && <Link to="/register">Register</Link>} */
/* //   {this.props.user.username && (
      //     <div className="welcome-user">
      //       Welcome, {this.props.user.username}
      //     </div>
      //   )}
      //   {this.props.user.username && <Logout />} */
