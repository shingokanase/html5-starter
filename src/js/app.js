"use strict";
import isMobile from "./modules/isMobile.js";

const pageTop = () => {
  $("#pageTop").on("click", () => {
    $("body,html").animate(
      {
        scrollTop: 0
      },
      500
    );
    return false;
  });
};

/**
 * トップへ戻るボタンの表示切り替え
 */
const switchTopPage = () => {
  var $gotop = $("#pageTop");
  if (isMobile() == false) {
    if ($(window).scrollTop() > 400) {
      $gotop.fadeIn(200);
    } else {
      $gotop.fadeOut(100);
    }
  } else {
    if ($(window).scrollTop() > 600) {
      $gotop.fadeIn(0);
    } else {
      $gotop.fadeOut(0);
    }
  }
};

window.addEventListener(
  "scroll",
  () => {
    switchTopPage();
  },
  false
);

{
  pageTop();
}
