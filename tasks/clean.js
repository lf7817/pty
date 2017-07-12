/**
 * Created by fan on 2017/7/11.
 */
import gulp from 'gulp'
import del from 'del'

gulp.task('clean', function (callback) {
  return del(['dist', 'tmp'], callback)
})
