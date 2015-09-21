import React from 'react';
import { Link, History } from 'react-router';
import mixin from '../../src/utils/mixin';
class RouteLink extends mixin(History) {

  constructor (props) {
    super(props);
  }

  render () {
    console.log(this.history)

    let isActive = false;//this.history.isActive(this.props.to, this.props.query);
    let className = isActive ? 'active' : '';
    return (
      <li className={className}><Link {...this.props} /></li>
    );
  }
}

export default RouteLink;
