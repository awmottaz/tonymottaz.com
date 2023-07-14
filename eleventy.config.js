const { DateTime } = require("luxon");
const htmlmin = require("html-minifier");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginMarkdown = require("./11ty-plugins/markdown.js");
const pluginSass = require("./11ty-plugins/sass.js");

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
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
			"yyyy-LL-dd",
		);
	});

	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toLocaleString(
			DateTime.DATE_FULL,
		);
	});

	eleventyConfig.addTransform("htmlmin", function (content) {
		if (!this.page.outputPath?.endsWith(".html")) {
			return content;
		}

		return htmlmin.minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
		});
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
