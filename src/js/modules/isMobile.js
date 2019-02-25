"use scrict";

/**
 * モバイル判定
 *
 * return true: モバイル
 * return false: PC
 */
export default function isMobile() {
  if (window.matchMedia("(max-width:768px)").matches) {
    return true;
  } else {
    return false;
  }
}
