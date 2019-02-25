"use strict";

import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import browserSync from "browser-sync";
import config from "../config.js";
import path from "path";
import fs from "fs";

const $ = gulpLoadPlugins();

gulp.task("pug", () => {
  // JSONファイルの読み込み。
  var locals = {
    data: JSON.parse(fs.readFileSync(config.src + "/_common/pages.json"))
  };
  return (
    gulp
    .src([config.src + "/pug/**/*.pug", "!" + config.src + "/pug/**/_*.pug"])
    .pipe(
      $.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe($.changed(config.dist))
    // 各ページごとの`/`を除いたルート相対パスを取得します。
    .pipe(
      $.data(function (file) {
        locals.relativePath = path.relative(
          file.base,
          file.path.replace(/.pug$/, ".html")
        );
        return locals;
      })
    )
    .pipe(
      $.pug({
        // JSONファイルとルート相対パスの情報を渡します。
        locals: locals,
        // Pugファイルのルートディレクトリを指定します。
        basedir: config.root,
        pretty: true
      })
    )
    .pipe($.cached("html-cache"))
    .pipe($.htmlBeautify({
      indent_size: 2
    }))
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.reload({
      stream: true
    }))
  );
});
