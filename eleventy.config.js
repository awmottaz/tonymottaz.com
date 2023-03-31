const { DateTime } = require("luxon");
const htmlmin = require("html-minifier");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		"./static/": "/",
	});

	eleventyConfig.addPlugin(pluginBundle);

	eleventyConfig.addPlugin(pluginRss);

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

	eleventyConfig.setLibrary("md", {
		set: () => {},
		render: async (str) => {
			const { unified } = await import("unified");
			const { default: remarkParse } = await import("remark-parse");
			const { default: remarkFlexibleCodeTitles } = await import(
				"remark-flexible-code-titles"
			);
			const { default: remarkRehype } = await import("remark-rehype");
			const { default: rehypeStringify } = await import(
				"rehype-stringify"
			);

			const processor = unified()
				.use(remarkParse)
				.use(remarkFlexibleCodeTitles)
				.use(remarkRehype)
				.use(rehypeStringify);

			return (await processor.process(str)).value;
		},
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
