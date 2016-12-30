const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');

const conf = require('../../gulp.conf');

gulp.task('client:clean', clean);
gulp.task('client:other', other);

function clean() {
  return del([conf.paths.client.dist, conf.paths.client.tmp]);
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    conf.path.client.src('/**/*'),
    path.join(`!${conf.paths.client.src}`, '/**/*.{scss,js,html}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.client.dist));
}
