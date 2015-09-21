/* eslint react/no-set-state:0  */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Helper from './helper';
import dom from '../../utils/dom';
import events  from '../../utils/events';
import emptyFunction from 'fbjs/lib/emptyFunction';

//
// Define <Draggable>
class Draggable extends React.Component {

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
    axis: PropTypes.oneOf(['both', 'x', 'y']),

    /**
     * `bounds` determines the range of movement available to the element.
     * Available values are:
     *
     * 'parent' restricts movement within the Draggable's parent node.
     *
     * Alternatively, pass an object with the following properties, all of which are optional:
     *
     * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
     *
     * All values are in px.
     *
     * Example:
     *
     * ```jsx
     *   class App extends Component {
     *       render() {
     *         return (
     *            <Draggable bounds={{right: 300, bottom: 300}}>
     *              <div>Content</div>
     *           </Draggable>
     *         );
     *       }
     *   });
     * ```
     */
    bounds: PropTypes.oneOfType([
      PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number
      }),
      PropTypes.oneOf(['parent', false])
    ]),

    /**
     * By default, we add 'user-select:none' attributes to the document body
     * to prevent ugly text selection during drag. If this is causing problems
     * for your app, set this to `false`.
     */
    enableUserSelectHack: PropTypes.bool,

    /**
     * `handle` specifies a selector to be used as the handle that initiates drag.
     *
     * Example:
     *
     * ```jsx
     *   class App extends Component {
     *       render() {
     *         return (
     *            <Draggable handle=".handle">
     *              <div>
     *                  <div className="handle">Click me to drag</div>
     *                  <div>This is some other content</div>
     *              </div>
     *           </Draggable>
     *         );
     *       }
     *   }
     * ```
     */
    handle: PropTypes.string,

    /**
     * `cancel` specifies a selector to be used to prevent drag initialization.
     *
     * Example:
     *
     * ```jsx
     *   class App extends Component {
     *       render() {
     *           return(
     *               <Draggable cancel=".cancel">
     *                   <div>
     *                     <div className="cancel">You can't drag from here</div>
     *            <div>Dragging here works fine</div>
     *                   </div>
     *               </Draggable>
     *           );
     *       }
     *   }
     * ```
     */
    cancel: PropTypes.string,

    /**
     * `grid` specifies the x and y that dragging should snap to.
     *
     * Example:
     *
     * ```jsx
     *   class App extends Component {
     *       render() {
     *           return (
     *               <Draggable grid={[25, 25]}>
     *                   <div>I snap to a 25 x 25 grid</div>
     *               </Draggable>
     *           );
     *       }
     *   }
     * ```
     */
    grid: PropTypes.arrayOf(PropTypes.number),

    /**
     * `start` specifies the x and y that the dragged item should start at
     *
     * Example:
     *
     * ```jsx
     *      class App extends Component {
     *          render() {
     *              return (
     *                  <Draggable start={{x: 25, y: 25}}>
     *                      <div>I start with transformX: 25px and transformY: 25px;</div>
     *                  </Draggable>
     *              );
     *          }
     *      }
     * ```
     */
    start: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),

    /**
     * `moveOnStartChange`, if true (default false) will move the element if the `start`
     * property changes.
     */
    moveOnStartChange: PropTypes.bool,


    /**
     * `zIndex` specifies the zIndex to use while dragging.
     *
     * Example:
     *
     * ```jsx
     *   class App extends Component {
     *       render() {
     *           return (
     *               <Draggable zIndex={100}>
     *                   <div>I have a zIndex</div>
     *               </Draggable>
     *           );
     *       }
     *   }
     * ```
     */
    zIndex: PropTypes.number,

    /**
     * Called when dragging starts.
     * If this function returns the boolean false, dragging will be canceled.
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
    onStart: PropTypes.func,

    /**
     * Called while dragging.
     * If this function returns the boolean false, dragging will be canceled.
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
    onDrag: PropTypes.func,

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
    onStop: PropTypes.func,

    /**
     * A workaround option which can be passed if onMouseDown needs to be accessed,
     * since it'll always be blocked (due to that there's internal use of onMouseDown)
     */
    onMouseDown: PropTypes.func
  }

  static defaultProps = {
    axis: 'both',
    bounds: false,
    handle: null,
    cancel: null,
    grid: null,
    moveOnStartChange: false,
    start: {
      x: 0,
      y: 0
    },
    zIndex: NaN,
    enableUserSelectHack: true,
    onStart: emptyFunction,
    onDrag: emptyFunction,
    onStop: emptyFunction,
    onMouseDown: emptyFunction
  }

  state = {
    // Whether or not we are currently dragging.
    dragging: false,

    // Offset between start top/left and mouse top/left while dragging.
    offsetX: 0,
    offsetY: 0,

    // Current transform x and y.
    clientX: this.props.start.x,
    clientY: this.props.start.y
  }

  constructor (...args) {
    super(...args);
    // Default is desktop.
    this.isTouchDevice = false;
  }

  componentWillReceiveProps(newProps) {
    // React to changes in the 'start' param.
    if (newProps.moveOnStartChange && newProps.start) {
      this.setState(newProps);
    }
  }

  componentWillUnmount() {
    // Remove any leftover event handlers
    events.off(document, events.dragEventFor(this.isTouchDevice).move, this.handleDrag, true);
    events.off(document, events.dragEventFor(this.isTouchDevice).end, this.handleDragEnd, true);
    this.removeUserSelectStyles(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return Helper.shallowCompare(this, nextProps, nextState);
  }

  handleDragStart = (e) => {
    // Set touch identifier in component state if this is a touch event
    if(e.targetTouches){
      this.setState({touchIdentifier: e.targetTouches[0].identifier});
    }

    // Make it possible to attach event handlers on top of this one
    this.props.onMouseDown(e);

    // Short circuit if handle or cancel prop was provided and selector doesn't match
    if ((this.props.handle && !Helper.matchesSelector(e.target, this.props.handle)) ||
      (this.props.cancel && Helper.matchesSelector(e.target, this.props.cancel))) {
      return;
    }

    // Call event handler. If it returns explicit false, cancel.
    let shouldStart = this.props.onStart(e, Helper.createUIEvent(this));
    if (shouldStart === false) return;

    let dragPoint = this.getControlPosition(e);

    // Add a style to the body to disable user-select. This prevents text from
    // being selected all over the page.
    this.addUserSelectStyles(this);

    // Initiate dragging. Set the current x and y as offsets
    // so we know how much we've moved during the drag. This allows us
    // to drag elements around even if they have been moved, without issue.
    this.setState({
      dragging: true,
      offsetX: dragPoint.clientX - this.state.clientX,
      offsetY: dragPoint.clientY - this.state.clientY,
      scrollX: document.body.scrollLeft,
      scrollY: document.body.scrollTop
    });

    // Add event handlers
    events.on(document, 'scroll', this.handleScroll, true);
    events.on(document, events.dragEventFor(this.isTouchDevice).move, this.handleDrag, true);
    events.on(document, events.dragEventFor(this.isTouchDevice).end, this.handleDragEnd, true);
  }

  handleDragEnd = (e) => {
    // Short circuit if not currently dragging
    if (!this.state.dragging) {
      return;
    }

    // Short circuit if this is not the correct touch event
    if(e.changedTouches && (e.changedTouches[0].identifier != this.state.touchIdentifier)){
      return;
    }

    this.removeUserSelectStyles(this);

    // Turn off dragging
    this.setState({
      dragging: false
    });

    // Call event handler
    this.props.onStop(e, Helper.createUIEvent(this));

    // Remove event handlers
    events.off(document, 'scroll', this.handleScroll, true);
    events.off(document, events.dragEventFor(this.isTouchDevice).move, this.handleDrag, true);
    events.off(document, events.dragEventFor(this.isTouchDevice).end, this.handleDragEnd, true);
  }

  addUserSelectStyles = () => {
    if (this.props.enableUserSelectHack) {
      let style = document.body.getAttribute('style') || '';
      document.body.setAttribute('style', style + dom.selectStyle());
    } else {
      console.warn('UserSelectHack is not enabled');
    }
  };

  removeUserSelectStyles = () => {
    if (this.props.enableUserSelectHack) {
      let style = document.body.getAttribute('style') || '';
      document.body.setAttribute('style', style.replace(dom.selectStyle(), ''));
    } else {
      console.warn('UserSelectHack is not enabled');
    }
  }
   /**
   * snap the x,y coords to a grid
   * @param  {Array}  grid     x,y snap bounds
   * @param  {Number} pendingX potential x value
   * @param  {Number} pendingY potential y value
   * @return {Array}           tuple of actual x,y
   */
  snapToGrid = (grid, pendingX, pendingY) => {
    let x = Math.round(pendingX / grid[0]) * grid[0];
    let y = Math.round(pendingY / grid[1]) * grid[1];
    return [x, y];
  }

  /**
  * get {clientX, clientY} positions of control
  * */
  getControlPosition = (e) => {
    let position = (e.targetTouches && e.targetTouches[0]) || e;
    return {
      clientX: position.clientX,
      clientY: position.clientY
    };
  }


  handleDrag = (e) => {
    // Return if this is a touch event, but not the correct one for this element
    if (e.targetTouches && (e.targetTouches[0].identifier != this.state.touchIdentifier)){
      return;
    }
    let dragPoint = this.getControlPosition(e);

    // Calculate X and Y
    let clientX = dragPoint.clientX - this.state.offsetX;
    let clientY = dragPoint.clientY - this.state.offsetY;

    // Snap to grid if prop has been provided
    if (Array.isArray(this.props.grid)) {
      let coords = this.snapToGrid(this.props.grid, clientX, clientY);
      clientX = coords[0];
      clientY = coords[1];
    }

    if (this.props.bounds) {
      let pos = Helper.getBoundPosition(this, clientX, clientY);
      clientX = pos[0];
      clientY = pos[1];
    }

    // Call event handler. If it returns explicit false, cancel.
    let shouldUpdate = this.props.onDrag(e, Helper.createUIEvent(this));
    if (shouldUpdate === false) return this.handleDragEnd.call(this);

    // Update transform
    this.setState({
      clientX: clientX,
      clientY: clientY
    });
  }

  handleScroll = () => {
    let s = this.state, x = document.body.scrollLeft, y = document.body.scrollTop;
    let offsetX = x - s.scrollX, offsetY = y - s.scrollY;
    this.setState({
      scrollX: x,
      scrollY: y,
      clientX: s.clientX + offsetX,
      clientY: s.clientY + offsetY,
      offsetX: s.offsetX - offsetX,
      offsetY: s.offsetY - offsetY
    });
  }

  onMouseDown = (e) => {
    // Prevent 'ghost click' which happens 300ms after touchstart if the event isn't cancelled.
    // We don't cancel the event on touchstart because of #37; we might want to make a scrollable item draggable.
    // More on ghost clicks: http://ariatemplates.com/blog/2014/05/ghost-clicks-in-mobile-browsers/
    if (events.dragEventFor === events.eventsFor.touch) {
      return e.preventDefault();
    }

    return this.handleDragStart(e);
  }

  onTouchStart = (e) => {
    // We're on a touch device now, so change the event handlers
    // Set isTouchDevice true.
    this.isTouchDevice = true;

    return this.handleDragStart(e);
  }

  // Intended for use by a parent component. Resets internal state on this component. Useful for
  // <Resizable> and other components in case this element is manually resized and start/moveOnStartChange
  // don't work for you.
  resetState = () => {
    this.setState({
      offsetX: 0, offsetY: 0, clientX: 0, clientY: 0
    });
  }

  render() {

    // Create style object. We extend from existing styles so we don't
    // remove anything already set (like background, color, etc).
    let childStyle = this.props.children.props.style || {};

    // Add a CSS transform to move the element around. This allows us to move the element around
    // without worrying about whether or not it is relatively or absolutely positioned.
    // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
    // has a clean slate.
    let transform = dom.createCSSTransform({
      // Set left if horizontal drag is enabled
      x: Helper.canDragX(this) ?
        this.state.clientX :
        this.props.start.x,

      // Set top if vertical drag is enabled
      y: Helper.canDragY(this) ?
        this.state.clientY :
        this.props.start.y
    });

    // Workaround IE pointer events; see #51
    // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
    let touchHacks = {
      touchAction: 'none'
    };

    let style = Object.assign({}, childStyle, transform, touchHacks);

    // Set zIndex if currently dragging and prop has been provided
    if (this.state.dragging && !isNaN(this.props.zIndex)) {
      style.zIndex = this.props.zIndex;
    }

    let className = classNames((this.props.children.props.className || ''), 'draggable', {
      'draggable-dragging': this.state.dragging,
      'draggable-dragged': this.state.dragged
    });

    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return React.cloneElement(React.Children.only(this.props.children), {
      style: style,
      className: className,

      onMouseDown: this.onMouseDown,
      onTouchStart: this.onTouchStart,
      onMouseUp: this.handleDragEnd,
      onTouchEnd: this.handleDragEnd
    });
  }
}

export default Draggable;
