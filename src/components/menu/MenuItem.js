import React from 'react';
import classNames from 'classnames';
import mixin from '../../utils/mixin';
import KeyCode from '../../utils/KeyCode';
import ClassNameMixin from '../../mixins/ClassNameMixin';

/**
 * The MenuItem should be used via `Menu` wrapped
 *
 */
class MenuItem extends mixin(ClassNameMixin) {

  static propTypes = {
    classRootPrefix: React.PropTypes.string,
    eventKey: React.PropTypes.string,
    active: React.PropTypes.bool,
    selected: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    title: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onDeselect: React.PropTypes.func,
    onItemHover: React.PropTypes.func,
    onDestroy: React.PropTypes.func
  }

  static defaultProps = {
    classRootPrefix:'menu',
    classPrefix: 'item',
    onSelect() {},
    onMouseEnter() {},
    onItemHover () {},
    onDeselect () {},
    onDestroy() {},
    onClick () {}
  }

  componentWillUnmount () {
    const props = this.props;
    if (props.onDestroy) {
      props.onDestroy(props.eventKey);
    }
  }

  onKeyDown = (e) => {
    const keyCode = e.keyCode;
    if (keyCode === KeyCode.ENTER) {
      this.onClick(e);
      return true;
    }
  }

  onMouseLeave = () => {
    const eventKey = this.props.eventKey;
    this.props.onItemHover({
      key: eventKey,
      item: this,
      hover: false,
      trigger: 'mouseleave',
    });
  }

  onMouseEnter = () => {
    const props = this.props;
    const eventKey = props.eventKey;
    props.onItemHover({
      key: eventKey,
      item: this,
      hover: true,
      trigger: 'mouseenter',
    });
  }

  onClick = (e) => {
    const props = this.props;
    const eventKey = props.eventKey;
    const info = {
      key: eventKey,
      keyPath: [eventKey],
      item: this,
      domEvent: e,
    };
    props.onClick(info);
    if (props.multiple) {
      if (props.selected) {
        props.onDeselect(info);
      } else {
        props.onSelect(info);
      }
    } else if (!props.selected) {
      props.onSelect(info);
    }
  }

  getSelectedClassName () {
    return this.prefixClass('selected');
  }

  render() {
    const props = this.props;

    const classSet = this.getClassSet();
    const classes = {
      [this.getSelectedClassName()]:props.selected
    };
    const attrs = {
      title: props.title,
      className: classNames(props.className, classSet,  classes),
      role: 'menuitem',
      'aria-selected': props.selected,
      'aria-disabled': props.disabled,
    };
    let mouseEvent = {};
    if (!props.disabled) {
      mouseEvent = {
        onClick: this.onClick,
        onMouseLeave: this.onMouseLeave,
        onMouseEnter: this.onMouseEnter,
      };
    }
    const style = {};
    if (props.mode === 'inline') {
      style.paddingLeft = props.inlineIndent * props.level;
    }
    return (
      <li style={style}
        {...attrs}
        {...mouseEvent}>
        {props.children}
      </li>
    );
  }
}

export default MenuItem;
