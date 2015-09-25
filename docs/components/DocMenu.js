import React, { Component } from 'react';
import { Link } from 'react-router';
// const MenuItem = Menu.Item;
class DockMenu extends Component {
  render() {
    return (
      <ul className="nav nav-left-dock">
        <li className="nav-header">
          <span style={{color:'red'}}>布局相关</span>
        </li>
        <li><Link to="/docs/react/draggable" activeClassName="active">Draggable</Link></li>
        <li><Link to="/docs/react/menu" activeClassName="active">Menu</Link></li>
      </ul>
    );
  }
}

export default DockMenu;
