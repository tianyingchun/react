import shallowEqual from 'fbjs/lib/shallowEqual';

class Utils {

  static outerHeight = (node) => {
    // This is deliberately excluding margin for our calculations, since we are using
    // offsetTop which is including margin. See Helpers.Ui.getBoundPosition
    let height = node.clientHeight;
    let computedStyle = window.getComputedStyle(node);
    height += Utils.int(computedStyle.borderTopWidth || 0);
    height += Utils.int(computedStyle.borderBottomWidth || 0);
    return height;
  }

  static outerWidth = (node) => {
    // This is deliberately excluding margin for our calculations, since we are using
    // offsetLeft which is including margin. See Helpers.Ui.getBoundPosition
    let width = node.clientWidth;
    let computedStyle = window.getComputedStyle(node);
    width += Utils.int(computedStyle.borderLeftWidth || 0);
    width += Utils.int(computedStyle.borderRightWidth || 0);
    return width;
  }

  static innerHeight = (node) => {
    let height = node.clientHeight;
    let computedStyle = window.getComputedStyle(node);
    height -= Utils.int(computedStyle.paddingTop || 0);
    height -= Utils.int(computedStyle.paddingBottom || 0);
    return height;
  }

  static innerWidth = (node) => {
    let width = node.clientWidth;
    let computedStyle = window.getComputedStyle(node);
    width -= Utils.int(computedStyle.paddingLeft || 0);
    width -= Utils.int(computedStyle.paddingRight || 0);
    return width;
  }

  static isNum = (num) => {
    return typeof num === 'number' && !isNaN(num);
  }

  static int = (a) => {
    return parseInt(a, 10);
  }

  static isFunction = (func) => {
    return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
  }

  static canDragX = (draggable) => {
    return draggable.props.axis === 'both' || draggable.props.axis === 'x';
  }

  static canDragY = (draggable) => {
    return draggable.props.axis === 'both' || draggable.props.axis === 'y';
  }

  // @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
  static findInArray = (array, callback) => {
    for (let i = 0, length = array.length; i < length; i++) {
      if (callback.apply(callback, [array[i], i, array])) {
        return array[i];
      }
    }
  }

  static matchesSelector = (el, selector) => {
    let matchesSelectorFunc = Utils.findInArray([
      'matches',
      'webkitMatchesSelector',
      'mozMatchesSelector',
      'msMatchesSelector',
      'oMatchesSelector'
    ], (method) => {
      return Utils.isFunction(el[method]);
    });

    return el[matchesSelectorFunc].call(el, selector);
  }

  static shallowCompare(instance, nextProps, nextState) {
    return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
  }
}

export default Utils;
