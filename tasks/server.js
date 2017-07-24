/**
 * Created by fan on 2017/7/11.
 */
import gulp from 'gulp'
import browserSync from 'browser-sync'

let server = browserSync.create('myserver')

/**
 * 启动静态服务器，并监控文件刷新浏览器
 */
gulp.task('server', function () {
  server.init({
    server: './dist',
    port: '8080',
    ui: {
      port: 8081
    }
  })
  gulp.watch('src/style/**/*.scss', ['sass'])
  gulp.watch('src/js/**/*.js', ['es6'])
  gulp.watch('src/images/**/*.{jpg,jpeg,png,gif}', ['imgmin'])
  gulp.watch('src/assets/*.*', ['move-assets'])
  gulp.watch('src/lib/**/*.*', ['move-lib'])
  gulp.watch('src/template/*.*', ['move-template'])
  gulp.watch('src/*.html', ['move-index'])
  server.watch('dist/css/**/*.css', function (event, file) {
    if (event === 'change') {
      server.reload(file)
    }
  })
  gulp.watch(['dist/**/*.*', '!dist/css/**/*.css']).on('change', server.reload)
})
