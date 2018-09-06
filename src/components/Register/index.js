import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // tracks username and password locally
      username: '',
      email: '',
      password: '',
      passwordError: '',
      usernameError: '',
      emailError: ''
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
      let usernameError = 'Username Is Required To Register';
      this.setState({
        usernameError: usernameError
      });
    }

    if (event.target.name === 'password' && !this.state.password) {
      let passwordError = 'Password Is Required To Register';
      this.setState({
        passwordError: passwordError
      });
    }

    if (
      event.target.name === 'email' &&
      (!this.state.email.includes('@') && !this.state.email)
    ) {
      let emailError = 'Email Is Required To Register';
      this.setState({ emailError: emailError });
    }
  }
  // Send http request with registration data to backend
  register() {
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const { email, password, username } = this.state;
    let isEnabled =
      username.length > 0 &&
      password.length > 0 &&
      email.length > 0 &&
      email.includes('a');

    return (
      <div>
        <div className="register-container">
          <div className="error-message-container">
            {this.props.error.error && (
              <div className="error-message">
                User already exists under that email or username
              </div>
            )}
          </div>

          <h1>Register</h1>
          <input
            type="text"
            name="username"
            placeholder={this.state.username}
            onChange={this.inputChange}
            onBlur={this.validation}
            value={this.state.username}
          />
          {!isEnabled && this.state.usernameError ? (
            <div className="error">{this.state.usernameError}</div>
          ) : (
            ''
          )}
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={this.inputChange}
            onBlur={this.validation}
            value={this.state.email}
          />
          {!isEnabled && this.state.emailError ? (
            <div className="error">{this.state.emailError}</div>
          ) : (
            ''
          )}
          <input
            type="text"
            name="password"
            placeholder={this.state.password}
            onChange={this.inputChange}
            onBlur={this.validation}
            value={this.state.password}
          />
          {!isEnabled && this.state.passwordError ? (
            <div className="error">{this.state.passwordError}</div>
          ) : (
            ''
          )}
          <button className="btn" onClick={this.register} disabled={!isEnabled}>
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

const mapStateToProps = state => {
  return {
    error: state.usersList
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
