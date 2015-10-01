import { canUseEventListeners } from './environment';

let bind = canUseEventListeners && window.addEventListener ? 'addEventListener' : 'attachEvent';
let unbind = canUseEventListeners && window.removeEventListener ? 'removeEventListener' : 'detachEvent';
let canEventHasCapture = (bind ==='addEventListener');
let prefix = bind !== 'addEventListener' ? 'on' : '';

const Events = {

  /**
   * Bind to DOM events during the bubble phase.
   *
   * @param  {DOMEventTarget} target DOM element to register listener on.
   * @param  {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param  {function} callback Callback function.
   * @param  {Boolean} is event capture phase.
   * @return {object} Object with a `remove` method.
   */
  on (target, eventType, eventListener, capture) {
    if (!canUseEventListeners) return;
    if (capture === true && !canEventHasCapture) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        off: function noop() {}
      };
    }

    target[bind](prefix + eventType, eventListener, capture || false);
    return {
      off: function () {
        target[unbind](prefix + eventType, eventListener, capture || false);
      }
    };
  },

  /**
   * Unbind to DOM events during the bubble phase.
   *
   * @param  {DOMEventTarget} target DOM element to register listener on.
   * @param  {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param  {function} callback Callback function.
   * @param  {Boolean} is event capture phase.
   * @return {Function}
   */
  off (target, eventType, eventListener, capture) {
    if (!canUseEventListeners) return;
    target[unbind](prefix + eventType, eventListener, capture || false);
    return eventListener;
  },

  one (node, eventNames, eventListener) {
    if (!canUseEventListeners) return;
    let typeArray = eventNames.split(' ');
    let recursiveFunction = function (e) {
      e.target.removeEventListener(e.type, recursiveFunction);
      return eventListener(e);
    };

    for (let i = typeArray.length - 1; i >= 0; i--) {
      Events.on(node, typeArray[i], recursiveFunction);
    }
  },

  getEvent (event) {
    return event || window.event;
  },

  getTarget (event) {
    event = Events.getEvent(event);
    return event.target || event.srcElement;
  },

  preventDefault (event) {
    event = Events.getEvent(event);
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },

  stopPropagation (event) {
    event = Events.getEvent(event);
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  getCharCode (event) {
    event = Events.getEvent(event);
    if (typeof event.charCode == 'number') {
      return event.charCode;
    } else {
      return event.keyCode;
    }
  },

  //simple abstraction for dragging events names
  eventsFor: {
    mouse: {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup'
    },
    touch: {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend'
    }
  },

  // Default to mouse events
  dragEventFor (isTouchDevice) {
    return isTouchDevice ? Events.eventsFor.touch : Events.eventsFor.mouse;
  }

};

export default Events;
