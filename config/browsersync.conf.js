const conf = require('../../gulp.conf');

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.client.tmp,
        conf.paths.client.src
      ]
    },
    open: false
  };
};
