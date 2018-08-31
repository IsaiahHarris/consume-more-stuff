import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar';
import Button from '../Button';
class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="header-container">
        <img src="https://i.imgur.com/34axnfY.png" className="logo" alt="" />
        <SearchBar classNameLabel="wrap" />
        <Button label="Login" />
      </div>
    )
  }
}

export default Header;