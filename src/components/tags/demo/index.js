import React, { Component } from 'react';
import Tag from '../index';

class TagDemo extends Component {
  onClose = (e) => {
    console.log(e);
  }
  render () {
    return (
      <div>
        <div className="container">
          <h2>简单的标签展示，添加 closable 表示可关闭。</h2>
          <Tag>标签一</Tag>
          <Tag>标签二</Tag>
          <Tag closable onClose={this.onClose}>标签三</Tag>
          <Tag href="http://www.baidu.com">标签四（链接）</Tag>
        </div>
        <div className="container">
          <h2>四种颜色的标签。</h2>
          <Tag closable amStyle="primary">蓝色</Tag>
          <Tag closable amStyle="secondary">绿色</Tag>
          <Tag closable amStyle="warning">黄色</Tag>
          <Tag closable amStyle="danger">红色</Tag>
        </div>
      </div>
    );
  }
}

export default TagDemo;
