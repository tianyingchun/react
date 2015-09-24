import React from 'react';
import constants from '../constants';

const nsPrefix = (constants.NAMESPACE ? constants.NAMESPACE + '-' : '');

const ClassNameMixin = {

  getClassSet: function (ignorePrefix) {

    const classNames = {};
    // uses `.am-` as prefix if `classPrefix` is not defined
    let prefix = nsPrefix;

    if (this.props.classPrefix) {

      let classPrefix = this.setClassNamespace();

      prefix = classPrefix + '-';

      // don't return prefix if flag set
      !ignorePrefix && (classNames[classPrefix] = true);
    }

    let amSize = this.props.amSize;
    let amStyle = this.props.amStyle;
    let theme = this.props.theme;
    if (amSize) {
      classNames[prefix + amSize] = true;
    }

    if (amStyle) {
      classNames[prefix + amStyle] = true;
    }

    // add theme className for widgets
    if (theme) {
      classNames[prefix + theme] = true;
    }

    // states
    classNames[constants.CLASSES.active] = !this.props.disabled && this.props.active;
    classNames[constants.CLASSES.disabled] = this.props.disabled;

    // shape
    classNames[constants.CLASSES.radius] = this.props.radius;
    classNames[constants.CLASSES.round] = this.props.round;

    // clearfix
    classNames[constants.CLASSES.cf] = this.props.cf;

    // divider
    if (this.props.classPrefix !== 'divider') {
      classNames[constants.CLASSES.divider] = this.props.divider;
    }

    return classNames;
  },
  // add namespace to classPrefix
  setClassNamespace: function (classPrefix) {
    let prefix = classPrefix || this.props.classPrefix || '';
    // the root prefix class usually used to parent component.
    let rootPrefix = this.props.classRootPrefix || '';
    if (rootPrefix) {
      return nsPrefix + rootPrefix + '-' + prefix;
    }
    return nsPrefix + prefix;
  },
  prefixClass: function (subClass) {
    return this.setClassNamespace() + '-' + subClass;
  }
}

export default ClassNameMixin;
