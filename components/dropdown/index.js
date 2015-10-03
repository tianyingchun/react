import React, { Component } from 'react';
import RcDropdown from 'rc-dropdown';

if (process.env.BROWSER) {
  require('./dropdown.less');
}
class Dropdown extends Component {

  static defaultProps = {
    transitionName: 'slide-up',
    prefixCls: 'dropdown'
  }

  render() {
    return <RcDropdown {...this.props} />;
  }
}

export default Dropdown;
