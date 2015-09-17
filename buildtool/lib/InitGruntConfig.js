var url = require('url');
var _ = require('lodash');
var path = require('path');
var projectInfo = require('./ProjectInfo');
var webpackDevConfig = require('../webpack.dev.config');
var webpackProdConfig = require('../webpack.prod.config');
var default_config = projectInfo.config;

/**
 * get specificed webpack via various conditions.
 * @param  {Object} grunt
 * @param  {String} mode        'devServer','devBuild','prodBuild'
 * @param  {Object} projects     projects defined in build.config.js
 * @return {Object}              webpack configuration
 */
var getWebpackConfig = function (grunt, mode, projects) {
  var result = {};

  // The webpack dev server socket config for development phase.
  var dev_server_entry = [
    'webpack-dev-server/client?' + url.format({
      protocol: 'http',
      hostname: default_config.devServer.host,
      port: default_config.devServer.port
    }), 'webpack/hot/only-dev-server'
  ];

  Object.keys(projects).forEach(function (projectName) {
    var webpack = null;
    var project = projects[projectName];
    // create build task config 'project.subProject'
    Object.keys(project).forEach(function (subProjectName) {

      // current subProject.
      var subProject = project[subProjectName];

      // console.log('subProject', project, subProject)
      switch (mode) {
        // hot dev server
        case 'devServer':
          webpack = webpackDevConfig();
          webpack.output.path = default_config.built.baseDir;
          webpack.output.publicPath = default_config.assets.dev;

          // Add source mapping for debuging.
          // use sourcemap, convenient for debugging.
          webpack.devtool = 'eval-source-map';

          // override webpack.entry
          webpack.entry[subProjectName] = dev_server_entry.concat([subProject.entry]);

          break;
        case 'devBuild':
          webpack = webpackDevConfig();
          webpack.output.path = path.join(default_config.built.baseDir, 'debug');
          webpack.output.publicPath = default_config.assets.dev;

          // override webpack.entry
          webpack.entry[subProjectName] = [subProject.entry]

          break;
        case 'prodBuild':
          webpack = webpackProdConfig();
          webpack.output.path = default_config.built.baseDir;
          webpack.output.publicPath = default_config.assets.prod;

          // override webpack.entry
          webpack.entry[subProjectName] = [subProject.entry];

          break;
      }

      var oExtractTextPlugin = _.find(webpack.plugins, function (item) {
        return 'ExtractTextPlugin' === item.constructor.name;
      });

      var oModuleUrlLoader = _.find(webpack.module.loaders, function (item) {
        return item.loader === 'url-loader';
      });

      // Set dist location for transfer url resources.
      _.extend(oModuleUrlLoader.query, _.mapValues(default_config.assets.urlLoaderQuery, function (val) {
        return _.template(val)({
          projectName: projectName
        });
      }));


      // Dynamic generate jsBundles, cssBundles for corresponding project.
      // ------------------------------------------------------------------
      // workspace/member/v1000/bundle.js --with version.
      // workspace/member/bundle.js
      // filename: '${projectName}/${subProjectName}/${version}/bundle.js'

      var cssBundlePath = path.normalize(_.template(oExtractTextPlugin.filename)({
        projectName: projectName,
        version: subProject.version || ''
      }));

      grunt.log.writeln('\n---------------------------------------------------\n');
      grunt.log.ok('cssBundlePath:' + cssBundlePath);

      oExtractTextPlugin.filename = cssBundlePath;
      var jsBundlePath = path.normalize(_.template(webpack.output.filename)({
        projectName: projectName,
        version: subProject.version || ''
      }));

      grunt.log.ok('jsBundlePath:' + jsBundlePath);
      webpack.output.filename = jsBundlePath; //'[name].dev-hot.entry.js';

      var task_target_name = projectName + '.' + subProjectName;
      result[task_target_name] = webpack;
      grunt.log.ok('webpack task target name: ', task_target_name);
      grunt.log.writeln('\n---------------------------------------------------');

    });

  });

  return result;
};

/**
 * Prepare grunt `webpack` configuration
 * @param  {Object} grunt
 * @param  {String} mode  'devServer','devBuild','prodBuild'
 * @param  {String} projectName    optional
 * @param  {String} subProjectName optional
 * @return {void}
 */
var prepareWebpackConfig = function (grunt, mode, projectName, subProjectName) {

  var buildProjects = projectInfo.projects || {};
  // specificed project name.
  if (projectName) {
    buildProjects = _.pick(buildProjects, [projectName]);
  }
  // specificed subProject name.
  if (subProjectName) {
    var project_path = projectName + '.' + subProjectName;
    if (!_.result(buildProjects, project_path)) {
      grunt.fail.fatal('The project `' + project_path + '` can not be fund in build.config.js')
      return;
    }
    buildProjects[projectName] = _.pick(buildProjects[projectName], [subProjectName]);
  }

  return getWebpackConfig(grunt, mode, buildProjects);
};

// prompt task callback handler.
var promptTaskCallback = function (grunt, promptResult, mode) {
  var buildProjectName = promptResult['list.all.projects'];

  if (buildProjectName === 'build_all_projects') {

    if (true === promptResult['build.all.project.confirm']) {
      grunt.config.set('webpack', prepareWebpackConfig(grunt, mode));
      grunt.log.ok('building all projects defined in ./build.config.js');
      grunt.task.run(['webpack']);
    } else {
      grunt.log.ok('Task `build all projects ` cancelled');
    }
  } else {

    var buildSubProject = promptResult['build.specific.subproject'];
    if (buildSubProject === 'build_all_sub_projects') {
      buildSubProject = '';
    }
    grunt.config.set('webpack', prepareWebpackConfig(grunt, mode, buildProjectName, buildSubProject));
    grunt.log.ok('building: ', 'project[' + buildProjectName + ']' + '.' + 'subProject[' + buildSubProject + ']');
    // run `webpack` task
    grunt.task.run(['webpack']);
  }
};
// initialize grunt `prompt` task config data.
var initPromptConfig = function (grunt) {

  // all projects.
  var projects = projectInfo.projects;

  // sub project choices.
  var subProjectChoices = [];

  subProjectChoices.push({
    name: 'build_all_sub_projects',
    value: 'build_all_sub_projects',
    checked: true
  });

  // project choices.
  var projectChoices = [];

  projectChoices.push({
    name: 'build_all_projects',
    value: 'build_all_projects',
    checked: true
  });

  Object.keys(projects).forEach(function (projectName) {
    projectChoices.push({
      name: projectName,
      value: projectName
    });
  });

  // prompt questions.
  var questions = [];

  questions.push({
    config: 'list.all.projects',
    type: 'list',
    message: 'Which project would you like to build ?',
    default: 'build_all_projects',
    choices: projectChoices
  });

  questions.push({
    config: 'build.specific.subproject',
    type: 'list',
    message: 'What specific sub project would you like to build ?',
    choices: function () {
      return subProjectChoices;
    },
    when: function (answers) {
      var answer = answers['list.all.projects'];
      var buildAllProject = (answer === 'build_all_projects');

      // if we need to build specific sub project, need to return true.
      if (!buildAllProject) {
        var projectInfo = projects[answer];
        // build specific sub project
        Object.keys(projectInfo).forEach(function (subProjectName) {
          subProjectChoices.push({
            name: subProjectName,
            value: subProjectName
          });
        });
      }
      return !buildAllProject;
    }
  });

  questions.push({
    config: 'build.all.project.confirm',
    type: 'confirm',
    message: 'Are you sure you need to compile all projects at a time?',
    when: function (answers) {
      var answer = answers['list.all.projects'];
      // if we will build all project need second confirm.
      return answer === 'build_all_projects';
    }
  });

  // set grunt prompt config
  grunt.config.set('prompt', {
    devBuild: {
      // for `devBuild` prompt.
      options: {
        questions: questions,
        then: function (results, done) {
          // console.log('then().', results);
          promptTaskCallback(grunt, results, 'devBuild');
        }
      }
    },
    prodBuild: {
      // for `prodBuild` prompt.
      options: {
        questions: questions,
        then: function (results, done) {
          promptTaskCallback(grunt, results, 'prodBuild');
        }
      }
    }
  });
};
// initial webpack-dev-server config.
var initWebpackDevServerConfig = function (grunt, projectName) {

    var projects = projectInfo.projects;

    if (!projects[projectName]) {
      grunt.fail.fatal('The project `' + projectName + '` can not be fund in build.config.js')
      return;
    }
    var devHotConfig = prepareWebpackConfig(grunt, 'devServer', projectName);

    var entries = {};
    var targetConfig = null;
    Object.keys(devHotConfig).forEach(function (taskTargetName) {
      if (targetConfig === null) {
        targetConfig = devHotConfig[taskTargetName];
      }
      _.extend(entries, devHotConfig[taskTargetName].entry);
    });

    if (targetConfig) {
      targetConfig.entry = entries;
    }

    var config = {
      options: {
        webpack: targetConfig,
        publicPath: default_config.devServer.publicPath
      }
    };

    config[projectName] = {
      keepAlive: true,
      hot: true,
      historyApiFallback: true,
      host: default_config.devServer.host,
      port: default_config.devServer.port,
      stats: {
        colors: true
      }
    };
    // console.log(JSON.stringify(config))

    grunt.config.set('webpack-dev-server', config);
  }
  /**
   * Initialize grunt config task section data.
   * @param  {Object} grunt
   */
module.exports = {
  initWebpackDevServerConfig: initWebpackDevServerConfig,
  initPromptConfig: initPromptConfig
};
