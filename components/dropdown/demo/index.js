import React, { Component } from 'react';
import Dropdown from '../index';
import Menu from '../../menu';

class DropdownDemo extends Component {
  onSelect ({key}){
    alert('选中了菜单' + key);
  }
  render () {
    var menu1 = (
      <Menu>
        <Menu.Item>
          <a target="_blank" href="http://www.example.com/">第一个菜单项</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" href="http://www.example.com/">第二个菜单项</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" href="http://www.example.com/">第三个菜单项</a>
        </Menu.Item>
      </Menu>
    );

    var menu2 = (
      <Menu>
        <Menu.Item key="0">
          <a target="_blank" href="http://www.example.com/">第一个菜单项</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a target="_blank" href="http://www.example.com/">第二个菜单项</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3" disabled>第三个菜单项（不可用）</Menu.Item>
      </Menu>
    );
    var menu3 = (
      <Menu onSelect={this.onSelect}>
        <Menu.Item key="1">第一个菜单项</Menu.Item>
        <Menu.Item key="2">第二个菜单项</Menu.Item>
        <Menu.Item key="3">第三个菜单项</Menu.Item>
      </Menu>
    );

    var menu4 = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">第一个菜单项</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">第二个菜单项</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3">第三个菜单项</Menu.Item>
      </Menu>
    );


    return (
      <div className="doc-content">
        <h1>下拉菜单Dropdown</h1>
        <p>当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。</p>
        <hr />
        <h2>组件演示</h2>
        <h3>最简单的下拉菜单</h3>
        <Dropdown overlay={menu1}>
          <button className="btn btn-sm btn-primary">
            某按钮 <i className="glyph-icon glyph-arrow-down"></i>
          </button>
        </Dropdown>

        <h3>分割线和不可用菜单项。</h3>
        <Dropdown overlay={menu2}>
          <button className="btn btn-sm btn-default">
            鼠标移入 <i className="glyph-icon glyph-arrow-down"></i>
          </button>
        </Dropdown>
        <h3>点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。</h3>
        <Dropdown overlay={menu3}>
          <button className="btn btn-sm btn-danger">
            鼠标移入，点击菜单 <i className="glyph-icon glyph-arrow-down"></i>
          </button>
        </Dropdown>
        <h3>点击或鼠标移入触发。</h3>
        <Dropdown overlay={menu4} >
          <button className="btn btn-primary btn-info btn-sm">
            鼠标移入 <i className="glyph-icon glyph-arrow-down"></i>
          </button>
        </Dropdown>
        <Dropdown overlay={menu4} trigger="click">
          <button className="btn btn-info btn-sm">
            点击触发 <i className="glyph-icon glyph-arrow-down"></i>
          </button>
        </Dropdown>

        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>
    );
  }
}

export default DropdownDemo;
