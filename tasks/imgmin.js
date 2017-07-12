/**
 * Created by fan on 2017/7/11.
 */
import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import cached from 'gulp-cached'

/**
 * 图片压缩, 并转移到tmp文件夹
 */
gulp.task('imgmin', function () {
  return gulp.src('src/images/**/*.{jpg,jpeg,png,gif}')
    .pipe(cached('imgmin'))
    .pipe(imagemin({
      optimizationLevel: 5, // 类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, // 类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, // 类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true // 类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist/images'))
})
