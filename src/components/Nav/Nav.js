import React, { Component } from 'react';
import './Nav.scss';

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="nav__site-title">Seent It</div>
        <div className="nav__controls">
          <ul>
            <li>Log in</li>
            <li>Log out</li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
