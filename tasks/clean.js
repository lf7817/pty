/**
 * Created by fan on 2017/7/11.
 */
import gulp from 'gulp'
import del from 'del'

gulp.task('clean', function (callback) {
  return del(['dist'], callback)
})

gulp.task('clean:css', function (callback) {
  return del(['dist/css'], callback)
})
gulp.task('clean:images', function (callback) {
  return del(['dist/images'], callback)
})
gulp.task('clean:rev', function (callback) {
  return del(['dist/rev'], callback)
})
gulp.task('clean:app.js', function (callback) {
  return del(['dist/js/app.js'], callback)
})
