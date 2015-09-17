var Task = require('./Task');
var VerifyEnv = require('./VerifyEnv');

function init(grunt) {
  Task.webpackBuildTask(grunt);
}

module.exports = function (grunt) {

  if (!VerifyEnv(grunt)) {
    return;
  }
  // Initial bindengine infrastructures.
  init(grunt);

  // API: grunt dev-build
  Task.devBuildTask(grunt);

  // API: grunt prod-build
  Task.prodBuildTask(grunt);

  // API: grunt hot:{projectName}.
  Task.devHotServerTask(grunt);

};
