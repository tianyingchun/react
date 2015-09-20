import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
if (process.env.BROWSER) {
  require('../stylesheets/docs.less');
}

export default class Home extends Component {

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
      <div className="docs-page">
        home page.
      </div>
    );
  }
}

