import React, { Component } from 'react';
import RcMenu from 'rc-menu';
// import animation from '../common/openAnimation';
if (process.env.BROWSER) {
  require('./menu.less');
}
class Menu extends Component {
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
        // openAnimation = animation;
        break;
      default:
    }
    if (this.props.mode === 'inline') {
      return <RcMenu {...this.props} openAnimation={openAnimation} />;
    } else {
      return <RcMenu {...this.props} openTransitionName={openAnimation} />;
    }
  }
}


Menu.Divider = RcMenu.Divider;
Menu.Item = RcMenu.Item;
Menu.SubMenu = RcMenu.SubMenu;

export default Menu;
