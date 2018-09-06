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
      password: 'password',
      passwordError: '',
      usernameError: '',
    };

    this.inputChange = this.inputChange.bind(this);
    this.register = this.register.bind(this);
    this.validation = this.validation.bind(this);
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

  validation(event) {
    if (event.target.name === 'username' && !this.state.username) {
      let usernameError = 'Username Is Required To Register'
      this.setState({
        usernameError: usernameError
      })
    }

    if (event.target.name === 'password' && !this.state.password) {
      let passwordError = 'Password Is Required To Register'
      this.setState({
        passwordError: passwordError
      })
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
            onBlur={this.validation}
          />
          <div className="error">{this.state.usernameError}</div>
          <input
            type="text"
            name="email"
            placeholder="email (optional)"
            onChange={this.inputChange}
            onBlur={this.validation}
          />
          <input
            type="text"
            name="password"
            placeholder={this.state.password}
            onChange={this.inputChange}
            onBlur={this.validation}
          />
          <div className="error">{this.state.passwordError}</div>
          <button className="btn" onClick={this.register} disabled={!this.state.password || !this.state.username}>
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
