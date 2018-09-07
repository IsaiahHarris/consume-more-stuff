import React from 'react';
import { connect } from 'react-redux';
import { editPassword } from '../../actions';
import './Settings.css';
class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassInput: '',
      newPassInput: '',
      oldPassError: '',
      newPassError: ''
    };

    this.editThisPassword = this.editThisPassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  handleInputChange(event) {
    switch (event.target.id) {
      case 'oldPass':
        this.setState({ oldPassInput: event.target.value });
        break;
      case 'newPass':
        this.setState({ newPassInput: event.target.value });
        break;
      default:
        break;
    }
  }

  editThisPassword() {
    const data = {};
    data.oldPass = this.state.oldPassInput;
    data.newPass = this.state.newPassInput;
    this.props.editPassword(data);
    this.setState({
      oldPassInput: '',
      newPassInput: '',
      message: 'password changed!, please login again'
    });
  }

  render() {
    return (
      <div className="main-settings-container">
      <div className="settings-container">
      
        <div className="header">
          {this.props.user.username}
          's profile
        </div>
        <div className="password-setting-container">
          <div className="password-container">
            <label htmlFor="oldPass">Current Password: </label>
            <input
              type="password"
              name="oldPass"
              id="oldPass"
              value={this.state.oldPassInput}
              onChange={this.handleInputChange}
              className="settings-input"
            />
          </div>
          <div className="password-container">
            <label htmlFor="newPass">New Password: </label>
            <input
              type="password"
              name="newPass"
              id="newPass"
              value={this.state.newPassInput}
              onChange={this.handleInputChange}
              className="settings-input"
            />
          </div>
        </div>
        <button onClick={this.editThisPassword}> Change Password </button>
        {this.state.message}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersList
  };
};

const mapDipatchToProps = dispatch => {
  return {
    editPassword: password => {
      dispatch(editPassword(password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(Settings);
