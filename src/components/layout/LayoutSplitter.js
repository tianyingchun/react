import React, { PropTypes } from 'react';
import events from '../../utils/events';
import classNames from 'classnames';
export class LayoutSplitter extends React.Component {

  static propTypes = {
    orientation: PropTypes.string,
    hideSelection: PropTypes.func,
    getPreviousLayout: PropTypes.func,
    getNextLayout: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.document = props.document || document;

    this.state = {
      active: false
    };
  }

  componentDidMount() {
    let { splitterSize, orientation, layoutWidth, layoutHeight, layoutChanged } = this.props;

    if (orientation === 'horizontal') {
      this.state.layoutWidth = layoutWidth || 11;
      layoutChanged();
    } else if (orientation === 'vertical') {
      this.state.layoutHeight = layoutHeight || 11;
      layoutChanged();
    }
  }

  componentWillUnmount() {
    events.off(this.document, 'mouseup', this.handleDragEnd);
    events.off(this.document, 'mousemove', this.handleDrag);
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

  handleDragStart = (e) => {

    let { orientation, getPreviousLayout, getNextLayout } = this.props;

    let downPosition = orientation === 'horizontal' ? e.clientX : e.clientY;
    let layoutProp = orientation === 'horizontal' ? 'layoutWidth' : 'layoutHeight';
    let updateFunctionName = orientation === 'horizontal' ? 'setWidth' : 'setHeight';

    let layout1 = getPreviousLayout();
    let layout2 = getNextLayout();

    if ((layout1.props.layoutWidth === 'flex' && layout2.props.layoutWidth === 'flex') ||
        (layout1.props.layoutHeight === 'flex' && layout2.props.layoutHeight === 'flex')) {
      throw new Error('You cannot place a LayoutSplitter between two flex Layouts');
    }

    if (layout1 && layout2) {
      this.props.hideSelection();
      let isLayout1Flex = layout1.props[layoutProp] === 'flex';
      let isLayout2Flex = layout2.props[layoutProp] === 'flex';
      let newPositionHandler;

      if (isLayout1Flex && isLayout2Flex) {
        throw new Error('Do not support resizing two flex Layouts')
      } else if (isLayout1Flex || isLayout2Flex) {

        // Layout 1 has fixed size
        let originalSize1 = layout1.state[layoutProp];

        let originalSize2 = layout2.state[layoutProp];

        newPositionHandler = (currentPosition) => {
          let delta1 = currentPosition - downPosition;
          let newSize1 = originalSize1 + delta1;
          layout1[updateFunctionName](newSize1);

          let delta2 = downPosition - currentPosition;
          let newSize2 = originalSize2 + delta2;
          layout2[updateFunctionName](newSize2);
        }
      }
      else {
        // Both are fixed width
        let originalSize1 = layout1.state[layoutProp];
        let originalSize2 = layout2.state[layoutProp];
        newPositionHandler = (currentPosition) => {
          let delta = currentPosition - downPosition;
          layout1[updateFunctionName](originalSize1 + delta);
          layout2[updateFunctionName](originalSize2 - delta);
        }
      }

      // force render.
      this.setState({
        active: true,
        newPositionHandler: newPositionHandler
      });
    }

    events.on(this.document, 'mouseup', this.handleDragEnd);
    events.on(this.document, 'mousemove', this.handleDrag);
  }

  handleDragEnd = (e) => {
    if (this.state.active) {
      this.setState({ active: false });
      this.props.restoreSelection();
    }
  }

  handleDrag = (e) => {
    if (this.state.active) {
      let currentPosition = this.props.orientation === 'horizontal' ? e.clientX : e.clientY;
      this.state.newPositionHandler(currentPosition)
    }
  }

  render() {
    //let orientation = this.props.orientation;
    let classes = ['layout-splitter', this.props.orientation];
    let style = {
      width: this.state.layoutWidth || this.props.containerWidth,
      height: this.state.layoutHeight || this.props.containerHeight
    }

    return <div className={classNames(classes)} style={style}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.handleDragEnd} />
  }
}


export default LayoutSplitter;
