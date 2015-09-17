import React, { Component } from 'react';
import classNames from 'classnames';
import reactMixin from 'react-mixin';
import ClassNameMixin from '../../mixins/ClassNameMixin';

class Icon extends Component {

  static propTypes = {
    amStyle: React.PropTypes.string,
    fw: React.PropTypes.bool,
    spin: React.PropTypes.bool,
    button: React.PropTypes.bool,
    size: React.PropTypes.string,
    href: React.PropTypes.string,
    componentTag: React.PropTypes.node.isRequired,
    icon: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    classPrefix: 'glyph',
    componentTag: 'span'
  }

  render () {
    let classes = this.getClassSet(true);
    let props = this.props;
    let Component = props.href ? 'a' : props.componentTag;
    let prefixClass = this.prefixClass;
    let setClassNamespace = this.setClassNamespace;

    // icon-[iconName]
    classes[prefixClass(props.icon)] = true;

    // icon-btn
    classes[prefixClass('btn')] = props.button;

    // button style
    props.button && props.amStyle && (classes[setClassNamespace(props.amStyle)] = true);

    // icon-fw
    classes[prefixClass('fw')] = props.fw;

    // icon-spin
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

reactMixin(Icon.prototype, ClassNameMixin);

export default Icon;
