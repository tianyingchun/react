var InitGruntConfig = require('./InitGruntConfig');

// webpack_build task.
var webpackBuildTask = function (grunt) {

  grunt.registerTask('webpack_build', function (targetMode) {

    grunt.log.ok('----Run task `webpack_build` build task: `' + targetMode + '`----');

    switch (targetMode) {
      case 'devBuild':
        // run dev build with `sourcemap`.
        grunt.task.run(['prompt:devBuild']);
        break;

      case 'prodBuild':
        // run prod build flow for production build.
        grunt.task.run(['prompt:prodBuild']);
        break;

      default:
        grunt.fail.fatal('Can not supports task `webpack_build:' + targetMode + '`');
    }
  });
};

// dependency of `webpack_build`
var devBuildTask = function (grunt) {
  // dev-build task.
  grunt.registerTask('dev-build', 'development build task', function () {

    // dynamic init prompt grunt task
    InitGruntConfig.initPromptConfig(grunt);
    grunt.task.run(['webpack_build:devBuild']);
  });
};

// dependency of `webpack_build`
var prodBuildTask = function (grunt) {
  // prod-build task
  grunt.registerTask('prod-build', 'production build task', function () {
    // dynamic init prompt grunt task
    InitGruntConfig.initPromptConfig(grunt);
    grunt.task.run(['webpack_build:prodBuild']);
  });
};

var devHotServerTask = function (grunt) {
  // hot dev server task.
  grunt.registerTask('hot', 'webpack hot dev server task', function (projectName) {
    if (!projectName) {
      grunt.fail.fatal('projectName is required!');
    }
    // dynamic init 'webpack-dev-server' grunt task
    InitGruntConfig.initWebpackDevServerConfig(grunt, projectName);

    grunt.task.run(['webpack-dev-server:' + projectName]);
  });
};


module.exports = {
  webpackBuildTask: webpackBuildTask,
  // APIs
  devBuildTask: devBuildTask,
  prodBuildTask: prodBuildTask,
  devHotServerTask: devHotServerTask
};
