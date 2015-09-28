import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';

if (process.env.BROWSER) {
  require('./tag.less');
}

class Tag extends Component {

  static defaultProps = {
    prefixCls: 'tag',
    closable: false,
    amStyle: 'default',
    onClose: function() {}
  }

  static propTypes = {
    closale: React.PropTypes.bool,
    // default: 'default',
    // primary: 'primary',
    // secondary: 'secondary',
    // success: 'success',
    // warning: 'warning',
    // danger: 'danger'
    amStyle:  React.PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'danger']),
    onClose: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      closing: false,
      closed: false
    };
  }

  close(e) {
    let dom = ReactDOM.findDOMNode(this);
    dom.style.width = dom.offsetWidth + 'px';
    // It's Magic Code, don't know why
    dom.style.width = dom.offsetWidth + 'px';
    this.setState({
      closing: true
    });
    this.props.onClose.call(this, e);
  }

  animationEnd() {
    this.setState({
      closed: true,
      closing: false
    });
  }

  render() {
    let close = this.props.closable
      ? <i className="glyph-icon glyph-cancel-circle" onClick={this.close.bind(this)}></i>
      : '';

    let themeClass = this.props.amStyle ? this.props.prefixCls + '-' + this.props.amStyle : '';
    let className = this.props.prefixCls + ' ' + themeClass;
    className = this.state.closing ? className + ' ' + this.props.prefixCls + '-close' : className;

    return (
      this.state.closed
      ? null
      : <Animate component=""
                 showProp="data-show"
                 transitionName="zoom-tag"
                 onEnd={this.animationEnd.bind(this)}>
          <div data-show={!this.state.closing} className={className}>
            <a className={this.props.prefixCls + '-text'} {...this.props} />
            {close}
          </div>
        </Animate>
    );
  }
}

export default Tag;
