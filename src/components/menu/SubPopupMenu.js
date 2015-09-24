import React from 'react';
import MenuMixin from './MenuMixin';
import ClassNameMixin from '../../mixins/ClassNameMixin';
import { getKeyFromChildrenIndex } from './util';
import Animate from 'rc-animate';

const SubPopupMenu = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onDeselect: React.PropTypes.func,
    onOpenChange: React.PropTypes.func,
    onDestroy: React.PropTypes.func,
    openTransitionName: React.PropTypes.string,
    openAnimation: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    openKeys: React.PropTypes.arrayOf(React.PropTypes.string),
    closeSubMenuOnMouseLeave: React.PropTypes.bool,
    visible: React.PropTypes.bool,
  },

  mixins: [ClassNameMixin, MenuMixin],

  onDeselect(selectInfo) {
    this.props.onDeselect(selectInfo);
  },

  onSelect(selectInfo) {
    this.props.onSelect(selectInfo);
  },

  onClick(e) {
    this.props.onClick(e);
  },

  onOpenChange(e) {
    this.props.onOpenChange(e);
  },

  onDestroy(key) {
    this.props.onDestroy(key);
  },

  onItemHover(e) {
    this.onCommonItemHover(e);
  },

  getOpenTransitionName() {
    return this.props.openTransitionName;
  },

  renderMenuItem(c, i) {
    const props = this.props;
    const key = getKeyFromChildrenIndex(c, props.eventKey, i);
    const extraProps = {
      openKeys: props.openKeys,
      selectedKeys: props.selectedKeys,
      open: props.openKeys.indexOf(key) !== -1,
      selected: props.selectedKeys.indexOf(key) !== -1,
      openSubMenuOnMouseEnter: true,
    };
    return this.renderCommonMenuItem(c, i, extraProps);
  },

  render() {
    const renderFirst = this.renderFirst;
    this.renderFirst = 1;
    this.haveOpened = this.haveOpened || this.props.visible;
    if (!this.haveOpened) {
      return null;
    }
    let transitionAppear = true;
    if (!renderFirst && this.props.visible) {
      transitionAppear = false;
    }
    const props = Object.assign({}, this.props);
    props.className += ` ${props.classPrefix}-sub`;
    const animProps = {};
    if (props.openTransitionName) {
      animProps.transitionName = props.openTransitionName;
    } else if (typeof props.openAnimation === 'object') {
      animProps.animation = Object.assign({}, props.openAnimation);
      if (!transitionAppear) {
        delete animProps.animation.appear;
      }
    }
    return (<Animate {...animProps}
      showProp="data-visible"
      component=""
      transitionAppear={transitionAppear}>
      {this.renderRoot(props)}
    </Animate>);
  },
});

export default SubPopupMenu;
