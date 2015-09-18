import React, { Component } from 'react';
import classNames from 'classnames';
import Events from '../../utils/Events';

/* exported ReactDrag */

var emptyFunction = function () {};

function createUIEvent(draggable) {
  return {
    position: {
      top: draggable.state.pageY,
      left: draggable.state.pageX
    }
  };
}

function canDragY(draggable) {
  return draggable.props.axis === 'both' ||
      draggable.props.axis === 'y';
}

function canDragX(draggable) {
  return draggable.props.axis === 'both' ||
      draggable.props.axis === 'x';
}

function isFunction(func) {
  return typeof func === 'function' ||
    Object.prototype.toString.call(func) === '[object Function]';
}

// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
function findInArray(array, callback) {
  for (var i = 0, length = array.length, element = null; i < length; i += 1) {
    element = array[i];
    if (callback.apply(callback, [element, i, array])) {
      return element;
    }
  }
}

function matchesSelector(el, selector) {
  var method = findInArray([
    'matches',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector'
  ], function (method) {
    return isFunction(el[method]);
  });

  return el[method].call(el, selector);
}

// @credits:
// http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript/4819886#4819886
/* Conditional to fix node server side rendering of component */
if (typeof window === 'undefined') {
    // Do Node Stuff
  var isTouchDevice = false;
} else {
  // Do Browser Stuff
  var isTouchDevice = 'ontouchstart' in window // works on most browsers
    || 'onmsgesturechange' in window; // works on ie10 on ms surface
  // Check for IE11
  try {
    document.createEvent('TouchEvent');
  } catch (e) {
    isTouchDevice = false;
  }

}

// look ::handleDragStart
//function isMultiTouch(e) {
//  return e.touches && Array.isArray(e.touches) && e.touches.length > 1
//}

/**
 * simple abstraction for dragging events names
 * */
var dragEventFor = (function () {
  var eventsFor = {
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
  };
  return eventsFor[isTouchDevice ? 'touch' : 'mouse'];
})();

/**
 * get {pageX, pageY} positions of control
 * */
function getControlPosition(e) {
  var position = (e.touches && e.touches[0]) || e;
  return {
    pageX: position.pageX,
    pageY: position.pageY
  };
}

function getBoundPosition(pageX, pageY, bound, target) {
  console.log('bund',bund)
  if (bound) {
    if ((typeof bound !== 'string' && bound.toLowerCase() !== 'parent') &&
        (typeof bound !== 'object')) {
      console.warn('Bound should either "parent" or an object');
    }
    var par = target.parentNode;
    var topLimit = bound.top || 0;
    var leftLimit = bound.left || 0;
    var rightLimit = bound.right || par.offsetWidth;
    var bottomLimit = bound.bottom || par.offsetHeight;
    pageX = Math.min(pageX, rightLimit - target.offsetWidth);
    pageY = Math.min(pageY, bottomLimit - target.offsetHeight);
    pageX = Math.max(leftLimit, pageX);
    pageY = Math.max(topLimit, pageY);
  }
  return {
    pageX: pageX,
    pageY: pageY
  };
}

class Draggable extends Component {

  static propTypes = {
    /**
     * `axis` determines which axis the draggable can move.
     *
     * 'both' allows movement horizontally and vertically.
     * 'x' limits movement to horizontal axis.
     * 'y' limits movement to vertical axis.
     *
     * Defaults to 'both'.
     */
    axis: React.PropTypes.oneOf(['both', 'x', 'y']),

    /**
     * `handle` specifies a selector to be used as the handle
     * that initiates drag.
     *
     * Example:
     *
     * ```jsx
     *   var App = React.createClass({
     *       render: function () {
     *         return (
     *            <Draggable handle=".handle">
     *              <div>
     *                  <div className="handle">Click me to drag</div>
     *                  <div>This is some other content</div>
     *              </div>
     *           </Draggable>
     *         );
     *       }
     *   });
     * ```
     */
    handle: React.PropTypes.string,

    /**
     * `cancel` specifies a selector to be used to prevent drag initialization.
     *
     * Example:
     *
     * ```jsx
     *   var App = React.createClass({
     *       render: function () {
     *           return(
     *               <Draggable cancel=".cancel">
     *                   <div>
     *             <div className="cancel">You can't drag from here</div>
     *            <div>Dragging here works fine</div>
     *                   </div>
     *               </Draggable>
     *           );
     *       }
     *   });
     * ```
     */
    cancel: React.PropTypes.string,

    /**
     * `grid` specifies the x and y that dragging should snap to.
     *
     * Example:
     *
     * ```jsx
     *   var App = React.createClass({
     *       render: function () {
     *           return (
     *               <Draggable grid={[25, 25]}>
     *                   <div>I snap to a 25 x 25 grid</div>
     *               </Draggable>
     *           );
     *       }
     *   });
     * ```
     */
    grid: React.PropTypes.arrayOf(React.PropTypes.number),

    /**
     * `start` specifies the x and y that the dragged item should start at
     *
     * Example:
     *
     * ```jsx
     *   var App = React.createClass({
     *       render: function () {
     *           return (
     *               <Draggable start={{x: 25, y: 25}}>
     *                   <div>I start with left: 25px; top: 25px;</div>
     *               </Draggable>
     *           );
     *       }
     *   });
     * ```
     */
    start: React.PropTypes.object,

    /**
     * Called when dragging starts.
     *
     * Example:
     *
     * ```js
     *  function (event, ui) {}
     * ```
     *
     * `event` is the Event that was triggered.
     * `ui` is an object:
     *
     * ```js
     *  {
     *    position: {top: 0, left: 0}
     *  }
     * ```
     */
    onStart: React.PropTypes.func,

    /**
     * Called while dragging.
     *
     * Example:
     *
     * ```js
     *  function (event, ui) {}
     * ```
     *
     * `event` is the Event that was triggered.
     * `ui` is an object:
     *
     * ```js
     *  {
     *    position: {top: 0, left: 0}
     *  }
     * ```
     */
    onDrag: React.PropTypes.func,

    /**
     * Called when dragging stops.
     *
     * Example:
     *
     * ```js
     *  function (event, ui) {}
     * ```
     *
     * `event` is the Event that was triggered.
     * `ui` is an object:
     *
     * ```js
     *  {
     *    position: {top: 0, left: 0}
     *  }
     * ```
     */
    onStop: React.PropTypes.func,

    /**
     * A workaround option which can be passed if
     * onMouseDown needs to be accessed,
     * since it'll always be blocked (due to that
     * there's internal use of onMouseDown)
     *
     */
    onMouseDown: React.PropTypes.func,

    /**
     * Defines the bounderies around the element
     * could be dragged. This property could be
     * object or a string. If used as object
     * the bounderies should be defined as:
     *
     * {
     *   left: LEFT_BOUND,
     *   right: RIGHT_BOUND,
     *   top: TOP_BOUND,
     *   bottom: BOTTOM_BOUND
     * }
     *
     * The only acceptable string
     * property is: "parent".
     */
    bound: React.PropTypes.any
  }

  static defaultProps = {
    axis: 'both',
    handle: null,
    cancel: null,
    grid: null,
    bound: false,
    start: {
      x: 0,
      y: 0
    },
    onStart: emptyFunction,
    onDrag: emptyFunction,
    onStop: emptyFunction,
    onMouseDown: emptyFunction
  }
  constructor (props) {
    super(props);

    this.state =  {
      // Whether or not currently dragging
      dragging: false,

      // Start top/left of this.getDOMNode()
      startX: 0,
      startY: 0,

      // Offset between start top/left and mouse top/left
      offsetX: 0,
      offsetY: 0,

      // Current top/left of this.getDOMNode()
      pageX: this.props.start.x,
      pageY: this.props.start.y
    };

  }
  componentWillUnmount () {
    // Remove any leftover event handlers
    Events.off(window, dragEventFor.move, this.handleDrag);
    Events.off(window, dragEventFor.end, this.handleDragEnd);
  }

  handleDragStart = (e) => {
    // todo: write right implementation to prevent multitouch drag
    // prevent multi-touch events
    // if (isMultiTouch(e)) {
    //     this.handleDragEnd.apply(e, arguments);
    //     return
    // }
    // Make it possible to attach event handlers on top of this one
    this.props.onMouseDown(e);

    var node = React.findDOMNode(this);

    // Short circuit if handle or cancel prop was provided
    // and selector doesn't match
    if ((this.props.handle && !matchesSelector(e.target, this.props.handle)) ||
      (this.props.cancel && matchesSelector(e.target, this.props.cancel))) {
      return;
    }

    var dragPoint = getControlPosition(e);

    // Initiate dragging
    this.setState({
      dragging: true,
      offsetX: parseInt(dragPoint.pageX, 10),
      offsetY: parseInt(dragPoint.pageY, 10),
      startX: parseInt(node.style.left, 10) || 0,
      startY: parseInt(node.style.top, 10) || 0
    });

    // Call event handler
    this.props.onStart(e, createUIEvent(this));

    // Add event handlers
    Events.on(window, dragEventFor.move, this.handleDrag);
    Events.on(window, dragEventFor.end, this.handleDragEnd);
  }

  handleDragEnd = (e) => {
    // Short circuit if not currently dragging
    if (!this.state.dragging) {
      return;
    }

    // Turn off dragging
    this.setState({
      dragging: false
    });

    // Call event handler
    this.props.onStop(e, createUIEvent(this));

    // Remove event handlers
    Events.off(window, dragEventFor.move, this.handleDrag);
    Events.off(window, dragEventFor.end, this.handleDragEnd);
  }

  handleDrag = (e) => {
    var dragPoint = getControlPosition(e);

    // Calculate top and left
    var pageX = (this.state.startX +
        (dragPoint.pageX - this.state.offsetX));
    var pageY = (this.state.startY +
        (dragPoint.pageY - this.state.offsetY));
    var pos =
        getBoundPosition(pageX, pageY, this.props.bound, React.findDOMNode(this));

    pageX = pos.pageX;
    pageY = pos.pageY;

    // Snap to grid if prop has been provided
    if (Array.isArray(this.props.grid)) {
      var directionX = pageX < parseInt(this.state.pageX, 10) ? -1 : 1;
      var directionY = pageY < parseInt(this.state.pageY, 10) ? -1 : 1;

      pageX = Math.abs(pageX - parseInt(this.state.pageX, 10)) >=
          this.props.grid[0]
          ? (parseInt(this.state.pageX, 10) +
            (this.props.grid[0] * directionX))
          : this.state.pageX;

      pageY = Math.abs(pageY - parseInt(this.state.pageY, 10)) >=
          this.props.grid[1]
          ? (parseInt(this.state.pageY, 10) +
            (this.props.grid[1] * directionY))
          : this.state.pageY;
    }

    // Update top and left
    this.setState({
      pageX: pageX,
      pageY: pageY
    });

    // Call event handler
    this.props.onDrag(e, createUIEvent(this));

    // Prevent the default behavior
    e.preventDefault();
  }

  render () {
    var style = {
      // Set top if vertical drag is enabled
      top: canDragY(this)
        ? this.state.pageY
        : this.state.startY,

      // Set left if horizontal drag is enabled
      left: canDragX(this)
        ? this.state.pageX
        : this.state.startX
    };

    var className = classNames({
      'react-drag': true,
      'react-drag-dragging': this.state.dragging
    });
    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return React.cloneElement(
      React.Children.only(this.props.children), {
      style: style,
      className: className,
      onMouseDown: this.handleDragStart,
      onTouchStart: function (ev) {
        Events.preventDefault(ev); // prevent for scroll
        return this.handleDragStart.apply(this, arguments);
      }.bind(this),

      onMouseUp: this.handleDragEnd,
      onTouchEnd: this.handleDragEnd
    });
  }

}

export default Draggable;

