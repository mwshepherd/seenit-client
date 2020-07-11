import React, { Component } from 'react';
import '../Homepage/Homepage.scss';
import { backendServer } from '../../shared/constants';

class Homepage extends Component {
  state = { username: '', email: '', password: '', errMessage: '', login: true };

  showLogIn = () => {
    this.setState({ login: true });
  };

  showSignUp = () => {
    this.setState({ login: false });
  };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  handleUserSignUp = async (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    const body = {
      user: { username, email, password },
    };

    console.log(body);

    try {
      const response = await fetch(`${backendServer}/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw new Error('incorrect credentials');
      }

      this.onFormSubmit(event);
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const body = {
      auth: { email, password },
    };
    try {
      const response = await fetch(`${backendServer}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (response.status >= 400) {
        throw new Error('incorrect credentials');
      } else {
        const { jwt } = await response.json();
        localStorage.setItem('token', jwt);
        this.props.history.push('/dashboard');
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  };

  render() {
    const { username, email, password, errMessage } = this.state;
    return (
      <div className="container">
        <div className="sign-in-form">
          <div className="site-title">Seen·It·</div>
          <div className="user-auth-btns">
            <h1 onClick={this.showLogIn} className={this.state.login ? 'active' : null}>
              Login
            </h1>
            <h1 onClick={this.showSignUp} className={!this.state.login ? 'active' : null}>
              Signup
            </h1>
          </div>

          {errMessage && <span>{errMessage}</span>}

          {this.state.login && (
            <form onSubmit={this.onFormSubmit}>
              <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={this.onInputChange} />
              <input type="password" name="password" id="password" value={password} placeholder="Password" onChange={this.onInputChange} />
              <input type="submit" value="Login" />
            </form>
          )}

          {!this.state.login && (
            <form onSubmit={this.handleUserSignUp}>
              <input type="text" name="username" id="username" value={username} placeholder="Username" onChange={this.onInputChange} />
              <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={this.onInputChange} />
              <input type="password" name="password" id="password" value={password} placeholder="Password" onChange={this.onInputChange} />
              <input type="submit" value="Signup" />
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Homepage;
