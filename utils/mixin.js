import React from 'react';

/**
 * The simple mixin helper for ES6 class extends mixins(mixna, minxb)
 * @param  {...Object} mixins
 * @return {React.Component}
 */
export default function mixin(...mixins) {
  return React.createClass({
    mixins: [...mixins],

    // So that React doesn't complain :)
    render: function() {
      return null;
    }
  });
}
