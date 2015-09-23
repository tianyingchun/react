const toString = Object.prototype.toString;
const hasOwnProperty = hasOwnProperty;
const nativeIsArray = Array.isArray;
// extract some undercore utilities here.
const _ = {
  isArray: nativeIsArray || ((obj) => toString.call(obj) === '[object Array]'),
  isUndefined: (obj) => obj === void 0,
  now: Date.now || () => new Date().getTime(),
  isObject: (obj) => {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  },
  /**
   * The helper for check if we can use DOM,
   * we can also used to check if current is Node Environment.
   */
  canUseDOM: !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  ),
  /**
   * Normallize url path, note only can handler url path e.g. /workspace/list
   * Dont handle protocol port (http://)
   * @param  {...paths} paths provider path serialized paramter.
   * @return {String}
   */
  normalizePath: (...paths) => {
    let result = [];
    paths.forEach((path) => {
      result.push(path ? path.replace(/^\/+|\/+$/ig, '') : '');
    });
    let path = '/' + result.join('/');

    return path.replace(/^\/+/ig, '/');
  },

  /**
   * string formatter, _.stringFormat('my name is {0}{1}', 'yingchun', 'tian')
   * @param  {...[string]} args
   * @return {String}      the formatted string.
   */
  stringFormat: (...args) => {
    // use this string as the format,Note {x},x start from 0,1,2
    // walk through each argument passed in
    let fmt = args[0];

    for (let ndx = 1; ndx < args.length; ++ndx) {
      // replace {1} with argument[1], {2} with argument[2], etc.
      let argVal = _.isObject(args[ndx]) ? JSON.stringify(args[ndx]) : args[ndx];
      fmt = fmt.replace(new RegExp('\\{' + (ndx - 1) + '\\}', "g"), argVal);
    }
    // return the formatted string
    return fmt;
  },
  noop: function noop() {},
  has: function (o, k) {
    return o ? hasOwnProperty.call(o, k) : false;
  },
  isShallowEqual: function (a, b) {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    if (typeof a !== 'object' && typeof b !== 'object') {
      return a === b;
    }

    if (typeof a !== typeof b) {
      return false;
    }

    return shallowEqual(a, b);
  },

};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function (name) {
  _['is' + name] = function (obj) {
    return toString.call(obj) === '[object ' + name + ']';
  };
});

export default _;
