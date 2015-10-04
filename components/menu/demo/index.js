import React, { Component } from 'react';
import Menu, { SubMenu, Item as MenuItem } from '../index';

// const MenuItem = Menu.Item;
class MenuDemo extends Component {
  state = {
    current: 'mail',
    current1: '1',
    openKeys: []
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
      current1: e.key
    });
  }

  onToggle = (info) =>{
    this.setState({
      openKeys: info.openKeys
    });
  }

  handleClick2 = (e) => {
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1)
    });
  }
  handleClick3 = (e) => {
    console.log('click ', e);
  }

  render() {
    return (
      <div className="doc-content">
        <h1>Menu 导航菜单</h1>
        <p>为页面和功能提供导航的菜单列表。</p>
        <hr />
        <h2>何时使用</h2>
        <p>导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。</p>
        <h2>组件演示</h2>
        <h3>水平的顶部导航菜单。</h3>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="mail">
            <i className="glyph-icon glyph-star-full"></i>导航一
          </Menu.Item>
          <Menu.Item key="app">
            <i className="glyph-icon glyph-star-full"></i>导航二
          </Menu.Item>
          <SubMenu title={<span><i className="glyph-icon glyph-star-full"></i>导航 - 子菜单</span>}>
            <Menu.Item key="setting:1">选项1</Menu.Item>
            <Menu.Item key="setting:2">选项2</Menu.Item>
            <Menu.Item key="setting:3">选项3</Menu.Item>
            <Menu.Item key="setting:4">选项4</Menu.Item>
          </SubMenu>
          <Menu.Item key="alipay">
            <a href="http://www.alipay.com/" target="_blank">导航四 - 链接</a>
          </Menu.Item>
        </Menu>
        <h3>垂直菜单，子菜单内嵌在菜单区域。</h3>
        <Menu onClick={this.handleClick1} style={{width:240}} defaultOpenKeys={['sub1']} selectedKeys={[this.state.current1]} mode="inline">
          <SubMenu key="sub1" title={<span><i className="glyph-icon glyph-star-full"></i><span>导航一</span></span>}>
            <Menu.Item key="1">选项1</Menu.Item>
            <Menu.Item key="2">选项2</Menu.Item>
            <Menu.Item key="3">选项3</Menu.Item>
            <Menu.Item key="4">选项4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><i className="glyph-icon glyph-star-full"></i><span>导航二</span></span>}>
            <Menu.Item key="5">选项5</Menu.Item>
            <Menu.Item key="6">选项6</Menu.Item>
            <SubMenu key="sub3" title="三级导航">
              <Menu.Item key="7">选项7</Menu.Item>
              <Menu.Item key="8">选项8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><i className="glyph-icon glyph-star-full"></i><span>导航三</span></span>}>
            <Menu.Item key="9">选项9</Menu.Item>
            <Menu.Item key="10">选项10</Menu.Item>
            <Menu.Item key="11">选项11</Menu.Item>
            <Menu.Item key="12">选项12</Menu.Item>
          </SubMenu>
        </Menu>
        <h3>点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。</h3>
        <Menu onClick={this.handleClick2}
             style={{width:240}}
             openKeys={this.state.openKeys}
             onOpen={this.onToggle}
             onClose={this.onToggle}
             selectedKeys={[this.state.current]}
             mode="inline">
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
        <h3>子菜单是弹出的形式。</h3>
        <Menu onClick={this.handleClick3} style={{width:240}} mode="vertical">
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
          <SubMenu key="sub4" title={<span><i className="anticon anticon-setting"></i><span>导航三</span></span>}>
            <MenuItem key="9">选项9</MenuItem>
            <MenuItem key="10">选项10</MenuItem>
            <MenuItem key="11">选项11</MenuItem>
            <MenuItem key="12">选项12</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default MenuDemo;
