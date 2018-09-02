import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';
import Button from '../Button';

class Logout extends Component {
  constructor(props) {
    super(props);

    this.clickEvent = this.clickEvent.bind(this);
  }
  
  clickEvent() {
    console.log('log out smoke test');
  }

  render() {
    return (
      <div className='logout-container'>
      <Button label="Logout" clickHandler={ this.clickEvent } />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  console.log('mapDispatchToProps ACTIVATED');
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  }
}

export default connect(null, mapDispatchToProps)(Logout);