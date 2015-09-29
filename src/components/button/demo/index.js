import React, { Component } from 'react';
import Button from '../index';

class ButtonDemo extends Component {
  componentWillUpdate() {
    console.log('update...')
  }
  render () {
    return (
      <div className="container">
        <Button>Default</Button>
        <Button amStyle="primary">Primary</Button>
        <Button amStyle="secondary">Secondary</Button>
        <Button amStyle="success">Success</Button>
        <Button amStyle="warning">Warning</Button>
        <Button amStyle="danger">Danger</Button>
        <Button amStyle="link">Link</Button>
      </div>
    );
  }
}

export default ButtonDemo;
