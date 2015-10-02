import React, { Component } from 'react';
import classNames from 'classnames';
import mixin from '../../utils/mixin';
import ClassNameMixin from '../../mixins/ClassNameMixin';

class Table extends mixin(ClassNameMixin) {

  static propTypes = {
    classPrefix: React.PropTypes.string.isRequired,
    bordered: React.PropTypes.bool,
    compact: React.PropTypes.bool,
    hover: React.PropTypes.bool,
    striped: React.PropTypes.bool,
    radius: React.PropTypes.bool,
    centered: React.PropTypes.bool,
    responsive: React.PropTypes.bool
  }

  static defaultProps = {
    classPrefix: 'table'
  }

  render () {
    let classSet = this.getClassSet();
    let responsive = this.props.responsive;

    classSet[this.prefixClass('bordered')] = this.props.bordered;
    classSet[this.prefixClass('compact')] = this.props.compact;
    classSet[this.prefixClass('hover')] = this.props.hover;
    classSet[this.prefixClass('striped')] = this.props.striped;
    classSet[this.prefixClass('radius')] = this.props.radius;
    classSet[this.prefixClass('centered')]= this.props.centered;

    // add `.text-nowrap` to responsive table
    classSet[this.setClassNamespace('text-nowrap')] = responsive;

    let table = (
      <table
        {...this.props}
        className={classNames(this.props.className, classSet)}>
        {this.props.children}
      </table>
    );

    return responsive ? (
      <div className={this.setClassNamespace('scrollable-horizontal')}>
        {table}
      </div>
    ) : table;
  }
}

export default Table;
