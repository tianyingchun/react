import React, { Component } from 'react';
import Select from '../index';

let Option = Select.Option;
let OptGroup = Select.OptGroup;

class SelectDemo extends Component {

  handleChange(value) {
    console.log('selected ' + value);
  }

  getChildren () {
    var children = [];
    for (var i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    return children;
  }
  render () {

    return (
      <div className="container">
        <h2>基本使用。</h2>
        <Select defaultValue="lucy" style={{width:200}} onChange={this.handleChange}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>Disabled</Option>
          <Option value="yiminghe">yiminghe</Option>
        </Select>

        <h2>在浮层内顶部有搜索框的单项选择器。</h2>
        <Select defaultValue="lucy" showSearch={true} style={{width:200}}
                searchPlaceholder="输入"
                onChange={this.handleChange}>
          <Option value="jack">jack</Option>
          <Option value="lucy">lucy</Option>
          <Option value="disabled" disabled>disabled</Option>
          <Option value="yiminghe">yiminghe</Option>
        </Select>
        <h2>在浮层内顶部有搜索框的单项选择器。</h2>

        <h2>tags select，随意输入的内容（scroll the menu）</h2>
        <Select
          style={{width: '100%'}}
          searchPlaceholder="标签模式"
          tags onChange={this.handleChange}>
          {this.getChildren()}
        </Select>

        <h2>option分组</h2>
        <Select defaultValue="lucy"
                style={{width:200}}
                showSearch={false}
                onChange={this.handleChange}>
          <OptGroup label="Manager">
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
          </OptGroup>
          <OptGroup label="Engineer">
            <Option value="yiminghe">yiminghe</Option>
          </OptGroup>
        </Select>
      </div>
    );
  }
}

export default SelectDemo;
