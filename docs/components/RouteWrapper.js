import React, { Component } from 'react';

/**
 * If we attach react single page app on a domain with child route path url
 * e.g. http://www.example.com/workspace/list
 * we attach our app on the top url provider by Spring MVC controller.
 * we will need this route wrapper and nasted an <Redirect from="/" to="workspace/list"/>
 * otherwise it have an issue in ie8 and ie8 because it can't support html5 pushstate.
 */
class RouteRoot extends Component {
  render () {
    return (
      <div className='container'>{ this.props.children }</div>
    );
  }
}

export default RouteRoot;
