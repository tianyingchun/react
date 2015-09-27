import React from 'react';
import { Link, History } from 'react-router';

const RouteLink = React.createClass({
  mixins:[History],

  render () {
    // Note there is an bug in ie <=11, this.history is undefined.
    // the mixin has some problem in windows <IE10 use ES5 instead.
    let isActive = this.history.isActive(this.props.to, this.props.query);
    let className = isActive ? 'active' : '';
    return (
      <li className={className}><Link {...this.props} /></li>
    );
  }
});

module.exports = RouteLink;
