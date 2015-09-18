import React, { Component } from 'react';
import classNames from 'classnames';
import Events from '../../utils/Events';

class ScrollBar extends Component {
  constructor(props) {
    super(props);
    let newState = this.calculateState(props);
    this.state = {
      position: newState.position,
      scrollSize: newState.scrollSize,
      isDragging: false,
      lastClientPosition: 0
    }
  }

  static propTypes = {
    onMove: React.PropTypes.func,
    realSize: React.PropTypes.number,
    containerSize: React.PropTypes.number,
    position: React.PropTypes.number,
    type: React.PropTypes.oneOf(['vertical', 'horizontal'])
  }

  static defaultProps = {
    type: 'vertical'
  }

  componentDidMount() {
    Events.on(document, "mousemove", this.bindedHandleMouseMove);
    Events.on(document, "mouseup", this.bindedHandleMouseUp);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.calculateState(nextProps));
  }

  componentWillUnmount() {
    Events.off(document, "mousemove", this.bindedHandleMouseMove);
    Events.off(document, "mouseup", this.bindedHandleMouseUp);
  }

  bindedHandleMouseUp = (e) => {
    this.setState({
      isDragging: false
    });
  }

  bindedHandleMouseMove = (e) => {
    let { type, containerSize, realSize } = this.props;

    if (type === 'vertical') {
      let multiplier = containerSize / realSize;
      if (this.state.isDragging) {
        Events.preventDefault(e);
        let deltaY = this.state.lastClientPosition - e.clientY;
        this.setState({
          lastClientPosition: e.clientY
        });
        this.props.onMove(deltaY / multiplier, 0);
      }
    } else {
      let multiplier = this.props.containerSize / this.props.realSize;
      if (this.state.isDragging) {
        Events.preventDefault(e);
        let deltaX = this.state.lastClientPosition - e.clientX;
        this.setState({
          lastClientPosition: e.clientX
        });
        this.props.onMove(0, deltaX / multiplier);
      }
    }
  }
  calculateState(props) {
    let scrollSize = props.containerSize * props.containerSize / props.realSize;
    let multiplier = props.containerSize / props.realSize;
    let position = props.position * multiplier;

    return {
      scrollSize: scrollSize,
      position: position
    };
  }

  handleMouseDown = (e) => {
    let lastClientPosition = this.props.type === 'vertical' ? e.clientY : e.clientX
    this.setState({
      isDragging: true,
      lastClientPosition: lastClientPosition
    });
  }

  createScrollStyles() {
    if (this.props.type === 'vertical') {
      return {
        height: this.state.scrollSize,
        marginTop: this.state.position
      };
    } else {
      return {
        width: this.state.scrollSize,
        marginLeft: this.state.position
      };
    }
  }
  render() {
    let scrollStyle = this.createScrollStyles();

    let scrollbarClasses = classNames(['scrollbar-container', {
      'active': this.state.isDragging,
      'horizontal': this.props.type === 'horizontal',
      'vertical': this.props.type === 'vertical'
    }]);

    return (
      <div className= {scrollbarClasses}>
        <div className= "scrollbar" style={scrollStyle} onMouseDown= {this.handleMouseDown} />
      </div>
    );
  }

}

export default ScrollBar;
