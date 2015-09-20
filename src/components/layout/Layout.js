import React from 'react';
import ReactDOM from 'react-dom';
import LayoutSplitter from './LayoutSplitter';

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideSelection: false
    }
    if (props.layoutWidth !== 'flex') {
      if (props.layoutWidth && !this.isNumber(props.layoutWidth)) {
        throw new Error('layoutWidth should be a number or flex')
      }
      this.state.layoutWidth = props.layoutWidth
    }
    if (props.layoutHeight !== 'flex') {
      if (props.layoutHeight && !this.isNumber(props.layoutHeight)) {
        throw new Error('layoutHeight should be a number or flex')
      }
      this.state.layoutHeight = props.layoutHeight
    }

    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    if (this.props.fill === 'window' && window) {
      this.state.layoutWidth = window.innerWidth
      this.state.layoutHeight = window.innerHeight
      this.setState(this.state)
    } else if (!this.props.layoutWidth && !this.props.layoutHeight) {
      let domNode = ReactDOM.findDOMNode(this)
      this.state.layoutWidth = domNode.parentElement.clientWidth
      this.state.layoutHeight = domNode.parentElement.clientHeight
      this.setState(this.state)
    }
  }

  setWidth(newWidth) {
    this.state.layoutWidth = newWidth
    this.setState(this.state)
    if (this.props.layoutChanged) {
      this.props.layoutChanged()
    }
  }

  setHeight(newHeight) {
    this.state.layoutHeight = newHeight
    this.setState(this.state)
    if (this.props.layoutChanged) {
      this.props.layoutChanged()
    }
  }

  childLayoutChanged() {
    // State hasn't changed but render relies on child properties
    this.setState(this.state)
  }

  recalculateFlexLayout() {
    let newFlexDimentions = {}
    if (this.props.children) {
      let numberOfFlexWidths = 0
      let totalAllocatedWidth = 0
      let numberOfFlexHeights = 0
      let totalAllocatedHeight = 0
      let i = 0
      React.Children.map(this.props.children, childDefinition => {
        var childType = childDefinition.type
        if (childType === Layout && !childDefinition.props.layoutWidth && !childDefinition.props.layoutHeight) {
          throw new Error('Child Layouts must have either layoutWidth or layoutHeight set')
        }

        if (childType === Layout || childType === LayoutSplitter) {
          let child = this.refs['layout' + i]
          if (childDefinition.props.layoutWidth === 'flex') { numberOfFlexWidths++ }
          else if (!child && this.isNumber(childDefinition.props.layoutWidth)) { totalAllocatedWidth += childDefinition.props.layoutWidth }
          else if (child && this.isNumber(child.state.layoutWidth)) { totalAllocatedWidth += child.state.layoutWidth }

          if (childDefinition.props.layoutHeight === 'flex') { numberOfFlexHeights++ }
          else if (!child && this.isNumber(childDefinition.props.layoutHeight)) { totalAllocatedHeight += childDefinition.props.layoutHeight }
          else if (child && this.isNumber(child.state.layoutHeight)) { totalAllocatedHeight += child.state.layoutHeight }
        }
        i++
      })

      if (numberOfFlexHeights > 0 && numberOfFlexWidths > 0) {
        throw new Error('Cannot have layout children with both flex widths and heights')
      }
      if (numberOfFlexWidths > 0) {
        var thisWidth = this.state.layoutWidth || this.props.containerWidth
        newFlexDimentions.width = (thisWidth - totalAllocatedWidth) / numberOfFlexWidths
      } else if (numberOfFlexHeights > 0) {
        var thisHeight = this.state.layoutHeight || this.props.containerHeight
        newFlexDimentions.height = (thisHeight - totalAllocatedHeight) / numberOfFlexHeights
      }

      let isHorizontal = numberOfFlexWidths > 0 || totalAllocatedWidth > 0
      let isVertical = numberOfFlexHeights > 0 || totalAllocatedHeight > 0
      if (isHorizontal && isVertical) {
        throw new Error('You can only specify layoutHeight or layoutWidth at a single level')
      } else if (isHorizontal) {
        newFlexDimentions.orientation = 'horizontal'
      } else if (isVertical) {
        newFlexDimentions.orientation = 'vertical'
      }
    }

    return newFlexDimentions
  }

  render() {
    let width = this.props.layoutWidth === 'flex' ? this.props.calculatedFlexWidth : (this.state.layoutWidth || this.props.containerWidth)
    let height = this.props.layoutHeight === 'flex' ? this.props.calculatedFlexHeight : (this.state.layoutHeight || this.props.containerHeight)

    if (!width || !height) {
      // We don't know our size yet (maybe initial render)
      return <div />
    }
    let count = -1
    let calculatedFlexDimentions = this.recalculateFlexLayout()
    let children = React.Children.map(
      this.props.children,
      child => {
        count++
        if (child.type === Layout) {
          let newProps = {
            layoutChanged: this.childLayoutChanged.bind(this),
            calculatedFlexWidth: calculatedFlexDimentions.width,
            calculatedFlexHeight: calculatedFlexDimentions.height,
            containerHeight: height,
            containerWidth: width,
            ref: 'layout' + count
          }
          if (calculatedFlexDimentions.orientation === 'horizontal') {
            let childStyle = child.props.style || {}
            childStyle.float = 'left'
            newProps.style = childStyle
          }
          let cloned = React.cloneElement(child, newProps)
          return cloned
        } else if (child.type === LayoutSplitter) {
          let newProps = {
            layoutChanged: this.childLayoutChanged.bind(this),
            orientation: calculatedFlexDimentions.orientation,
            containerHeight: height,
            containerWidth: width,
            ref: 'layout' + count,
            hideSelection: () => {
              this.setState({ hideSelection: true })
            },
            restoreSelection: () => {
              this.clearSelection()
              this.setState({ hideSelection: false })
            },
            getPreviousLayout: () => {
              let index = this.props.children.indexOf(child)
              return this.refs['layout' + (index - 1)]
            },
            getNextLayout: () => {
              let index = this.props.children.indexOf(child)
              return this.refs['layout' + (index + 1)]
            }
          }
          let cloned = React.cloneElement(child, newProps)
          return cloned
        }
        return child
      })

    let className = null
    if (this.props.className) {
      className = this.props.className
    }
    if (this.state.hideSelection) {
      if (className) { className += ' ' }
      className += 'hideSelection'
    }
    let style = this.props.style || {}
    style.overflow = 'auto'
    style.width = width
    style.height = height
    if (this.props.fill === 'window') {
      style.position = 'absolute'
      style.top = 0
      style.left = 0
    }
    return <div style={style} className={className}>{children}</div>
  }

  isNumber(value) {
    return typeof value === 'number';
  }

  clearSelection() {
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {  // IE?
      document.selection.empty();
    }
  }
}

Layout.propTypes = {
  hideSelection: React.PropTypes.bool
}
