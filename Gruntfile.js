module.export = function (grunt) {
  grunt.initConfig({
    // Eslint task for current project.
    eslint: {
      //http://eslint.org/docs/rules/
      options: {
        configFile: '.eslintrc'
      },
      react: [
        './components/**/*{.jsx,.js}'
      ]
    },
    nodemon: {
      server: {
        script: './bin/www',
        options: {
          nodeArgs: [ /*'--debug', '--harmony'*/ ],
          ignore: ['node_modules/**'],
          env: {
            PORT: '4000',
            // for development, isomorphic server render react
            NODE_ENV: 'development',
            DEBUG_COLORS: true
          },
          ext: 'js,jsx,html,ejs'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);



}
