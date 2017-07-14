/**
 * Created by fan on 2017/7/11.
 */
import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'


gulp.task('build', gulpSequence('clean',
  ['move-index', 'move-assets', 'move-lib', 'move-template', 'imgmin', 'es6', 'sass'],
  ['rev-img', 'rev-css', 'rev-js'],
  ['clean:css', 'clean:images'],
  ['col-js', 'col-image-to-js', 'col-img', 'col-image-to-css', 'col-html'],
  ['clean:rev', 'clean:app.js']
))
