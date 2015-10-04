import React, { Component } from 'react';
import Alert from '../index';

class AlertDemo extends Component {

  onClose = (e) => {
    console.log(e);
  }
  render () {
    return (
      <div className="doc-content">
        <h1>Alert 警告提示</h1>
        <p>警告提示，展现需要关注的信息。</p>
        <hr />
        <h2>组件演示</h2>

        <h3>最简单的用法，适用于简短的警告提示。</h3>
        <Alert iStyle="success">
          成功提示的文案
        </Alert>
        <Alert iStyle="danger" onClose={this.onClose}>
          警告提示的文案
        </Alert>
        <Alert onClose={this.onClose}>
         <p>错误提示的文案</p>
         <span>错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍</span>
        </Alert>
      </div>
    );
  }
}

export default AlertDemo;
