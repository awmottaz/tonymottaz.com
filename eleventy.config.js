const { DateTime } = require("luxon");
const prettier = require("prettier");
const path = require("node:path");

const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const pluginMarkdown = require("./11ty-plugins/markdown.js");
const pluginSass = require("./11ty-plugins/sass.js");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "./static/": "/",
  });
  eleventyConfig.addPassthroughCopy("img");

  eleventyConfig.addPlugin(pluginBundle);
  eleventyConfig.addPlugin(pluginMarkdown);
  eleventyConfig.addPlugin(pluginSass);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    // https://moment.github.io/luxon/#/formatting?id=table-of-tokens
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toLocaleString(
      DateTime.DATE_FULL,
    );
  });

  eleventyConfig.addTransform("pretty", async function (content) {
    const parsedPath = path.parse(this.page.outputPath);
    const { languages } = await prettier.getSupportInfo();
    const lang = languages.find(({ extensions }) =>
      extensions?.some((ext) => ext === parsedPath.ext),
    );
    if (!lang) {
      // prettier cannot format this file.
      return content;
    }
    const formatted = await prettier.format(content, {
      filepath: this.page.outputPath,
    });
    return formatted;
  });

  return {
    templateFormats: ["html", "md", "njk"],
    markdownTemplateEngine: "njk",
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
  };
};
