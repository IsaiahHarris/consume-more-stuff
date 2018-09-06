import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';

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
    if (
      event.target.name === 'email' &&
      !this.state.email.includes('@') &&
      this.state.email
    ) {
      let emailError = 'Must Be A Valid Email';
      this.setState({ emailError: emailError });
    } else if (event.target.name === 'email' && this.state.email.length === 0) {
      this.setState({ emailError: '' });
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
    let isEnabled = username.length > 0 && password.length > 0;
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
            value={this.state.username}
          />
          <div className="error">{this.state.usernameError}</div>
          <input
            type="text"
            name="email"
            placeholder="email (optional)"
            onChange={this.inputChange}
            onBlur={this.validation}
            value={this.state.email}
          />
          {this.state.emailError.length > 0 && (
            <div className="error">{this.state.emailError}</div>
          )}
          <input
            type="text"
            name="password"
            placeholder={this.state.password}
            onChange={this.inputChange}
            onBlur={this.validation}
            value={this.state.password}
          />
          <div className="error">{this.state.passwordError}</div>
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

export default connect(
  null,
  mapDispatchToProps
)(Register);
