import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar';
import Logout from '../Logout';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="header-container">
        <img src="https://i.imgur.com/34axnfY.png" className="logo" alt="" />
        <SearchBar classNameLabel="wrap" />
        <nav>
          {!this.props.user.username && <Link exact to='/login'>Login</Link>}
        </nav>
        {this.props.user.username && < Logout />}
        {this.props.user.username}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersList
  }
}

export default connect(mapStateToProps, null)(Header)