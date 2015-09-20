let isInBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

let bind = isInBrowser && window.addEventListener ? 'addEventListener' : 'attachEvent';
let unbind = isInBrowser && window.removeEventListener ? 'removeEventListener' : 'detachEvent';
let prefix = bind !== 'addEventListener' ? 'on' : '';

class Events {
  static one (node, eventNames, eventListener) {
    if (!isInBrowser) return;
    let typeArray = eventNames.split(' ');
    let recursiveFunction = function (e) {
      e.target.removeEventListener(e.type, recursiveFunction);
      return eventListener(e);
    };

    for (let i = typeArray.length - 1; i >= 0; i--) {
      this.on(node, typeArray[i], recursiveFunction);
    }
  }


  /**
   * Bind `node` event `eventName` to `eventListener`.
   *
   * @param {Element} node
   * @param {String} eventName
   * @param {Function} eventListener
   * @param {Boolean} capture
   * @return {Obejct}
   * @api public
   */

  static on (node, eventName, eventListener, capture) {
    if (!isInBrowser) return;
    node[bind](prefix + eventName, eventListener, capture || false);
    return {
      off: function () {
        node[unbind](prefix + eventName, eventListener, capture || false);
      }
    };
  }


  /**
   * Unbind `node` event `eventName`'s callback `eventListener`.
   *
   * @param {Element} node
   * @param {String} eventName
   * @param {Function} eventListener
   * @param {Boolean} capture
   * @return {Function}
   * @api public
   */

  static off (node, eventName, eventListener, capture) {
    if (!isInBrowser) return;
    node[unbind](prefix + eventName, eventListener, capture || false);
    return eventListener;
  }

  static getEvent (event) {
    return event || window.event;
  }

  static getTarget (event) {
    event = Events.getEvent(event);
    return event.target || event.srcElement;
  }

  static preventDefault (event) {
    event = Events.getEvent(event);
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }

  static stopPropagation (event) {
    event = Events.getEvent(event);
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }

  static getRelatedTarget (event) {
    event = Events.getEvent(event);
    if (event.relatedTarget) {
      return event.relatedTarget;
    } else {
      if (event.type == 'mouseover') {
        return event.fromElement;
      } else if (event.type == 'mouseout') {
        return event.toElement;
      } else {
        return null;
      }
    }
  }

  static getWheelDelta (event) {
    event = Events.getEvent(event);
    if (event.wheelDelta) {
      return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
    } else {
      return -event.detail * 40;
    }
  }

  static getCharCode (event) {
    event = Events.getEvent(event);
    if (typeof event.charCode == 'number') {
      return event.charCode;
    } else {
      return event.keyCode;
    }
  }
  /**
   * simple abstraction for dragging events names
   *
   */
  static eventsFor = {
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
  }

  // Default to mouse events
  static dragEventFor(isTouchDevice) {
    return isTouchDevice ? Events.eventsFor.touch : Events.eventsFor.mouse;
  }
};

export default Events;
