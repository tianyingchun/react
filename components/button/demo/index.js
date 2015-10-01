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
          <Button amStyle="primary">Primary</Button>
          <Button amStyle="secondary">Secondary</Button>
          <Button amStyle="success">Success</Button>
          <Button amStyle="warning">Warning</Button>
          <Button amStyle="danger">Danger</Button>
          <Button amStyle="link">Link</Button>
        </ButtonToolbar>

        <h3>按钮SIZE</h3>
        <ButtonToolbar>
          <Button amSize="xxs"><Icon icon="information" /> 默认(12px-xxs)</Button>
          <Button amStyle="primary" amSize="xs"><Icon icon="radio-checked" /> 主要(12px-xs)</Button>
          <Button amStyle="secondary" amSize="sm"><Icon icon="bin" /> Secondary(14px-sm)</Button>
          <Button amStyle="success"><Icon icon="spinner6" spin/> Success（16px)</Button>
          <Button amStyle="warning" amSize="lg"><Icon icon="success" /> Warning (18px-lg)</Button>
          <Button amStyle="danger" amSize="xl"><Icon icon="coin-dollar" /> Danger (20px-xl)</Button>
          <Button amStyle="link">Link</Button>
        </ButtonToolbar>
        <h3>圆角</h3>

        <ButtonToolbar>
          <Button radius>Default</Button>
          <Button amStyle="primary" radius>Primary</Button>
          <Button amStyle="secondary" radius>Secondary</Button>
          <Button amStyle="success" radius>Success</Button>
          <Button amStyle="warning" radius>Warning</Button>
          <Button amStyle="danger" radius>Danger</Button>
          <Button amStyle="link" radius>Link</Button>
        </ButtonToolbar>

        <h3>椭圆</h3>
        <ButtonToolbar>
          <Button round>Default</Button>
          <Button amStyle="primary" round>Primary</Button>
          <Button amStyle="secondary" round>Secondary</Button>
          <Button amStyle="success" round>Success</Button>
          <Button amStyle="warning" round>Warning</Button>
          <Button amStyle="danger" round>Danger</Button>
          <Button amStyle="link" round>Link</Button>
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
