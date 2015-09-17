/**
 * Check if we have install all required dependancy via npm.
 * @param  {Object} grunt
 */
module.exports = function (grunt) {
  // default build config dependancy.
  if (!grunt.file.exists('./build.config.js')) {
    grunt.fail.fatal("the `build.config.js` file is required, please place it to __dirname.");
    return false;
  }

  // grunt-prompt task dependancy.
  if (!grunt.task.exists('prompt')) {
    grunt.fail.fatal("the `grunt-prompt` task is required, please config it to Gurntfile.js");
    return false;
  }

  // grunt-webpack dependancy.
  if (!grunt.task.exists('webpack')) {
    grunt.fail.fatal("the `grunt-webpack` task is required, please config it to Gurntfile.js");
    return false;
  }

  return true;
};
