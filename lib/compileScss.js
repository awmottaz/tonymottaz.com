const path = require("node:path");
const sass = require("sass");
const lightningcss = require("lightningcss");

const targets = require("./targets");

module.exports = function (inputContent, inputPath) {
  const parsedPath = path.parse(inputPath);
  if (parsedPath.name.startsWith("_")) {
    return;
  }
  const { css, loadedUrls } = sass.compileString(inputContent, {
    loadPaths: [parsedPath.dir || ".", this.config.dir.includes],
    sourceMap: false,
  });
  this.addDependencies(inputPath, loadedUrls);
  const { code } = lightningcss.transform({
    filename: inputPath,
    code: Buffer.from(css, "utf-8"),
    sourceMap: false,
    minify: true,
    targets,
  });

  return () => code.toString("utf-8");
};
