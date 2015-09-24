const path = {
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
  }
};

export default path;
