import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar';
import Button from '../Button';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="header-container">
        <img src="https://i.imgur.com/34axnfY.png" className="logo" alt="" />
        <SearchBar classNameLabel="wrap" />
        <div className="button-container">
          <div className="header-button">
            <Button label="Login" />
          </div>
          <div className="header-button">
            <Link to={'/'}>
              <Button label="Back" />
            </Link>
          </div>

        </div>

      </div >
    )
  }
}

export default Header;