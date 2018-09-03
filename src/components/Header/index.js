import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar';
import Logout from '../Logout';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.user = localStorage.getItem('user');
  }

  // componentDidMount() {
  //   const user = localStorage.getItem('user')
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

export default Header;