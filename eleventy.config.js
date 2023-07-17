const { DateTime } = require("luxon");
const prettier = require("prettier");
const path = require("node:path");
const posthtml = require("posthtml");
const urls = require("posthtml-urls");

const pluginBundle = require("@11ty/eleventy-plugin-bundle");

const pluginMarkdown = require("./11ty-plugins/markdown.js");
const pluginSass = require("./11ty-plugins/sass.js");

const absoluteUrl = (rel, base) => {
  try {
    return new URL(rel, base).toString();
  } catch (error) {
    console.error(error);
  }
};

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "./static/": "/",
  });
  eleventyConfig.addPassthroughCopy("img");

  eleventyConfig.addPlugin(pluginBundle);
  eleventyConfig.addPlugin(pluginMarkdown);
  eleventyConfig.addPlugin(pluginSass);

  eleventyConfig.addFilter("absoluteUrl", absoluteUrl);

  eleventyConfig.addAsyncFilter(
    "processHtmlForFeed",
    async (htmlContent, base) => {
      const plugin = urls({ eachURL: (url) => absoluteUrl(url.trim(), base) });
      const { html } = await posthtml().use(plugin).process(htmlContent);
      return html;
    },
  );

  eleventyConfig.addFilter("getNewestCollectionItemDate", (collection) => {
    if (!collection?.length) {
      return new Date();
    }

    return new Date(
      Math.max(
        ...collection.map((item) => {
          return item.date;
        }),
      ),
    );
  });

  // Atom uses RFC 3339 dates
  // https://tools.ietf.org/html/rfc3339#section-5.8
  eleventyConfig.addFilter("dateToRfc3339", (date) => {
    const isoDate = date.toISOString();
    const [isoDateWithoutMS] = isoDate.split(".");
    return `${isoDateWithoutMS}Z`;
  });

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

  eleventyConfig.setLiquidOptions({ jsTruthy: true });

  return {
    templateFormats: ["html", "md", "liquid"],
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
  };
};
