import React, { Component } from 'react';
import ReactIScroll from './ReactIScroll';

let _iScroll;
// for server rendering..
if (process.env.BROWSER) {
  // https://github.com/schovi/react-iscroll
  _iScroll = require('iscroll/build/iscroll-lite');
}

// Note, it only support ie9+, if you want to support ie8, please tranfer to
// `scrollArea`.
//

class IScroll extends Component {

  state = { }

  onRefresh = (iScrollInstance) => {
    let yScroll = iScrollInstance.y;
    if (this.state.y != yScroll) {
      this.setState({y: yScroll})
    }
  }

  render () {
    return (
      <ReactIScroll
        iscroll={_iScroll}
        onRefresh={this.onRefresh}>
        {this.props.children}
      </ReactIScroll>
    )
  }
}

export default IScroll;
