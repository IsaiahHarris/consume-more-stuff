import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar';
import Logout from '../Logout';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   user: localStorage.getItem('user')
    // }
  }

  // componentDidMount() {
  //   this.props.loadUser()
  // }

  render() {
    console.log('this.props.user.user', this.props.user);
    return (
      <div className="header-container">
        <img src="https://i.imgur.com/34axnfY.png" className="logo" alt="" />
        <SearchBar classNameLabel="wrap" />
        <nav>
          <Link exact to='/login'>Login</Link>
        </nav>
        <Logout />
        {this.props.user[0]}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersList
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     loadUser: user => {
//       dispatch(loadUser(user))
//     }
//   }
// }

export default connect(mapStateToProps, null)(Header)