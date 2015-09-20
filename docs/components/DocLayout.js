import React, { Component } from 'react';
import { Layout, LayoutSplitter, ScrollArea } from '../../src/components';
import DocHeader from './Header';

class DocLayout extends Component {
  render () {
    return (
      <Layout fill='window' className="doc-page">
        <Layout layoutHeight={50}>
          <DocHeader />
        </Layout>
        <Layout layoutHeight='flex' className="container">
          { this.props.children }
        </Layout>
      </Layout>
    );
  }
}

export default DocLayout;