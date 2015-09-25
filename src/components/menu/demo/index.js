import React, { Component } from 'react';
import Menu, { SubMenu, Item as MenuItem } from '../index';

// const MenuItem = Menu.Item;
class DockMenu extends Component {
  state = {
    current: 'mail',
    current1: '1'
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  }
   handleClick1 = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  }

  render() {
    return (
      <div className="container">
        <h2>`horizontal` mode</h2>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="mail">
            <i className="glyph-icon glyph-comment"></i>导航一
          </Menu.Item>
          <Menu.Item key="app">
            <i className="glyph-icon glyph-comment"></i>导航二
          </Menu.Item>
          <SubMenu title={<span><i className="glyph-icon glyph-comment"></i>导航 - 子菜单</span>}>
            <Menu.Item key="setting:1">选项1</Menu.Item>
            <Menu.Item key="setting:2">选项2</Menu.Item>
            <Menu.Item key="setting:3">选项3</Menu.Item>
            <Menu.Item key="setting:4">选项4</Menu.Item>
          </SubMenu>
          <Menu.Item key="alipay">
            <a href="http://www.alipay.com/" target="_blank">导航四 - 链接</a>
          </Menu.Item>
        </Menu>
        <h2>`inline` Mode</h2>
        <Menu onClick={this.handleClick1} style={{width:240}} defaultOpenKeys={['sub1']} selectedKeys={[this.state.current1]} mode="inline">
          <SubMenu key="sub1" title={<span><i className="anticon anticon-mail"></i><span>导航一</span></span>}>
            <Menu.Item key="1">选项1</Menu.Item>
            <Menu.Item key="2">选项2</Menu.Item>
            <Menu.Item key="3">选项3</Menu.Item>
            <Menu.Item key="4">选项4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><i className="anticon anticon-appstore"></i><span>导航二</span></span>}>
            <Menu.Item key="5">选项5</Menu.Item>
            <Menu.Item key="6">选项6</Menu.Item>
            <SubMenu key="sub3" title="三级导航">
              <Menu.Item key="7">选项7</Menu.Item>
              <Menu.Item key="8">选项8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><i className="anticon anticon-setting"></i><span>导航三</span></span>}>
            <Menu.Item key="9">选项9</Menu.Item>
            <Menu.Item key="10">选项10</Menu.Item>
            <Menu.Item key="11">选项11</Menu.Item>
            <Menu.Item key="12">选项12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default DockMenu;
