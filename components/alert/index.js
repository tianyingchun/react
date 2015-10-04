import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import classNames from 'classnames';
import mixin from '../../utils/mixin';
import ClassNameMixin from '../../mixins/ClassNameMixin';

if (process.env.BROSWER) {
  require('./alert' + THEME + '.less');
}
class Alert extends mixin(ClassNameMixin){

  static propTypes = {
    classPrefix: React.PropTypes.string.isRequired,
    iStyle: React.PropTypes.oneOf(['secondary', 'success', 'warning', 'danger']),
    onClose: React.PropTypes.func
  }

  static defaultProps = {
    classPrefix: 'alert'
  }

  state = {
    closed: false,
    closing: true
  }

  handleClose = (e)=> {

    this.setState({
      closing: false
    });

    if (this.props.onClose) {
      this.props.onClose.call(this, e);
    }
  }

  animationEnd = () => {
    this.setState({
      closed: true,
      closing: true
    });
  }

  renderCloseBtn () {
    return (
      <button
        type='button'
        className={this.setClassNamespace('close')}
        onClick={this.handleClose}>
        &times;
      </button>
    );
  }
  render () {
    let classSet = this.getClassSet();
    let isCloseable = !!this.props.onClose;

    if (this.props.iStyle) {
      classSet[this.prefixClass(this.props.iStyle)] = true;
    }

    classSet[this.prefixClass('closeable')] = isCloseable;

    if (this.state.closed) {
      return null;
    } else {
      let alertHtml = (
        <div
          {...this.props}
          visible={this.state.closing}
          className={classNames(this.props.className, classSet)}>
          {isCloseable ? this.renderCloseBtn() : null}
          {this.props.children}
        </div>
      );
      if (isCloseable) {
        return (
          <Animate
            component=""
            showProp="visible"
            transitionName="fade"
            onEnd={this.animationEnd}>
            {alertHtml}
          </Animate>
        );
      } else {
        return (
          alertHtml
        );
      }
    }
  }
}

export default Alert;
