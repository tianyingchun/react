import getPrefix from './getVendorPrefix';
let browserPrefix = getPrefix(window);

class Style {
  // Useful for preventing blue highlights all over everything when dragging.
  static get userSelectStyle() {
    return ';user-select: none;';
  }

  /**
   * adds browserPrefix to the select style
   * @return {String} browser prefixed select style
   */
  static selectStyle = () => {
    let userSelectStyle = Style.userSelectStyle;

    if (browserPrefix) {
      userSelectStyle += '-' + browserPrefix.toLowerCase() + '-user-select: none;';
    }

    return userSelectStyle;
  }

  /**
   * snap the x,y coords to a grid
   * @param  {Array}  grid     x,y snap bounds
   * @param  {Number} pendingX potential x value
   * @param  {Number} pendingY potential y value
   * @return {Array}           tuple of actual x,y
   */
  static snapToGrid = (grid, pendingX, pendingY) => {
    let x = Math.round(pendingX / grid[0]) * grid[0];
    let y = Math.round(pendingY / grid[1]) * grid[1];
    return [x, y];
  }

  static addUserSelectStyles = (draggable) => {
    if (!draggable.props.enableUserSelectHack) {
      return new Error('UserSelectHack is not enabled');
    }

    let style = document.body.getAttribute('style') || '';
    document.body.setAttribute('style', style + Style.selectStyle());
  };

  static removeUserSelectStyles = (draggable) => {
    if (!draggable.props.enableUserSelectHack) {
      return new Error('UserSelectHack is not enabled');
    }

    let style = document.body.getAttribute('style') || '';
    document.body.setAttribute('style', style.replace(Style.selectStyle(), ''));
  }

  static createCSSTransform = (style) => {
    // Replace unitless items with px
    let x = style.x + 'px';
    let y = style.y + 'px';
    let out = {
      transform: 'translate(' + x + ',' + y + ')'
    };
    // Add single prefixed property as well
    if (browserPrefix) {
      out[browserPrefix + 'Transform'] = out.transform;
    }
    return out;
  }
}

export default Style;
