import path from "path";
const root = path.resolve(__dirname + "/..");

module.exports = {
  root: root,
  src: root + "/src",
  dist: root + "/dist",
  browsers: ["last 2 versions", "iOS >= 8", "Android >= 4"]
};
