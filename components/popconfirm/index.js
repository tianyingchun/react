import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
const prefixCls = 'popover';

if (process.env.BROWSER) {
  require('./popconfirm.less');
}
class Popconfirm extends Component {

  static defaultProps = {
    transitionName: '',
    placement: 'top',
    trigger: 'click',
    overlayStyle: {},
    onConfirm: function () {
    },
    onCancel: function () {
    }
  }

  state = {
    visible: false
  }

  confirm = () => {
    this.props.onConfirm.call(this);
    this.setState({
      visible: false
    });
  }

  cancel = () => {
    this.props.onCancel.call(this);
    this.setState({
      visible: false
    });
  }

  onVisibleChange = (v)=> {
    this.setState({
      visible: v
    });
  }

  render() {
    const overlay = (
      <div className={prefixCls + '-content'}>
        <p className={prefixCls + '-message'}>
          <i className="glyph-icon glyph-notification"></i>
          {this.props.title}
        </p>

        <div className={prefixCls + '-buttons'}>
          <button onClick={this.cancel} className="btn btn-default btn-xs">取 消</button>
          <button onClick={this.confirm} className="btn btn-primary btn-xs">确 定</button>
        </div>
      </div>
    );

    const transitionName = ({
      top: 'zoom-down',
      bottom: 'zoom-up',
      left: 'zoom-right',
      right: 'zoom-left'
    })[this.props.placement];

    return (
      <Tooltip placement={this.props.placement}
         overlayStyle={this.props.overlayStyle}
         prefixCls={prefixCls}
         onVisibleChange={this.onVisibleChange}
         transitionName={transitionName}
         visible={this.state.visible}
         trigger={this.props.trigger}
         overlay={overlay}>
        {this.props.children}
      </Tooltip>
    );
  }
}

export default Popconfirm;
