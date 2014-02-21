'use strict';

var grunt = require('grunt');

exports.toggle = {
  setUp: function(done) {
    done();
  },
  show_all: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/show_all.html');
    var expected = grunt.file.read('test/expected/show_all.html');
    test.equal(actual, expected, 'should show all blocks.');

    test.done();
  },
  show_none: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/show_none.html');
    var expected = grunt.file.read('test/expected/show_none.html');
    test.equal(actual, expected, 'should hide all blocks.');

    test.done();
  },
  show_head: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/show_head.html');
    var expected = grunt.file.read('test/expected/show_head.html');
    test.equal(actual, expected, 'should only show head block.');

    test.done();
  },
  show_body: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/show_body.html');
    var expected = grunt.file.read('test/expected/show_body.html');
    test.equal(actual, expected, 'should only show body block.');

    test.done();
  },
};
