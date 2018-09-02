import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar';
import Logout from '../Logout';
import { NavLink } from 'react-router-dom';
const user = localStorage.getItem('user') ? localStorage.getItem('user') : null

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
          <NavLink exact to='/login'>Login</NavLink>
        </nav>
        <Logout />
        {user}


      </div>
    )
  }
}

export default Header;