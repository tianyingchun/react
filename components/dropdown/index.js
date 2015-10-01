import react, { Component } from 'react';

export default class extends Component {

  static defaultProps = {
    transitionName: 'slide-up',
    prefixCls: 'ant-dropdown'
  }

  render() {
    return <Dropdown {...this.props} />;
  }
}
