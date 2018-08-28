import React from 'react';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="header">
        <img src="../assets/ghost_filler_logo.png " alt="" />
        <div className="header-title">CMS</div>
      </div>
    )
  }
}

export default Header;