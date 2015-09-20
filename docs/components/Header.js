import React, { Component } from 'react';
import { Link } from 'react-router';
import RouteLink from './RouteLink';

class Header extends Component {

  render () {
    return (
      <header className= "topbar topbar-inverse">
        <div className="container">
          <h1 className="topbar-brand">
            <Link activeClassName="active" to="/docs">RUI Docs</Link>
          </h1>
          <ul className="nav nav-pills topbar-nav">
            <RouteLink to="/docs/less">LESS UI</RouteLink>
            <RouteLink to="/docs/react">React UI</RouteLink>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
