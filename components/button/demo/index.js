import React, { Component } from 'react';
import { Button, ButtonToolbar } from '../index';
import Icon from '../../icon';
class ButtonDemo extends Component {
  componentWillUpdate() {
    console.log('update...')
  }
  render () {
    return (
      <div className="doc-content">
        <h1>Button 系列</h1>
        <hr />
        <p>按钮系列组件包括 Button、ButtonGroup、ButtonGroup 等。</p>
        <h2>Button</h2>
        <h3>默认样式</h3>
        <ButtonToolbar>
          <Button>Default</Button>
          <Button iStyle="primary">Primary</Button>
          <Button iStyle="secondary">Secondary</Button>
          <Button iStyle="success">Success</Button>
          <Button iStyle="warning">Warning</Button>
          <Button iStyle="danger">Danger</Button>
          <Button iStyle="link">Link</Button>
        </ButtonToolbar>

        <h3>按钮SIZE</h3>
        <ButtonToolbar>
          <Button iSize="xxs"><Icon icon="information" /> 默认(12px-xxs)</Button>
          <Button iStyle="primary" iSize="xs"><Icon icon="radio-checked" /> 主要(12px-xs)</Button>
          <Button iStyle="secondary" iSize="sm"><Icon icon="bin" /> Secondary(14px-sm)</Button>
          <Button iStyle="success"><Icon icon="spinner6" spin/> Success（16px)</Button>
          <Button iStyle="warning" iSize="lg"><Icon icon="success" /> Warning (18px-lg)</Button>
          <Button iStyle="danger" iSize="xl"><Icon icon="coin-dollar" /> Danger (20px-xl)</Button>
          <Button iStyle="link">Link</Button>
        </ButtonToolbar>
        <h3>圆角</h3>

        <ButtonToolbar>
          <Button radius>Default</Button>
          <Button iStyle="primary" radius>Primary</Button>
          <Button iStyle="secondary" radius>Secondary</Button>
          <Button iStyle="success" radius>Success</Button>
          <Button iStyle="warning" radius>Warning</Button>
          <Button iStyle="danger" radius>Danger</Button>
          <Button iStyle="link" radius>Link</Button>
        </ButtonToolbar>

        <h3>椭圆</h3>
        <ButtonToolbar>
          <Button round>Default</Button>
          <Button iStyle="primary" round>Primary</Button>
          <Button iStyle="secondary" round>Secondary</Button>
          <Button iStyle="success" round>Success</Button>
          <Button iStyle="warning" round>Warning</Button>
          <Button iStyle="danger" round>Danger</Button>
          <Button iStyle="link" round>Link</Button>
        </ButtonToolbar>
        <h2>Button Group</h2>
        <h3>基本按钮组</h3>
        <h3>基本按钮组1</h3>
        <h3>基本按钮组2</h3>

      </div>
    );
  }
}

export default ButtonDemo;
