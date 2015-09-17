import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  render () {
    return (
      <div>
        <div className="header">
           <ul>
            <li><Link to="/workspace/list">Workspace list page</Link></li>
            <li><Link to="/workspace/m/cc4253962f044394bf476041c2328915">Member admin page</Link></li>
            <li><Link to="/workspace/m/cc4253962f044394bf476041c2328915/admin">Member normal page</Link></li>
          </ul>
        </div>
        <div className="body">
        { this.props.children }
        </div>
      </div>
    );
  }
}

export default Header;
