let getPrefix = (_window) => {
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
};

export default getPrefix;
