import { canUseDOM } from './environment';
/**
 * The helper utilites for html dom operating..
 */
const dom = {

  getSelectText(el) {
    if (!canUseDOM) return '';
    return typeof el.selectionStart == 'number' ? el.value.substring(el.selectionStart, el.selectionEnd) : document.selection.createRange().text;
  },

  contains (root, node) {
    while (node) {
      if (node === root) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  },
  /**
   * isInViewport
   *
   * @desc determine if any part of the element is visible in the viewport
   * @reference https://github.com/Josh-Miller/isInViewport
   * @param {HTMLElement} element
   * @returns {boolean}
   */

  isInViewport (element) {
    if (!canUseDOM) {
      return false;
    }
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

export default dom;
