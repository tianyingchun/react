import _ from './lang';
const string = {
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
  }
};

export default string;
