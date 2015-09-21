import React from 'react';
import { Layout, LayoutSplitter, ScrollArea } from '../../src/components';
import DocHeader from './Header';

class DocLayout extends React.Component {
  render () {
    return (
      <Layout fill='window' className="doc-page">
        <Layout layoutHeight={50}>
          <DocHeader />
        </Layout>
        <Layout layoutHeight='flex' className="page-body container">
          { this.props.children }
        </Layout>
      </Layout>
    );
  }
}

export default DocLayout;
