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
    }
  });

  require('load-grunt-tasks')(grunt);

};
