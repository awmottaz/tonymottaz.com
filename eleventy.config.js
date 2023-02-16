const pluginBundle = require("@11ty/eleventy-plugin-bundle");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		"./static/": "/",
	});

	eleventyConfig.addPlugin(pluginBundle);

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
