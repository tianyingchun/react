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
  }
};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function (name) {
  _['is' + name] = function (obj) {
    return toString.call(obj) === '[object ' + name + ']';
  };
});

// attach react related helper methods.
Object.assign(_, {
  // empty function.
  noop: function noop() {},

  // simple check property has existed.
  has: function (o, k) {
    return o ? hasOwnProperty.call(o, k) : false;
  }
});


export default _;
