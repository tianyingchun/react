import React, { Component } from 'react';
import RcMenu from 'rc-menu';
import platform from '../../utils/platform';

let { msie, version } = platform;
let disableVelocityAnimation = (msie && parseInt(version) < 9);

let animation;
if (process.env.BROWSER) {
  require('./menu.less');
  // ie9+
  if(!disableVelocityAnimation) {
    animation = require('../core/openAnimation');
  }
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
        openAnimation = animation;
        if (disableVelocityAnimation) {
          openAnimation = '';
        }
        break;
      default:
    }

    if (this.props.mode === 'inline') {
      if (disableVelocityAnimation) {
        return <RcMenu {...this.props} openTransitionName={openAnimation} />;
      } else {
        return <RcMenu {...this.props} openAnimation={openAnimation} />;
      }
    } else {
      return <RcMenu {...this.props} openTransitionName={openAnimation} />;
    }
  }
}

Menu.Divider = RcMenu.Divider;
Menu.Item = RcMenu.Item;
Menu.SubMenu = RcMenu.SubMenu;

export default Menu;
