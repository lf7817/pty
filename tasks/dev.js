/**
 * Created by fan on 2017/7/11.
 */
import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('dev', gulpSequence('clean',
  ['move-index', 'move-assets', 'move-lib', 'move-template', 'imgmin', 'es6', 'sass'],
  'server'))
