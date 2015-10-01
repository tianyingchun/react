import React, { Component } from 'react';
import events from '../../utils/events';

// private shared database
const signals = {};

class Signals extends Component {

  /**
   * Signal dispatcher
   * @param  {String} name
   * @param  {Object} data
   * @return {void}
   */
  static notify (name, data) {
    console.log('signals.notify()', name, data);
    let handlers =  signals[name];
    if (handlers) {
      handlers.forEach((handler)=> {
        handler(data);
      });
    }
  }
  /**
   * Register an signal
   * @param  {String} signalName signal name
   * @param  {Function} handler  signal handler
   * @return {void}
   */
  static register (signalName, handler) {
    console.log('signals.register()', signalName, handler);
    if (typeof handler !== "function") {
      throw Error('Signal handler must be a function');
    }
    let handlers = signals[signalName];

    if (!handlers) {
      signals[signalName] = [handler];
    } else {
      handlers.push(handler);
    }
    console.log('signals database: ', signals);
  }
  /**
   * Remove signal handler
   * @param  {String} signalName signal name
   * @param  {Function} handler  handler
   * @return {void}
   */
  static destroy (signalName, handler) {
    console.log('signals.destroy()', signalName, handler);

    let handlers = signals[signalName];
    let removed;
    if(handlers && handlers.length) {
      let index = null;
      for (let i = handlers.length - 1; i >= 0; i--) {
        let _handler = handlers[i];
        if (handler === _handler) {
          index = i;
          break;
        }
      };
      removed = handlers.splice(index, 1);
    }
    console.log('signals database: ', signals);
    return removed;
  }

  componentWillMount () {
    console.log('register signals event & handlers', this.props);
    // register all signal events.
    for (let prop in this.props) {
      if (this.props.hasOwnProperty(prop)) {
        let m = prop.match(/on([A-Z]+.*)/);
        let handler = this.props[prop];
        if (m) {
          let signalName = m[1].replace(/(.)/, function (c) {
            return c.toLowerCase()
          });
          Signals.register(signalName, handler);
        }
      }
    }
  }

  componentWillUnmount () {
    console.log('remove signals event & handlers', this.props);
    // register all signal events.
    for (let prop in this.props) {
      if (this.props.hasOwnProperty(prop)) {
        let m = prop.match(/on([A-Z]+.*)/);
        let handler = this.props[prop];
        if (m) {
          let signalName = m[1].replace(/(.)/, function (c) {
            return c.toLowerCase()
          });
          Signals.destroy(signalName, handler);
        }
      }
    }
  }

  render () {
    return null;
  }
}

// for server rendering, there is no `document`
if (typeof document !== 'undefined') {
  // signal listener at document
  events.on(document, 'react-signal', function (e) {
    e = events.getEvent(e);
    Signals.notify(e.detail.name, e.detail.data);
  });
}

export default Signals;
