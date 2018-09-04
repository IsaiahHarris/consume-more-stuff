import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar';
import Logout from '../Logout';
import { NavLink } from 'react-router-dom';
import { loadUser } from '../../actions';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.user = localStorage.getItem('user');
  }

  // componentDidMount() {
  //   this.props.loadUser()
  // }

  render() {
    return (
      <div className="header-container">
        <img src="https://i.imgur.com/34axnfY.png" className="logo" alt="" />
        <SearchBar classNameLabel="wrap" />
        <nav>
          <NavLink exact to='/login'>Login</NavLink>
        </nav>
        <Logout />
        {localStorage.getItem('user') ? localStorage.getItem('user') : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    user: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: user => {
      dispatch(loadUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)