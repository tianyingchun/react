import React from 'react';
import DocumentMeta from 'react-document-meta';

class Head extends React.Component {

  render () {
    const { links } = this.props;
    return (
      <head>
        <meta charSet="utf-8" />
        <meta name="renderer" content="webkit" />
        <meta httpEquiv="Cache-Control" content="no-siteapp" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        {DocumentMeta.renderAsReact()}
        {links.map((link, i) => {
          return <link key={i} name={link.name} rel="stylesheet" type="text/css" href={ link.href } />;
        })}
      </head>
    );
  }
}

export default Head;
