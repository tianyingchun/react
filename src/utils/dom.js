/**
 * The helper utilites for html dom operating..
 */
class Dom {

  /**
   * Get broswer vendor prefix. chrome return 'webkit'
   * @param  {Object} _window default should be window
   * @return {String} the prefix of vendor.
   */
  static getVendorPrefix(_window) {
    if (typeof _window === 'undefined') return '';
    // Thanks David Walsh
    let styles = _window.getComputedStyle(document.documentElement, '');
    let pre = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];
    // short circuit - Jest, why?
    if (typeof pre === 'undefined') return '';
    // // 'ms' is not titlecased
    if (pre === 'ms') return pre;
    return pre.slice(0, 1).toUpperCase() + pre.slice(1);
  }

  // Useful for preventing blue highlights all over everything when dragging.
  static userSelectStyle() {
    return ';user-select: none;';
  }

  /**
   * adds browserPrefix to the select style
   * @return {String} browser prefixed select style
   */
  static selectStyle = () => {
    let userSelectStyle = Dom.userSelectStyle();
    let browserPrefix = Dom.getVendorPrefix(window);

    if (browserPrefix) {
      userSelectStyle += '-' + browserPrefix.toLowerCase() + '-user-select: none;';
    }

    return userSelectStyle;
  }

  static getSelectText(el) {
    return typeof el.selectionStart == 'number' ? el.value.substring(el.selectionStart, el.selectionEnd) : document.selection.createRange().text;
  }
  /**
   * isInViewport
   *
   * @desc determine if any part of the element is visible in the viewport
   * @reference https://github.com/Josh-Miller/isInViewport
   * @param {HTMLElement} element
   * @returns {boolean}
   */

  static isInViewport (element) {
    var top = element.offsetTop;
    var left = element.offsetLeft;
    var width = element.offsetWidth;
    var height = element.offsetHeight;

    while (element.offsetParent) {
      element = element.offsetParent;
      top += element.offsetTop;
      left += element.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }
}

export default Dom;
