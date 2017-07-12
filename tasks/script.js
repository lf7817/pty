import gulp from 'gulp'
import cached from 'gulp-cached'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'

gulp.task('es6', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(plumber({ // plumber触发错误提示
      errorHandler: console.log
    }))
    .pipe(cached('es6'))
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }).on('error', function () { console.log('error') }))
    .pipe(sourcemaps.write('./map'))
    .pipe(gulp.dest('dist/js'))
})
