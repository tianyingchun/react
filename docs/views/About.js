import React, { Component/*, PropTypes*/} from 'react';

if (process.env.BROWSER) {
  require('../stylesheets/index.css');
}
class About extends Component {
  render () {
    return (
      <div>
        <div className={"main"} >'About' <i></i></div>
      </div>
    );
  }
}

export default About;
