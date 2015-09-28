import React, { Component } from 'react';
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
    message.loading('这是一条Loading的提示,并将于10秒后消失', 10);
  }
  render () {
    return (
      <div className="message-demo">
        <div className="btn-group">
          <button type="button" className="btn btn-primary" onClick={this.showSuccess}>success</button>
          <button type="button" className="btn btn-danger" onClick={this.showFailed}>failed</button>
          <button type="button" className="btn btn-primary" onClick={this.showNormal}>normal</button>
          <button type="button" className="btn btn-primary" onClick={this.showCustomized}>custom</button>
          <button type="button" className="btn btn-primary" onClick={this.showLoading}>Loading</button>
        </div>
      </div>
    );
  }
}

export default MessageDemo;
