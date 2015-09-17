let isInBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

let bind = isInBrowser && window.addEventListener ? 'addEventListener' : 'attachEvent';
let unbind = isInBrowser && window.removeEventListener ? 'removeEventListener' : 'detachEvent';
let prefix = bind !== 'addEventListener' ? 'on' : '';

let events = {
  one: function (node, eventNames, eventListener) {
    if (!isInBrowser) return;
    let typeArray = eventNames.split(' ');
    let recursiveFunction = function (e) {
      e.target.removeEventListener(e.type, recursiveFunction);
      return eventListener(e);
    };

    for (let i = typeArray.length - 1; i >= 0; i--) {
      this.on(node, typeArray[i], recursiveFunction);
    }
  },


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

  on: function (node, eventName, eventListener, capture) {
    if (!isInBrowser) return;
    node[bind](prefix + eventName, eventListener, capture || false);
    return {
      off: function () {
        node[unbind](prefix + eventName, eventListener, capture || false);
      }
    };
  },


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

  off: function (node, eventName, eventListener, capture) {
    if (!isInBrowser) return;
    node[unbind](prefix + eventName, eventListener, capture || false);
    return eventListener;
  }
};

export default events;
