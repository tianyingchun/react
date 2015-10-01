import React, { Component } from 'react';
import RcSelect from 'rc-select';

if (process.env.BROWSER) {
  require('./select.less');
}

class Select extends Component {

  static defaultProps = {
    prefixCls: 'select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    showSearch: false
  }

  render () {
    let sizeClass = '';
    if (this.props.size === 'large') {
      sizeClass = 'select-lg';
    } else if (this.props.size === 'small') {
      sizeClass = 'select-sm';
    }
    let className = this.props.className || ' ';
    let notFoundContent = this.props.notFoundContent;
    if (this.props.combobox) {
      notFoundContent = null;
    }
    return (
      <RcSelect {...this.props} className={className + sizeClass} notFoundContent={notFoundContent} />
    );
  }
}


Select.Option = RcSelect.Option;
Select.OptGroup = RcSelect.OptGroup;

export default Select;
