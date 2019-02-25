"use strict";

import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import browserSync from "browser-sync";
import runSequence from "run-sequence";
import config from "../config.js";
import { setTimeout } from "core-js/library/web/timers";

const $ = gulpLoadPlugins();

gulp.task("watch", () => {
  // ファイル監視 ＆ 自動リロード
  // ファイルの新規作成を検知するため$.watchを使う
  $.watch([config.src + "/**/*.pug"], event => {
    runSequence("pug");
    log(event);
  });
  $.watch([config.src + "/**/*.scss"], event => {
    runSequence("sass");
    log(event);
  });
  $.watch([config.src + `/js/**.js`], event => {
    runSequence(["webpack"]);
    log(event);
  });
  $.watch(
    [
      config.src + `/**/*+(.png|.jpeg|.jpg|.gif|.svg)`,
      config.src + `/**/*.ico`,
      config.src + `/**/fonts/**/*`,
      config.src + `/**/*.json`
    ],
    event => {
      setTimeout(() => {
        runSequence("copy");

        log(event);
      }, 500);
    }
  );
});

function log(event) {
  console.log("File " + event.path + " was " + event.event);
}
