import browser from './platform';
import { canUseDOM } from './environment';

const STYLE = {
  /**
   * Get browser vendor prefix. chrome return 'webkit'
   * @return {String} the prefix of vendor.
   */
  getVendorPrefix() {
    if (!canUseDOM) return '';

    let { msie, version } = browser;

    if (msie && parseInt(version) <= 9) {
      return '';
    }
    // Thanks David Walsh
    let styles = window.getComputedStyle(document.documentElement, '');
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
  },

  /**
   * adds browserPrefix to the select style
   * @return {String} browser prefixed select style
   */
  selectStyle (){

    // Useful for preventing blue highlights all over everything when dragging.
    let userSelectStyle = ';user-select: none;';
    let browserPrefix = STYLE.getVendorPrefix(window);

    if (browserPrefix) {
      userSelectStyle += '-' + browserPrefix.toLowerCase() + '-user-select: none;';
    }

    return userSelectStyle;
  },

  createCSSTransform (style) {
    // Replace unitless items with px
    let x = style.x + 'px';
    let y = style.y + 'px';
    let out = {
      transform: 'translate(' + x + ',' + y + ')'
    };
    let browserPrefix = STYLE.getVendorPrefix();

    // Add single prefixed property as well
    if (browserPrefix) {
      out[browserPrefix + 'Transform'] = out.transform;
    }
    return out;
  }
}

export default STYLE;
