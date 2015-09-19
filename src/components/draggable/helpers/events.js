class Events {
  /**
   * simple abstraction for dragging events names
   *
   */
  static eventsFor = {
    touch: {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend'
    },
    mouse: {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup'
    }
  }

  // Default to mouse events
  static dragEventFor(isTouchDevice) {
    return isTouchDevice ? Events.eventsFor.touch : Events.eventsFor.mouse;
  }

  /**
   * get {clientX, clientY} positions of control
   * */
  static getControlPosition = (e) => {
    let position = (e.targetTouches && e.targetTouches[0]) || e;
    return {
      clientX: position.clientX,
      clientY: position.clientY
    };
  }

  static doAdd(el, event, handler) {
    if (el.attachEvent) {
      el.attachEvent('on' + event, handler);
    } else if (el.addEventListener) {
      el.addEventListener(event, handler, true);
    } else {
      el['on' + event] = handler;
    }
  }

  static doRemove(el, event, handler) {
    if (el.detachEvent) {
      el.detachEvent('on' + event, handler);
    } else if (el.removeEventListener) {
      el.removeEventListener(event, handler, true);
    } else {
      el['on' + event] = null;
    }
  }

  static doEvent(action, el, event, handler) {
    if (!action || !el) {
      return new Error('action and el are required');
    }

    if (action === 'add') {
      return Events.doAdd(el, event, handler);
    } else if (action === 'remove') {
      return Events.doRemove(el, event, handler);
    }

    return new Error('action expected to be `add` or `remove`');
  }

  static addEvent = (el, event, handler) => {
    return Events.doEvent('add', el, event, handler);
  }

  static removeEvent = (el, event, handler) => {
    return Events.doEvent('remove', el, event, handler);
  }
}

export default Events;
