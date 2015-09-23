import React, { Component } from 'react';
import Menu from 'rc-menu';
import animation from '../../utils/openAnimation';
class ZMenu extends Component {

  static defaultProps = {
    prefixCls: 'menu'
  }

  render () {
    let openAnimation = '';
    switch (this.props.mode) {
    case 'horizontal':
      openAnimation = 'slide-up';
      break;
    case 'vertical':
      openAnimation = 'zoom-big';
      break;
    case 'inline':
      openAnimation = animation;
      break;
    default:
    }

    if (this.props.mode === 'inline') {
      return <Menu {...this.props} openAnimation={openAnimation} />;
    } else {
      return <Menu {...this.props} openTransitionName={openAnimation} />;
    }
  }
}

ZMenu.Divider = Menu.Divider;
ZMenu.Item = Menu.Item;
ZMenu.SubMenu = Menu.SubMenu;

export default ZMenu;
