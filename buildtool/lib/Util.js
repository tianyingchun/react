 var fs = require('fs');
 var path = require('path');

 var file = module.exports = {};

 // True if the file path exists.
 file.exists = function () {
   var filepath = path.join.apply(path, arguments);
   return fs.existsSync(filepath);
 };

 file.isDir = function () {
   var filepath = path.join.apply(path, arguments);
   return file.exists(filepath) && fs.statSync(filepath).isDirectory();
 };
