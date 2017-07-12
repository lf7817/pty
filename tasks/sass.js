/**
 * Created by fan on 2017/7/11.
 */
import gulp from 'gulp'
import sass from 'gulp-sass'
// import cached from 'gulp-cached'
import autoprefixer from 'gulp-autoprefixer'

gulp.task('sass', () => {
  return gulp.src('src/style/**/*.scss')
  // .pipe(cached('sass'))
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 6 version', 'ie 9'],
      cascade: true, // 是否美化属性值 默认：true
      remove: true   // 是否去掉不必要的前缀 默认：true
    }))
    .pipe(gulp.dest('dist/css'))
})
