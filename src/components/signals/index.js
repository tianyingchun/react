import React, { Component } from 'react';
import events from '../../utils/events';

// private shared database
const signals = {};

class Signals extends Component {

  // signal dispatcher
  static notify (name, data) {
    let handlers =  signals[name];
    if (handlers) {
      handlers.forEach((handler)=> {
        handler(data);
      });
    }
  }

  componentWillMount () {
    // register all signal events.
    for (let prop in this.props) {
      if (this.props.hasOwnProperty(prop)) {
        let m = prop.match(/on([A-Z]+.*)/);
        let handler = this.props[prop];

        if (typeof handler !== "function") {
          throw Error('Signal handler must be a function');
        }

        if (m) {
          let signalName = m[1].replace(/(.)/, function (c) {
            return c.toLowerCase()
          });
          let handlers = signals[signalName];
          if (!handlers) {
            signals[signalName] = [handler];
          } else {
            handlers.push(handler);
          }
        }
      }
    }
  }

  render () {
    return null;
  }
}

// signal listener at document
events.on(document, 'react-signal', function (e) {
  e = events.getEvent(e);
  Signals.notify(e.detail.name, e.detail.data);
});

export default Signals;
