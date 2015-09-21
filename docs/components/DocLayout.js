import React from 'react';
import DocumentMeta from 'react-document-meta';
import { Layout, LayoutSplitter } from '../../src/components';
import Header from './Header';

class DocLayout extends React.Component {
  render () {
    const meta = {
      title: 'the docs of react ui components',
      description: 'show user documents for react ui components',
      canonical: 'http://example.com/docs',
      meta: {
        name: {
          keywords: 'react ui, react components, react widgets, react component docs'
        }
      }
    };
    return (
      <div className="wrapper">
        <DocumentMeta {...meta} />
        <Layout fill='window' className="doc-page">
          <Layout layoutHeight={50}>
            <Header />
          </Layout>
          <Layout layoutHeight='flex' className="page-body container">
            { this.props.children }
          </Layout>
        </Layout>
      </div>
    );
    // return (
    //   <div className="wrapper">
    //     <DocumentMeta {...meta} />
    //     <Layout fill='window'>
    //     dddd
    //     </Layout>
    //   </div>
    // );
  }
}

export default DocLayout;
