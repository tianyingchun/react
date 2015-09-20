import url from 'wurl';
import _ from '../../src/utils/lang';

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
  let finalPath = _.stringFormat('{0}://{1}{2}{3}', protocol, hostname, (port === 443 || port === 80) ? '' : (':' + port), _.normalizePath(path));
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
  return getYunRoot(_.normalizePath('/workspace', path), query);
}

const getDocumentRoot = (path, query) => {
  return getYunRoot(_.normalizePath('/document', path), query);
}


export default {
  PATH: {
    getYunRoot,
    getWorkspaceRoot,
    getDocumentRoot
  },
  ..._
};
