import React, { Component } from 'react';
import { Layout, LayoutSplitter, ScrollArea } from '../../src/components';

class ReactDocLayout extends Component {
  render () {
    return (
      <Layout fill='container'>
          <Layout layoutWidth={220}>
            <ScrollArea speed={0.8} width={220} height={400} amSize={'sm'} contentClassName="content">
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
