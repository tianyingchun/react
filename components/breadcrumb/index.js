import React, { Component } from 'react';
import ClassNameMixin from '../../mixins/ClassNameMixin';
import mixin from '../../utils/mixin';
import classNames from 'classnames';

const BreadcrumbItem = class extends mixin(ClassNameMixin) {

  static propTypes = {
    active: React.PropTypes.bool,
    href: React.PropTypes.string,
    title: React.PropTypes.string,
    target: React.PropTypes.string
  }

  renderAnchor (classes) {
    return (
      <li {...this.props} className={classes}>
        <a
          href={this.props.href}
          title={this.props.title}
          target={this.props.target}>
          {this.props.children}
        </a>
      </li>
    );
  }

  render () {
    let classes = classNames(this.getClassSet(), this.props.className);

    if (this.props.href) {
      return this.renderAnchor(classes);
    }

    return (
      <li
        {...this.props}
        className={classes}>
        {this.props.children}
      </li>
    );
  }

}

class Breadcrumb extends mixin(ClassNameMixin) {

  static propTypes = {
    slash: React.PropTypes.bool,
    componentTag: React.PropTypes.node.isRequired
  }

  static defaultProps = {
    classPrefix: 'breadcrumb',
    componentTag: 'ul'
  }

  render () {
    let classes = this.getClassSet();
    let Component = this.props.componentTag;

    classes[this.prefixClass('slash')] = this.props.slash;
    return (
      <Component
        {...this.props}
        className={classNames(classes, this.props.className)}>
        {this.props.children}
      </Component>
    );
  }
}

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
