/*
 * grunt-toggle
 * https://github.com/zamtools/grunt-toggle
 *
 * Copyright (c) 2014 Zamtools Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      tests: ['tmp'],
    },

    toggle: {
      show_all: {
        options: {
          show: ['head', 'body']
        },
        files: {
          'tmp/show_all.html': ['test/fixtures/test.html'],
        },
      },
      show_none: {
        options: {
          show: []
        },
        files: {
          'tmp/show_none.html': ['test/fixtures/test.html'],
        },
      },
      show_head: {
        options: {
          show: ['head']
        },
        files: {
          'tmp/show_head.html': ['test/fixtures/test.html'],
        },
      },
      show_body: {
        options: {
          show: ['body']
        },
        files: {
          'tmp/show_body.html': ['test/fixtures/test.html'],
        },
      },
    },

    nodeunit: {
      tests: ['test/*_test.js'],
    },
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'toggle', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
