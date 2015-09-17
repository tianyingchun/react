import path from 'path';
import url from 'url';
import debug from 'debug';
import config from '../../build.config.js';
import _ from 'lodash';

const logger = debug('iso:serverRenderParams');

/**
 * Dynamic load routes, resources for isomorphic server via ./build.config.js
 * only can be used in node environment.
 * @param  {Object} req express get req
 * @param  {Object} env node process.env.NODE_ENV
 */
const getRenderParams = (req, env) => {
  let routes;
  let jsBundles = [];
  let cssBundles = [];
  // The sub project, the current load project.
  let fundProject = null;

  const projects = config.projects;
  const options = config.options;

  // iso static cdn root.
  const cdnRoot = env === 'development' ? options.assets.dev : options.assets.prod;

  // '/workspace/list?name=tyc&type=1&other'
  // const url = req.url;

  // { name: 'tyc', type: '1', other: '' }
  const query = req.query;

  // const params = req.params;
  // '/workspace/list'
  const urlPath = req.path;

  // logger('url path', url, query, urlPath);

  _.each(projects, function (project, projectName) {
    let _project = null;
    _.each(project, function (subProject, subProjectName) {
      // logger('subporject: ', subProject)
      if (subProject.match && subProject.match.test(urlPath)) {
        _project = subProject;
        // project name.
        _project.projectName = projectName;
        // sub project name.
        _project.subProjectName = subProjectName;
        return false;
      }
    });
    if (_.isObject(_project)) {
      // logger('found: ', _project);
      fundProject = _project

      return false;
    }
  });

  if (_.isObject(fundProject)) {
    let version = fundProject.version || '';

    // generate all css bundle files.
    _.each(fundProject.cssBundles || [], function (css) {
      cssBundles.push(url.resolve(cdnRoot, _.template(css)({
        version: version
      })));
    });

    // generate all js bundle files.
    _.each(fundProject.jsBundles || [], function (js) {
      jsBundles.push(url.resolve(cdnRoot, _.template(js)({
        version: version
      })));
    });

    try {
      // the routes of current sub project(project).
      routes = require(path.join(process.cwd(), fundProject.routes));
    } catch (e) {
      routes = null;
    }
  } else {
    console.warn('=========can not find any matched routes!!!=========');
  }

  let result = {
    project: fundProject,
    routes,
    jsBundles,
    cssBundles
  };

  // logger('result: ', result);
  return result;
}

export default getRenderParams;
