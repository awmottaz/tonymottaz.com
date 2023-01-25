const { DateTime } = require("luxon");
const prettier = require("prettier");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc);

  // https://www.11ty.dev/docs/permalinks/#globally-disable-templating-in-permalinks
  eleventyConfig.setDynamicPermalinks(false);

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  // TODO: replace with Temporal
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // TODO: replace with Temporal
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLLL yyyy"
    );
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addTransform("prettier", function (content) {
    if (this.outputPath?.endsWith(".html")) {
      return prettier.format(content, { filepath: this.outputPath });
    }
    return content;
  });

  return { dir: { input: "src" } };
};
