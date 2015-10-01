import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu, { SubMenu } from '../../src/components/menu';
import classNames from 'classnames';

// const MenuItem = Menu.Item;
class DockMenu extends Component {

  componentWillUpdate() {
    console.log('dockMenu....update.');
  }

  static propTypes = {
    component: React.PropTypes.string,
    group: React.PropTypes.string
  }

  static defaultProps = {
    component: 'flexlayout',
    group: 'layout'
  }

  state = {
    current: '',
    openKeys: []
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  }

  getMenuTitle (title, subTitle, iconName) {

    let iconClasses = {};

    if (iconName) {
      iconClasses["glyph-icon"] = true;
      iconClasses['glyph-'+iconName] = true
    }

    return (
      <span>
        { iconName ? <i className={classNames(iconClasses)}></i>: null}
        <span>{title}</span>
        <span className="menu-title-en">{subTitle}</span>
      </span>
    );
  }
  render() {
    let { group, component } = this.props;

    let openKeys = group ? [group] : this.state.openKeys;
    let selectedKeys = [this.state.current || component];

    return (
      <Menu onClick={this.handleClick} style={{width:'100%'}} defaultOpenKeys={openKeys} className="nav-left-dock " selectedKeys={selectedKeys} mode="inline">
        <SubMenu key="layout" title={this.getMenuTitle("布局相关","Layout")}>
          <Menu.Item key="flexlayout">
            <Link to="/docs/react/layout/flexlayout" activeClassName="active">
              {this.getMenuTitle("弹性布局素","FlexLayout")}
            </Link>
          </Menu.Item>
          <Menu.Item key="scrollarea">
            <Link to="/docs/react/layout/scrollarea" activeClassName="active">
              {this.getMenuTitle("滚动条","ScrollArea")}
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="elements" title={this.getMenuTitle("HTML元素","Elements")}>
          <Menu.Item key="button">
            <Link to="/docs/react/elements/button" activeClassName="active">
              {this.getMenuTitle('按钮', 'Button')}
            </Link>
          </Menu.Item>
          <Menu.Item key="draggable">
            <Link to="/docs/react/elements/draggable" activeClassName="active">
              {this.getMenuTitle('拖动部件', 'Draggable')}
            </Link>
          </Menu.Item>
          <Menu.Item key="message">
            <Link to="/docs/react/elements/message" activeClassName="active">
              {this.getMenuTitle('全局消息', 'Message')}
            </Link>
          </Menu.Item>
          <Menu.Item key="menu">
            <Link to="/docs/react/elements/menu" activeClassName="active">
              {this.getMenuTitle('导航菜单', 'Menu')}
            </Link>
          </Menu.Item>
          <Menu.Item key="tag">
            <Link to="/docs/react/elements/tag" activeClassName="active">
              {this.getMenuTitle('标签', 'Tag')}
            </Link>
          </Menu.Item>
          <Menu.Item key="select">
            <Link to="/docs/react/elements/select" activeClassName="active">
              {this.getMenuTitle('选择器', 'Select')}
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default DockMenu;
