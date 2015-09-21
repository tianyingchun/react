import React from 'react';
import { Layout, LayoutSplitter, ScrollArea } from '../../src/components';

class LessDocLayout extends React.Component {
  render () {
    return (
      <Layout fill='container'>
          <Layout layoutWidth={220}>
            col menus.
          </Layout>
          <LayoutSplitter />
          <Layout layoutWidth='flex'>
            col content.
          </Layout>
      </Layout>
    );
  }
}

export default LessDocLayout;
