/**
 * Created by fan on 2017/7/11.
 */
import gulp from 'gulp'
import cached from 'gulp-cached'

gulp.task('move-index', function () {
  return gulp.src('src/index.html')
    .pipe(cached('move-index'))
    .pipe(gulp.dest('dist'))
})

gulp.task('move-assets', function () {
  return gulp.src('src/assets/*.*')
    .pipe(cached('move-assets'))
    .pipe(gulp.dest('dist/assets'))
})

gulp.task('move-lib', function () {
  return gulp.src('src/lib/**/*.*')
    .pipe(cached('move-lib'))
    .pipe(gulp.dest('dist/lib'))
})

gulp.task('move-template', function () {
  return gulp.src('src/template/*.*')
    .pipe(cached('move-template'))
    .pipe(gulp.dest('dist/template'))
})