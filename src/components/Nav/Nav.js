import React, { Component } from 'react';
import './Nav.scss';

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="nav__site-title">Seent It</div>
        <div className="nav__controls">
          <ul>
            <li>Hello, {this.props.username}!</li>
            <li>
              <button onClick={this.props.logOut}>Log out</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
