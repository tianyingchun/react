import React from 'react';

export default function mixin(...mixins) {
  return React.createClass({
    mixins: [...mixins],

    // So that React doesn't complain :)
    render: function() {
      return null;
    }
  });
}
