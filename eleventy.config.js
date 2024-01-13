const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const absoluteUrl = require("./lib/absoluteUrl.js");
const dateToRef3339 = require("./lib/dateToRef3339.js");
const getNewestCollectionItemDate = require("./lib/getNewestCollectionItemDate.js");
const htmlDateString = require("./lib/htmlDateString.js");
const imageShortcode = require("./lib/imageShortcode.js");
const markdownLibrary = require("./lib/markdownLibrary.js");
const minify = require("./lib/minify.js");
const processHtmlForFeed = require("./lib/processHtmlForFeed.js");
const readableDate = require("./lib/readableDate.js");
const processCSS = require("./lib/processCSS.js");
const withfilenameShortcode = require("./lib/withfilenameShortcode.js");
const limit = require("./lib/limit.js");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "./static/": "/",
    "./src/robots.txt": "/robots.txt",
  });
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
  eleventyConfig.addFilter("processCSS", processCSS);
  eleventyConfig.addFilter("limit", limit);
  eleventyConfig.addTransform("minify", minify);
  eleventyConfig.setLiquidOptions({ jsTruthy: true });
  eleventyConfig.setLibrary("md", markdownLibrary);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPairedShortcode("image", imageShortcode);
  eleventyConfig.addPairedAsyncShortcode("withfilename", withfilenameShortcode);

  return {
    templateFormats: ["html", "md", "njk"],
    dir: { input: "src" },
  };
};
