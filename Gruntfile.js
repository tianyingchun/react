module.exports = function (grunt) {

  grunt.initConfig({
    // Eslint task for current project.
    eslint: {
      //http://eslint.org/docs/rules/
      options: {
        configFile: '.eslintrc'
      },
      react: [
        './docs/**/*{.jsx,.js}'
      ]
    },
    nodemon: {
      isomorphic: {
        script: './isomorphic',
        options: {
          nodeArgs: [ /*'--debug' */],
          ignore: ['node_modules/**'],
          env: {
            PORT: '2000',
            // for development, isomorphic server render react
            NODE_ENV: '',
            DEBUG: 'iso:*,',
            DEBUG_COLORS: true
          },
          ext: 'js,jsx,html,ejs'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // Load customized webpack build infrastructure.
  require('./buildtool')(grunt);

};
