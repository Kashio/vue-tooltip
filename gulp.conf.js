'use strict';

/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

const path = require('path');
const gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  client: {
    src: './client/src',
    dist: './client/dist',
    tmp: './client/.tmp',
    config: './client/conf',
    e2e: './client/e2e',
    tasks: './client/gulp_tasks'
  },
  server: {
    root: './server',
    bin: './server/bin',
    config: './server/config',
    models: './server/models',
    routes: './server/routes',
    views: './server/views',
    dist: './server/dist',
    test: './server/test',
    tasks: './server/gulp_tasks'
  }
};

exports.path = {
  client: {},
  server: {}
};
for (const directory in exports.paths) {
  if (exports.paths.hasOwnProperty(directory)) {
    for(const pathName in exports.paths[directory]) {
      if (exports.paths[directory].hasOwnProperty(pathName)) {
        exports.path[directory][pathName] = function pathJoin() {
          const pathValue = exports.paths[directory][pathName];
          const funcArgs = Array.prototype.slice.call(arguments);
          const joinArgs = [pathValue].concat(funcArgs);
          return path.join.apply(this, joinArgs);
        };
      }
    }
  }
}

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
  return function (err) {
    gutil.log(gutil.colors.red(`[${title}]`), err.toString());
    this.emit('end');
  };
};
