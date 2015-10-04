import React, { Component } from 'react';
import { Button, ButtonToolbar } from '../../button';
import message from '../index';

class MessageDemo extends Component {

  showSuccess = ()=> {
    message.success('这是一条成功的提示');
  }

  showFailed = () => {
    message.error('这是一条失败的提示这是一条失败的提示这是一条失败的提示');
  }

  showNormal = () => {
     message.info('这是一条普通的提醒');
  }

  showCustomized = () => {
    message.success('这是一条成功的提示,并将于10秒后消失', 10);
  }

  showLoading = () => {
    message.loading('正在处理中...', 10);
  }
  render () {
    return (
      <div className="doc-content">
        <h1>Message 全局提示</h1>
        <p>全局展示操作反馈信息。</p>
        <h2>何时使用</h2>
        <ul>
          <li>可提供成功、警告和错误等反馈信息。</li>
          <li>顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。</li>
        </ul>
        <h2>组件演示</h2>
        <ButtonToolbar>
          <Button className="btn btn-primary" onClick={this.showSuccess}>success</Button>
          <Button className="btn btn-danger" onClick={this.showFailed}>failed</Button>
          <Button className="btn btn-primary" onClick={this.showNormal}>normal</Button>
          <Button className="btn btn-primary" onClick={this.showCustomized}>custom</Button>
          <Button className="btn btn-primary" onClick={this.showLoading}>Loading</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default MessageDemo;
