"use strict";

import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import browserSync from "browser-sync";
import config from "../config.js";

const $ = gulpLoadPlugins();

gulp.task("copy", () => {
  return gulp
    .src(
      [
        config.src + `/**/*+(.png|.jpeg|.jpg|.gif|.svg)`,
        config.src + `/**/*.ico`,
        config.src + `/**/fonts/**/*`,
        // config.src + `/**/*.js`,
        config.src + `/**/*.css`,
        config.src + `/**/*.html`,
        config.src + `/**/*.json`,
        "!" + config.src + "/**/pages.json"
      ], {
        base: "src"
      }
    )
    .pipe($.changed(config.dist))
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream());
});
