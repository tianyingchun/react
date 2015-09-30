import React from 'react';
import { Link, History } from 'react-router';
import URI from '../utils/URI';
const RouteLink = React.createClass({
  mixins:[History],

  getPropTypes() {
    return {
      // cutomized regex match to test if current RouteLink is `active` state.
      match: React.PropTypes.string
    };
  },

  render () {
    // Note there is an bug in ie <=11, this.history is undefined.
    // the mixin has some problem in windows <IE10 use ES5 instead.
    let { to, match } = this.props;
    let isActive;
    let currentURL = window.location.href;
    let currentHash = currentURL.replace(URI.getUrl(), '/');

    if (match) {
      let regExpStr = match.replace(/\//g,'\/');
      isActive = new RegExp(regExpStr).test(currentHash);
    } else {
      isActive = this.history.isActive(to, this.props.query);
    }

    let className = isActive ? 'active' : '';
    return (
      <li className={className}><Link {...this.props} /></li>
    );
  }
});

module.exports = RouteLink;
