import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // tracks username and password locally
      username: 'username',
      email: 'email',
      password: 'password'
    };

    this.inputChange = this.inputChange.bind(this);
    this.register = this.register.bind(this);
  }

  inputChange(event) {
    // tracks login form input
    switch (event.target.name) {
      case 'username':
        this.setState({ username: event.target.value });
        break;
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  }

  // Send http request with registration data to backend
  register() {
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    console.log('Registration method');

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    return (
      <div>
        {/* { this.renderRedirect() } */}
        <div className="register-container">
          <h1>Register</h1>
          <input
            type="text"
            name="username"
            placeholder={this.state.username}
            onChange={this.inputChange}
          />
          <input
            type="text"
            name="email"
            placeholder={this.state.email}
            onChange={this.inputChange}
          />
          <input
            type="text"
            name="password"
            placeholder={this.state.password}
            onChange={this.inputChange}
          />
          <button className="btn" onClick={this.register}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    registerUser: (user, history) => {
      dispatch(registerUser(user, history));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
