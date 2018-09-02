import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar';
import Button from '../Button';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="header-container">
        <img src="https://i.imgur.com/34axnfY.png" className="logo" alt="" />
        <SearchBar classNameLabel="wrap" />
        {/* <Button label="Login" /> */}
        <nav>
        <NavLink exact to='/login'>Login</NavLink>
        </nav>
      </div>
    )
  }
}

export default Header;