const absoluteUrl = require("./lib/absoluteUrl.js");
const compileScss = require("./lib/compileScss.js");
const dateToRef3339 = require("./lib/dateToRef3339.js");
const getNewestCollectionItemDate = require("./lib/getNewestCollectionItemDate.js");
const htmlDateString = require("./lib/htmlDateString.js");
const imageShortcode = require("./lib/imageShortcode.js");
const markdownLibrary = require("./lib/markdownLibrary.js");
const prettify = require("./lib/prettify.js");
const processHtmlForFeed = require("./lib/processHtmlForFeed.js");
const readableDate = require("./lib/readableDate.js");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./static/": "/" });
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addFilter("absoluteUrl", absoluteUrl);
  eleventyConfig.addAsyncFilter("processHtmlForFeed", processHtmlForFeed);
  eleventyConfig.addFilter(
    "getNewestCollectionItemDate",
    getNewestCollectionItemDate,
  );
  eleventyConfig.addFilter("dateToRfc3339", dateToRef3339);
  eleventyConfig.addFilter("htmlDateString", htmlDateString);
  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addTransform("prettify", prettify);
  eleventyConfig.setLiquidOptions({ jsTruthy: true });
  eleventyConfig.setLibrary("md", markdownLibrary);
  eleventyConfig.addPairedShortcode("image", imageShortcode);
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: compileScss,
  });

  return {
    templateFormats: ["html", "md", "liquid"],
    dir: { input: "src" },
  };
};
