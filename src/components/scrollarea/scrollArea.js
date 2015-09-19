import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Scrollbar from './scrollBar'
import Events from '../../utils/Events';

class ScrollArea extends Component {

  static propTypes = {
    className: React.PropTypes.string,
    speed: React.PropTypes.number,
    contentClassName: React.PropTypes.string,
    vertical: React.PropTypes.bool,
    horizontal: React.PropTypes.bool,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    amSize: React.PropTypes.oneOf(['sm', 'md']) // only small size(sm) and normal size(default)
  }

  static defaultProps = {
    speed: 1,
    vertical: true,
    horizontal: true
  }

  state = {
    topPosition: 0,
    leftPosition: 0,
    realHeight: 0,
    containerHeight: 0,
    realWidth: 0,
    containerWidth: 0,
    scrollableX: false,
    scrollableY: false
  }

  componentDidMount() {
    Events.on(window, "resize", this.bindedHandleWindowResize);
    this.setSizesToState();
  }

  componentWillUnmount() {
    Events.off(window, "resize", this.bindedHandleWindowResize);
  }

  componentDidUpdate() {
    this.setSizesToState();
  }

  handleMove = (deltaY, deltaX) => {
    let newState = this.computeSizes();
    if (this.canScrollY(newState)) {
      newState.topPosition = this.computeTopPosition(deltaY, newState);
    }
    if (this.canScrollX(newState)) {
      newState.leftPosition = this.computeLeftPosition(deltaX, newState);
    }
    this.setState(newState);
  }

  handleWheel = (e) => {
    let newState = this.computeSizes();
    let deltaY = e.deltaY * this.props.speed;
    let deltaX = e.deltaX * this.props.speed;

    if (this.canScrollY(newState)) {
      newState.topPosition = this.computeTopPosition(-deltaY, newState);
    }

    if (this.canScrollX(newState)) {
      newState.leftPosition = this.computeLeftPosition(-deltaX, newState);
    }

    if (this.state.topPosition !== newState.topPosition || this.state.leftPosition !== newState.leftPosition) {
      Events.preventDefault(e);
    }

    this.setState(newState);
  }

  computeTopPosition(deltaY, sizes) {
    let newTopPosition = this.state.topPosition + deltaY;

    if (-newTopPosition > sizes.realHeight - sizes.containerHeight) {
      newTopPosition = -(sizes.realHeight - sizes.containerHeight);
    }
    if (newTopPosition > 0) {
      newTopPosition = 0;
    }
    return newTopPosition;
  }

  computeLeftPosition(deltaX, sizes) {
    let newLeftPosition = this.state.leftPosition + deltaX;
    if (-newLeftPosition > sizes.realWidth - sizes.containerWidth) {
      newLeftPosition = -(sizes.realWidth - sizes.containerWidth);
    } else if (newLeftPosition > 0) {
      newLeftPosition = 0;
    }

    return newLeftPosition;
  }

  bindedHandleWindowResize = () => {
    let newState = this.computeSizes();
    let bottomPosition = newState.realHeight - newState.containerHeight;
    if (-this.state.topPosition >= bottomPosition) {
      newState.topPosition = this.canScrollY(newState) ? -bottomPosition : 0;
    }

    let rightPosition = newState.realWidth - newState.containerWidth;
    if (-this.state.leftPosition >= rightPosition) {
      newState.leftPosition = this.canScrollX(newState) ? -rightPosition : 0;
    }

    this.setState(newState);
  }

  computeSizes() {
    let realHeight = this.refs.content.offsetHeight;
    let containerHeight = ReactDOM.findDOMNode(this).offsetHeight;
    let realWidth = this.refs.content.offsetWidth;
    let containerWidth = ReactDOM.findDOMNode(this).offsetWidth;
    let scrollableY = realHeight > containerHeight || this.state.topPosition != 0;
    let scrollableX = realWidth > containerWidth || this.state.leftPosition != 0;

    return {
      realHeight: realHeight,
      containerHeight: containerHeight,
      realWidth: realWidth,
      containerWidth: containerWidth,
      scrollableX: scrollableX,
      scrollableY: scrollableY
    };
  }

  setSizesToState() {
    let sizes = this.computeSizes();
    if (sizes.realHeight !== this.state.realHeight || sizes.realWidth !== this.state.realWidth) {
      this.setState(sizes);
    }
  }

  scrollTop() {
    this.setState({
      topPosition: 0
    });
  }

  scrollBottom() {
    this.setState({
      topPosition: -(this.state.realHeight - this.state.containerHeight)
    });
  }

  canScrollY(state = this.state) {
    return state.scrollableY && this.props.vertical;
  }

  canScrollX(state = this.state) {
    return state.scrollableX && this.props.horizontal;
  }
  render() {

    let { width, height, amSize, className, contentClassName } = this.props;

    let { realHeight, containerHeight, topPosition } = this.state;

    let scrollbarY = this.canScrollY() ?
      (
        <Scrollbar
          realSize = {realHeight}
          containerSize = {containerHeight}
          position = {-topPosition}
          onMove = {this.handleMove}
          type = "vertical"
          amSize ={amSize} />
      ) : null;

    let { realWidth, containerWidth, leftPosition } = this.state;

    let scrollbarX = this.canScrollX() ?
      (
        <Scrollbar
        realSize = {realWidth}
        containerSize = {containerWidth}
        position = {-leftPosition}
        onMove = {this.handleMove}
        type = "horizontal"
        amSize ={amSize} />
      ) : null;

    let style = {
      marginTop: this.state.topPosition,
      marginLeft: this.state.leftPosition
    };

    let scrollAreaStyle = {
      width: width,
      height: height
    };

    let classes = classNames('scrollarea' ,className);
    let contentClasses = classNames('scrollarea-content', contentClassName);

    return (
      <div className = {classes} style={scrollAreaStyle} onWheel = {this.handleWheel}>
        <div ref= "content" style={style} className = {contentClasses}>
          {this.props.children}
        </div>
        {scrollbarY} {scrollbarX}
      </div>
    );
  }

}

export default ScrollArea;
