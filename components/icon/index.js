import React, { Component } from 'react';
import classNames from 'classnames';
import mixin from '../../utils/mixin';
import ClassNameMixin from '../../mixins/ClassNameMixin';

class Icon extends mixin(ClassNameMixin) {

  static propTypes = {
    iStyle: React.PropTypes.string,
    iSize: React.PropTypes.string,
    fw: React.PropTypes.bool,
    spin: React.PropTypes.bool,
    button: React.PropTypes.bool,
    href: React.PropTypes.string,
    componentTag: React.PropTypes.node.isRequired,
    icon: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    classPrefix: 'glyph',
    componentTag: 'i'
  }

  render () {
    let classes = this.getClassSet(true);
    let props = this.props;
    let Component = props.href ? 'a' : props.componentTag;
    let prefixClass = this.prefixClass;
    let setClassNamespace = this.setClassNamespace;

    //glyph-icon
    classes['glyph-icon'] = true;

    // glyph-[iconName]
    classes[prefixClass(props.icon)] = true;

    // glyph-btn
    classes[prefixClass('btn')] = props.button;

    // button style
    props.button && props.iStyle && (classes[setClassNamespace(props.iStyle)] = true);

    // glyph-fw
    classes[prefixClass('fw')] = props.fw;

    // glyph-spin
    classes[prefixClass('spin')] = props.spin;

    return (
      <Component
        {...props}
        className={classNames(classes, this.props.className)}>
        {this.props.children}
      </Component>
    );
  }
}

export default Icon;
