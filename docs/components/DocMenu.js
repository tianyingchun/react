import React, { Component } from 'react';
// import Menu from '../../src/components/menu/Menu';
// import MenuItem from '../../src/components/menu/MenuItem';

import Menu, { SubMenu, Item as MenuItem } from '../../src/components/menu';

// const MenuItem = Menu.Item;
class DockMenu extends Component {
  render () {
    return (
      <Menu>
        <SubMenu key="sub1" title={<span><i className="anticon anticon-mail"></i><span>导航一</span></span>}>
          <MenuItem key="1">选项1</MenuItem>
          <MenuItem key="2">选项2</MenuItem>
          <MenuItem key="3">选项3</MenuItem>
          <MenuItem key="4">选项4</MenuItem>
        </SubMenu>
        <SubMenu key="sub2" title={<span><i className="anticon anticon-appstore"></i><span>导航二</span></span>}>
          <MenuItem key="5">选项5</MenuItem>
          <MenuItem key="6">选项6</MenuItem>
          <SubMenu key="sub3" title="三级导航">
            <MenuItem key="7">选项7</MenuItem>
            <MenuItem key="8">选项8</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
    );
  }
}

export default DockMenu;
