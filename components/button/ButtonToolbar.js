import React, { Component } from 'react';
import classNames from 'classnames';
import mixin from '../../utils/mixin';
import ClassNameMixin from '../../mixins/ClassNameMixin';

class ButtonToolbar extends mixin (ClassNameMixin) {

  static propTypes = {
    classPrefix: React.PropTypes.string.isRequired
  }

  static defaultProps = {
     classPrefix: 'btn-toolbar'
  }

  render () {
    let classSet = this.getClassSet();

    return (
      <div
        {...this.props}
        className={classNames(this.props.className, classSet)}>
        {this.props.children}
      </div>
    );
  }
}

export default ButtonToolbar;
