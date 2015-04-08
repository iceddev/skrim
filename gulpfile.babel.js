'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');

const watch = (process.argv.indexOf('--watch') !== -1);

gulp.task('default', function(){
  return gulp.src('./src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('.'));
});

if(watch){
  gulp.watch('./src/*.js', gulp.parallel('default'));
}
