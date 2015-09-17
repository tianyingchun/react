import url from 'wurl';
const toString = Object.prototype.toString;
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
  )
};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function (name) {
  _['is' + name] = function (obj) {
    return toString.call(obj) === '[object ' + name + ']';
  };
});

const stringFormat = (...args) => {
  // use this string as the format,Note {x},x start from 0,1,2
  // walk through each argument passed in
  for (let fmt = args[0], ndx = 1; ndx < args.length; ++ndx) {
    // replace {1} with argument[1], {2} with argument[2], etc.
    let argVal = _.isObject(args[ndx]) ? JSON.stringify(args[ndx]) : args[ndx];
    fmt = fmt.replace(new RegExp('\\{' + (ndx - 1) + '\\}', "g"), argVal);
  }
  // return the formatted string
  return fmt;
};

const normalizePath = (...paths) => {
  let result = [];
  paths.forEach((path) => {
    result.push(path ? path.replace(/^\/+|\/+$/ig, '') : '');
  });
  let path = '/' + result.join('/');

  return path.replace(/^\/+/ig, '/');
};

/**
 * get url path.
 * @param  {String} path  the url path '/workspace/list'
 * @param  {Object} query parameters {root:''}
 * @return {String}       the final path
 */
const getYunRoot = (path, query) => {
  const port = url('port'); // 443, 80.
  const hostname = url('hostname');
  const protocol = url('protocol');
  let finalPath = stringFormat('{0}://{1}{2}{3}', protocol, hostname, (port === 443 || port === 80) ? '' : (':' + port), normalizePath(path));
  if (_.isObject(query)) {
    var queryPath = [];
    Object.keys(query).forEach((key) => {
      queryPath.push(`${key}=${query[key]}`);
    });
    return finalPath + '?' + queryPath.join('&').replace(/^&+/, '');
  } else {
    return finalPath;
  }
};

const getWorkspaceRoot = (path, query) => {
  return getYunRoot(normalizePath('/workspace', path), query);
}

const getDocumentRoot = (path, query) => {
  return getYunRoot(normalizePath('/document', path), query);
}


export default {
  PATH: {
    getYunRoot,
    getWorkspaceRoot,
    getDocumentRoot
  },
  STRING: {
    format: stringFormat
  },
  ..._
};
