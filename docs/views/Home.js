import React from 'react';
if (process.env.BROWSER) {
  require('../stylesheets/docs.less');
}

export default class Home extends React.Component {

  render () {
    return (
      <div className="docs-page">
        home page.
      </div>
    );
  }
}

