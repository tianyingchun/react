import React, { Component } from 'react';
import Popconfirm from '../index';
import message from '../../message';
let text = '确定要删除这个任务吗？';
class PopconfirmDemo extends  Component {
  confirm() {
    message.success('点击了确定');
  }

  cancel() {
    message.error('点击了取消');
  }
  render () {
    return (
      <div className="doc-content">
        <h1>Popconfirm 气泡确认框</h1>
        <p>点击元素，弹出气泡式的确认框。</p>
        <h2>何时使用</h2>
        <p>目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。</p>

        <h3>最简单的用法。</h3>
        <Popconfirm title="确定要删除这个任务吗？" onConfirm={this.confirm} onCancel={this.cancel}>
          <a href="javascript:;">删除</a>
        </Popconfirm>

        <h3>位置有四个方向</h3>
        <Popconfirm placement="left" title={text} onConfirm={this.confirm}>
          <a href="javascript:;">左边&nbsp;&nbsp;&nbsp;&nbsp;</a>
        </Popconfirm>
        <Popconfirm placement="top" title={text} onConfirm={this.confirm}>
          <a href="javascript:;">上边&nbsp;&nbsp;&nbsp;&nbsp;</a>
        </Popconfirm>
        <Popconfirm placement="bottom" title={text} onConfirm={this.confirm}>
          <a href="javascript:;">下边&nbsp;&nbsp;&nbsp;&nbsp;</a>
        </Popconfirm>
        <Popconfirm placement="right" title={text} onConfirm={this.confirm}>
          <a href="javascript:;">右边</a>
        </Popconfirm>
      </div>
    );
  }
}

export default PopconfirmDemo;
