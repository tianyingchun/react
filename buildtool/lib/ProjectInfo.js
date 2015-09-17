var path = require('path');
var _ = require('lodash');
var Util = require('./Util');

var cwd = process.cwd();

var build_config = require(path.join(cwd, './build.config'));

var default_config = {
  // hot dev server.
  devServer: {
    host: 'localhost',
    port: 3000,
    publicPath: 'http://localhost:3000/public/'
  }
};

function buildConfig() {
  var buildProjects = build_config.projects || {};
  var buildConfigOptions = build_config.options || {};

  // merge build config options.
  _.extend(default_config, buildConfigOptions);

  // look at if project is valid.
  Object.keys(buildProjects).forEach(function (projectName) {
    var projectLocalDir = path.join(cwd, buildConfigOptions.projectRoot, projectName);
    if (!Util.isDir(projectLocalDir)) {
      console.log('The project `' + projectName + '` found in ./build.config.js but not real existed in' + projectLocalDir);
      delete buildProjects[projectName];
      // skip this project config if the project it not exist.
      return;
    }
  });

  return {
    projects: buildProjects,
    config: default_config
  };

};


module.exports = buildConfig();
