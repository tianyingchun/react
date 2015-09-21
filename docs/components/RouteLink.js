import React from 'react';
import { Link, History } from 'react-router';
import mixin from '../../src/utils/mixin';

class RouteLink extends mixin(History) {

  constructor (props) {
    super(props);
  }

  render () {
    // Note there is an bug in ie <=11, this.history is undefined.
    console.log(this.history);
    // debugger;

    let isActive = this.history.isActive(this.props.to, this.props.query);
    let className = isActive ? 'active' : '';
    return (
      <li className={className}><Link {...this.props} /></li>
    );
  }
}

export default RouteLink;
