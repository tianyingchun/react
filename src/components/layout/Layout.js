import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import LayoutSplitter from './LayoutSplitter';
import dom from '../../utils/dom';
import events from '../../utils/events';
import _ from '../../utils/lang';

class Layout extends Component {

  static propTypes = {
    /**
     * By default, we add 'user-select:none' attributes to the document body
     * to prevent ugly text selection during drag. If this is causing problems
     * for your app, set this to `false`.
     */
    enableUserSelectHack: React.PropTypes.bool
  }

  static defaultProps = {
    enableUserSelectHack: true
  }

  constructor(props) {
    super(props);

    this.state = {};

    if (props.layoutWidth !== 'flex') {
      if (props.layoutWidth && !_.isNumber(props.layoutWidth)) {
        throw new Error('layoutWidth should be a number or flex');
      }
      this.state.layoutWidth = props.layoutWidth;
    }
    if (props.layoutHeight !== 'flex') {
      if (props.layoutHeight && !_.isNumber(props.layoutHeight)) {
        throw new Error('layoutHeight should be a number or flex');
      }
      this.state.layoutHeight = props.layoutHeight;
    }

  }

  componentDidMount() {
    events.on(window, 'resize', this.handleResize);
    // auto trigger onece.
    this.handleResize();
  }

  componentWillUnmount() {
    events.off(window, 'resize', this.handleResize);
  }

  handleResize = () => {
    if (this.props.fill === 'window' && window) {
      this.state.layoutWidth = window.innerWidth;
      this.state.layoutHeight = window.innerHeight;
      this.setState(this.state);

    } else if (!this.props.layoutWidth && !this.props.layoutHeight) {
      let domNode = ReactDOM.findDOMNode(this)
      this.state.layoutWidth = domNode.parentElement.clientWidth;
      this.state.layoutHeight = domNode.parentElement.clientHeight;
      this.setState(this.state);
    }
  }

  setWidth(newWidth) {
    this.state.layoutWidth = newWidth;
    this.setState(this.state);
    if (this.props.layoutChanged) {
      this.props.layoutChanged();
    }
  }

  setHeight(newHeight) {
    this.state.layoutHeight = newHeight;
    this.setState(this.state);
    if (this.props.layoutChanged) {
      this.props.layoutChanged();
    }
  }

  childLayoutChanged() {
    // State hasn't changed but render relies on child properties
    this.setState(this.state);
  }

  recalculateFlexLayout() {
    let newFlexDimentions = {};
    if (this.props.children) {
      let numberOfFlexWidths = 0;
      let totalAllocatedWidth = 0;
      let numberOfFlexHeights = 0;
      let totalAllocatedHeight = 0;
      let i = 0;
      React.Children.map(this.props.children, childDefinition => {
        var childType = childDefinition.type;
        if (childType === Layout && !childDefinition.props.layoutWidth && !childDefinition.props.layoutHeight) {
          throw new Error('Child Layouts must have either layoutWidth or layoutHeight set');
        }

        if (childType === Layout || childType === LayoutSplitter) {
          let child = this.refs['layout' + i];

          //horizontal
          if (childDefinition.props.layoutWidth === 'flex') {
            numberOfFlexWidths++;
          } else if (!child && _.isNumber(childDefinition.props.layoutWidth)) {
            totalAllocatedWidth += childDefinition.props.layoutWidth;
          } else if (child && _.isNumber(child.state.layoutWidth)) {
            totalAllocatedWidth += child.state.layoutWidth;
          }

          //vertical
          if (childDefinition.props.layoutHeight === 'flex') {
            numberOfFlexHeights++;
          } else if (!child && _.isNumber(childDefinition.props.layoutHeight)) {
            totalAllocatedHeight += childDefinition.props.layoutHeight;
          } else if (child && _.isNumber(child.state.layoutHeight)) {
            totalAllocatedHeight += child.state.layoutHeight;
          }
        }
        i++;
      });

      if (numberOfFlexHeights > 0 && numberOfFlexWidths > 0) {
        throw new Error('Cannot have layout children with both flex widths and heights');
      }
      if (numberOfFlexWidths > 0) {
        var thisWidth = this.state.layoutWidth || this.props.containerWidth;
        newFlexDimentions.width = (thisWidth - totalAllocatedWidth) / numberOfFlexWidths;
      } else if (numberOfFlexHeights > 0) {
        var thisHeight = this.state.layoutHeight || this.props.containerHeight;
        newFlexDimentions.height = (thisHeight - totalAllocatedHeight) / numberOfFlexHeights;
      }

      let isHorizontal = numberOfFlexWidths > 0 || totalAllocatedWidth > 0;
      let isVertical = numberOfFlexHeights > 0 || totalAllocatedHeight > 0;
      if (isHorizontal && isVertical) {
        throw new Error('You can only specify layoutHeight or layoutWidth at a single level')
      } else if (isHorizontal) {
        newFlexDimentions.orientation = 'horizontal';
      } else if (isVertical) {
        newFlexDimentions.orientation = 'vertical';
      }
    }

    return newFlexDimentions;
  }

  render() {
    let width = this.props.layoutWidth === 'flex' ? this.props.calculatedFlexWidth : (this.state.layoutWidth || this.props.containerWidth);
    let height = this.props.layoutHeight === 'flex' ? this.props.calculatedFlexHeight : (this.state.layoutHeight || this.props.containerHeight);

    if (!width || !height) {
      // We don't know our size yet (maybe initial render)
      return <div />;
    }
    let count = -1;
    let calculatedFlexDimentions = this.recalculateFlexLayout();
    let children = React.Children.map(
      this.props.children,
      child => {
        count++;
        if (child.type === Layout) {
          let newProps = {
            layoutChanged: this.childLayoutChanged.bind(this),
            calculatedFlexWidth: calculatedFlexDimentions.width,
            calculatedFlexHeight: calculatedFlexDimentions.height,
            containerHeight: height,
            containerWidth: width,
            ref: 'layout' + count
          };

          if (calculatedFlexDimentions.orientation === 'horizontal') {
            let childStyle = child.props.style || {};
            childStyle.float = 'left';
            newProps.style = childStyle;
          }

          return  React.cloneElement(child, newProps);

        } else if (child.type === LayoutSplitter) {
          let newProps = {
            layoutChanged: this.childLayoutChanged.bind(this),
            orientation: calculatedFlexDimentions.orientation,
            containerHeight: height,
            containerWidth: width,
            ref: 'layout' + count,
            hideSelection: () => {
              this.addUserSelectStyles();
            },
            restoreSelection: () => {
              this.removeUserSelectStyles();
            },
            getPreviousLayout: () => {
              let index = this.props.children.indexOf(child);
              return this.refs['layout' + (index - 1)];
            },
            getNextLayout: () => {
              let index = this.props.children.indexOf(child);
              return this.refs['layout' + (index + 1)];
            }
          }
          return React.cloneElement(child, newProps);
        };
        return child;
      });

    let className = {
      [this.props.className]: !!this.props.className
    };

    let style = Object.assign({}, this.props.style || {}, {
      overflow: 'auto',
      width: width,
      height: height
    });

    if (this.props.fill === 'window') {
      Object.assign(style, {
        position:'absolute',
        top: 0,
        left: 0
      });
    }

    return <div style={style} className={classNames(className)}>{children}</div>;
  }

  /**
   * add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag.
   */
  addUserSelectStyles = () => {
    if (this.props.enableUserSelectHack) {
      let style = document.body.getAttribute('style') || '';
      document.body.setAttribute('style', style + dom.selectStyle());
    } else {
      console.warn('UserSelectHack is not enabled');
    }
  }
  /**
   * remove 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag.
   */
  removeUserSelectStyles = () => {
    if (this.props.enableUserSelectHack) {
      let style = document.body.getAttribute('style') || '';
      document.body.setAttribute('style', style.replace(dom.selectStyle(), ''));
    }
    else {
      console.warn('UserSelectHack is not enabled');
    }
  }

}
export default Layout;

