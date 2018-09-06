import React from 'react';
import {connect} from 'react-redux';
class Settings extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>{this.props.user.username}'s Profile</div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    user: state.usersList
  }
}

export default connect(
  mapStateToProps,
  null
)(Settings);