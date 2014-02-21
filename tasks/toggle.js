/*
 * grunt-toggle
 * https://github.com/zamtools/grunt-toggle
 *
 * Copyright (c) 2014 Zamtools Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');
  var fs   = require('fs');
  var _    = require('lodash');

  grunt.registerMultiTask('toggle', 'Toggles blocks within an html file depending on supplied values.', function() {
    var blockPattern   = /<!--\s*toggle[\s\S]*?endtoggle\s*-->/gm;
    var contentPattern = /^<!--\s*toggle:([a-z0-9]+)\s*-->([\s\S]*?)<!--\s*endtoggle\s*-->$/m;

    var options = this.options({
      mode: false,
      show: []
    });

    // taken from grunt-replace and grunt-contrib-copy
    // see https://github.com/outaTiME/grunt-replace/blob/master/tasks/replace.js#L139

    var detectDestType = function(dest) {
      // dest is a directory if it ends with a slash
      return dest[dest.length - 1] === '/' ? 'directory' : 'file';
    };

    var unixifyPath = function(filepath) {
      if (process.platform === 'win32') {
        return filepath.replace(/\\/g, '/');
      } else {
        return filepath;
      }
    };

    var toggle = function(srcFile, destFile, options) {
      grunt.file.copy(srcFile, destFile, {
        process: function(contents) {
          // find toggle blocks
          var blockMatches = contents.match(blockPattern);
          if (blockMatches) {
            blockMatches.forEach(function(block) {
              var contentMatch = block.match(contentPattern);

              if (contentMatch && contentMatch.length >= 3) {
                var match   = contentMatch[0];
                var name    = contentMatch[1];
                var content = contentMatch[2];

                if (_.contains(options.show, name)) {
                  // show
                  contents = contents.replace(match, content);
                } else {
                  // hide
                  contents = contents.replace(match, '');
                }
              }
            });
          }

          return contents;
        }
      });
    };

    this.files.forEach(function(f) {
      var srcs = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      var isExpandedPair = f.orig.expand || false;

      srcs.forEach(function(src) {
        var dest;

        if (detectDestType(f.dest) === 'directory') {
          if (isExpandedPair) {
            dest = f.dest;
          } else {
            dest = unixifyPath(path.join(f.dest, src));
          }
        } else {
          dest = f.dest;
        }

        if (grunt.file.isDir(src)) {
          grunt.file.mkdir(dest);
        } else {
          console.log('ding');
          toggle(src, dest, options);
          if (options.mode !== false) {
            fs.chmodSync(dest, (options.mode === true) ? fs.lstatSync(src).mode : options.mode);
          }
        }
      });

      grunt.log.writeln('File "' + f.dest + '" written.');
    });
  });

};
