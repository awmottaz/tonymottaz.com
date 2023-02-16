const { DateTime } = require("luxon");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		"./static/": "/",
	});

	eleventyConfig.addPlugin(pluginBundle);

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		// https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
			"yyyy-LL-dd"
		);
	});

	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
			dateObj
		);
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
