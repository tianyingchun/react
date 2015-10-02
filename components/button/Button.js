import React from 'react';
import mixin from '../../utils/mixin';
import classNames from 'classnames';
import omit from 'object.omit';
import ClassNameMixin from '../../mixins/ClassNameMixin';

class Button extends mixin(ClassNameMixin) {

  static propTypes = {
    classPrefix: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
    block: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    radius: React.PropTypes.bool,
    round: React.PropTypes.bool,
    componentTag: React.PropTypes.node,
    href: React.PropTypes.string,
    target: React.PropTypes.string
  }

  static defaultProps = {
    classPrefix: 'btn',
    type: 'button',
    iStyle: 'default'
  }

  // state = {
  //   loading: this.props.loading
  // }

  renderAnchor (classSet) {
    const Component = this.props.componentTag || 'a';
    const href = this.props.href || '#';
    const props = omit(this.props, 'type');

    return (
      <Component
        {...props}
        href={href}
        className={classNames(this.props.className, classSet)}
        role="button">
        {this.props.children}
      </Component>
    );
  }

  renderButton (classSet) {
    let Component = this.props.componentTag || 'button';

    return (
      <Component
        {...this.props}
        className={classNames(this.props.className, classSet)}>
        {this.props.children}
      </Component>
    );
  }

  render () {
    let classSet = this.getClassSet();
    let renderType = this.props.href || this.props.target ?
      'renderAnchor' : 'renderButton';
    // block button
    this.props.block && (classSet[this.prefixClass('block')] = true);

    return this[renderType](classSet);
  }
}

export default Button;
