const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const prettier = require("prettier");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnesting = require("postcss-nesting");
const csso = require("postcss-csso");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600, 1200],
    formats: ["avif", "webp", "jpeg"],
    sharpAvifOptions: {
      nearLossless: true,
    },
    sharpWebpOptions: {
      nearLossless: true,
    },
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy(".nojekyll");
  eleventyConfig.addPassthroughCopy("font");
  eleventyConfig.addPassthroughCopy("img");

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  eleventyConfig.addFilter("postcss", function (code) {
    return postcss([autoprefixer, cssnesting(), csso]).process(code).css;
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLLL yyyy"
    );
  });

  eleventyConfig.addPlugin(syntaxHighlight, {
    preAttributes: {
      tabindex: "0",
      "data-language": function ({ language }) {
        return language;
      },
    },
  });

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addTransform("prettier", function (content) {
    if (this.outputPath?.endsWith(".html")) {
      return prettier.format(content, { filepath: this.outputPath });
    }
    return content;
  });

  return { dir: { input: "src" } };
};
