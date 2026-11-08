'use strict';

module.exports = function (grunt) {
  require('load-grunt-config')(grunt);
  grunt.registerTask('regression', 'Test extension behavior', function () {
    require('./test/contentscript.test')();
  });
};
