import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar';

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-title">CMS</div>
        <SearchBar classNameLabel="wrap" />
        <img src="https://i.imgur.com/v1Cc25c.png" className="logo" alt="" />
      </div>
    )
  }
}

export default Header;