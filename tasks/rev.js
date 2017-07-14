import gulp from 'gulp'
import rev from 'gulp-rev'

/*
 * 版本化IMG
 *
 */
gulp.task('rev-img', function () {
  return gulp.src('dist/images/**/*.{jpg,jpeg,png,gif}')
    .pipe(rev())
    .pipe(gulp.dest('dist/rev/images'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/images'))
})

/*
 * 版本化CSS
 *
 */
gulp.task('rev-css', function () {
  return gulp.src('dist/css/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('dist/rev/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/css'))
})

/*
 * 版本化程序入口js文件,其他js文件由requirejs加版本号
 */
gulp.task('rev-js', function () {
  return gulp.src('dist/js/app.js')
    .pipe(rev())
    .pipe(gulp.dest('dist/rev/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/js'))
})