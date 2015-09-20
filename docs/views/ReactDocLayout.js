import React, { Component } from 'react';
import { Layout, LayoutSplitter, ScrollArea } from '../../src/components';

class ReactDocLayout extends Component {
  state = {
    scrollAreaWidth: 220,
    scrollAreaHeight: 400
  }
  layoutChanged = (data) => {
    this.setState({
      scrollAreaWidth: data
    });
  }
  render () {
    return (
      <Layout fill='container'>
          <Layout layoutWidth={220} onLayoutChanged={this.layoutChanged}>
            <ScrollArea speed={0.8} width={this.state.scrollAreaWidth} height={this.state.scrollAreaHeight} amSize={'sm'} contentClassName="content">
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>
              <p>menu</p>

            </ScrollArea>
          </Layout>
          <LayoutSplitter />
          <Layout layoutWidth='flex'>
            col content.
          </Layout>
      </Layout>
    );
  }
}

export default ReactDocLayout;
