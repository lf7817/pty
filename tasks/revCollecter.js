import gulp from 'gulp'
import revCollector from 'gulp-rev-collector'

/*
 * 收集images到js中
 */
gulp.task('col-image-to-js', function () {
  return gulp.src(['dist/rev/images/*.json', 'dist/js/**/*.js'])
    .pipe(revCollector())
    .pipe(gulp.dest('dist/js'))
})

/*
 * 移动app.js
 */
gulp.task('col-js', function () {
  return gulp.src(['dist/rev/js/*.js'])
    .pipe(revCollector())
    .pipe(gulp.dest('dist/js'))
})

/*
 * 移动images
 */
gulp.task('col-img', function () {
  return gulp.src(['dist/rev/images/*.{jpg,jpeg,png,gif}'])
    .pipe(gulp.dest('dist/images'))
})

/*
 * 收集图片到CSS
 */
gulp.task('col-image-to-css', function () {
  return gulp.src(['dist/rev/images/*.json', 'dist/rev/css/**/*.css'])
    .pipe(revCollector())
    .pipe(gulp.dest('dist/css'))
})

/*
 * 收集资源到HTML
 */
gulp.task('col-html', function () {
  return gulp.src(['dist/rev/**/*.json', 'dist/**/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest('dist'))
})
