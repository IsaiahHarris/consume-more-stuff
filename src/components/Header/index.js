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
        <img src="https://seeklogo.com/images/K/koenigsegg-ghost-logo-AA4DCF1CD8-seeklogo.com.png" className="logo" alt="" />
      </div>
    )
  }
}

export default Header;