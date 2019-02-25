"use strict";

import gulp from "gulp";
import config from "../config.js";
import pngquant from "imagemin-pngquant";
import mozjpeg from "imagemin-mozjpeg";
import gulpLoadPlugins from "gulp-load-plugins";
const $ = gulpLoadPlugins();

import isProduct from "../isProduct.js";

gulp.task("img", () => {
  return (
    gulp
    .src(config.src + `/img/**/*`)
    // .pipe($.changed(config.dist + `/img`))
    .pipe(
      $.if(
        isProduct,
        $.imagemin([
          pngquant({
            quality: "100",
            speed: 1,
            floyd: 0
          }),
          mozjpeg({
            quality: 100,
            progressive: true
          }),
          $.imagemin.svgo(),
          $.imagemin.optipng(),
          $.imagemin.gifsicle()
        ])
      )
    )
    // .pipe($.cached('img-cache'))
    .pipe(gulp.dest(config.dist + `/img`))
  );
});
