import React from 'react';
import { Link } from 'react-router';
import RouteLink from './RouteLink';

class Header extends React.Component {

  render () {
    return (
      <header className= "topbar topbar-inverse">
        <div className="container">
          <h1 className="topbar-brand">
            <Link activeClassName="active" to="/docs">RUI Docs</Link>
          </h1>
          <ul className="nav nav-pills topbar-nav">
            <li><Link to="/docs/less" activeClassName="active">LESS UI</Link></li>
            <li><Link to="/docs/react" activeClassName="active">React UI</Link></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
