import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../Button';

class Logout extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='logout-container'>
      <Button label="Logout" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  // console.log('mapDispatchToProps ACTIVATED');
  // return {
  //   addUser: user => {
  //     dispatch(addUser(user));
  //   }
  // }
}

export default connect(null, mapDispatchToProps)(Logout);