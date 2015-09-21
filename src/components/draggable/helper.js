//
// Helpers.
//
import shallowEqual from 'fbjs/lib/shallowEqual';
import ReactDOM from 'react-dom';

class Helper {
  static createUIEvent = (draggable) => {
    // State changes are often (but not always!) async. We want the latest value.
    let state = draggable._pendingState || draggable.state;
    return {
      node: ReactDOM.findDOMNode(draggable),
      position: {
        top: state.clientY,
        left: state.clientX
      }
    };
  }

  static getBoundPosition = (draggable, clientX, clientY) => {
    let bounds = JSON.parse(JSON.stringify(draggable.props.bounds));
    let node = ReactDOM.findDOMNode(draggable);
    let parent = node.parentNode;

    if (bounds === 'parent') {
      let nodeStyle = window.getComputedStyle(node);
      let parentStyle = window.getComputedStyle(parent);
      // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
      bounds = {
        left: -node.offsetLeft + Helper.int(parentStyle.paddingLeft) +
              Helper.int(nodeStyle.borderLeftWidth) + Helper.int(nodeStyle.marginLeft),
        top: -node.offsetTop + Helper.int(parentStyle.paddingTop) +
              Helper.int(nodeStyle.borderTopWidth) + Helper.int(nodeStyle.marginTop),
        right: Helper.innerWidth(parent) - Helper.outerWidth(node) - node.offsetLeft,
        bottom: Helper.innerHeight(parent) - Helper.outerHeight(node) - node.offsetTop
      };
    }

    // Keep x and y below right and bottom limits...
    if (Helper.isNum(bounds.right)) clientX = Math.min(clientX, bounds.right);
    if (Helper.isNum(bounds.bottom)) clientY = Math.min(clientY, bounds.bottom);

    // But above left and top limits.
    if (Helper.isNum(bounds.left)) clientX = Math.max(clientX, bounds.left);
    if (Helper.isNum(bounds.top)) clientY = Math.max(clientY, bounds.top);

    return [clientX, clientY];
  }

  static outerHeight = (node) => {
    // This is deliberately excluding margin for our calculations, since we are using
    // offsetTop which is including margin. See Helpers.Ui.getBoundPosition
    let height = node.clientHeight;
    let computedStyle = window.getComputedStyle(node);
    height += Helper.int(computedStyle.borderTopWidth || 0);
    height += Helper.int(computedStyle.borderBottomWidth || 0);
    return height;
  }

  static outerWidth = (node) => {
    // This is deliberately excluding margin for our calculations, since we are using
    // offsetLeft which is including margin. See Helpers.Ui.getBoundPosition
    let width = node.clientWidth;
    let computedStyle = window.getComputedStyle(node);
    width += Helper.int(computedStyle.borderLeftWidth || 0);
    width += Helper.int(computedStyle.borderRightWidth || 0);
    return width;
  }

  static innerHeight = (node) => {
    let height = node.clientHeight;
    let computedStyle = window.getComputedStyle(node);
    height -= Helper.int(computedStyle.paddingTop || 0);
    height -= Helper.int(computedStyle.paddingBottom || 0);
    return height;
  }

  static innerWidth = (node) => {
    let width = node.clientWidth;
    let computedStyle = window.getComputedStyle(node);
    width -= Helper.int(computedStyle.paddingLeft || 0);
    width -= Helper.int(computedStyle.paddingRight || 0);
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
    let matchesSelectorFunc = Helper.findInArray([
      'matches',
      'webkitMatchesSelector',
      'mozMatchesSelector',
      'msMatchesSelector',
      'oMatchesSelector'
    ], (method) => {
      return Helper.isFunction(el[method]);
    });

    return el[matchesSelectorFunc].call(el, selector);
  }

  static shallowCompare(instance, nextProps, nextState) {
    return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
  }
}

export default Helper;

//
// End Helper.
//
