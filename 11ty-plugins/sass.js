const path = require("node:path");
const sass = require("sass");
const browserslist = require("browserslist");
const lightningcss = require("lightningcss");

const targets = lightningcss.browserslistToTargets(browserslist("defaults"));

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: function (inputContent, inputPath) {
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
    },
  });
};
