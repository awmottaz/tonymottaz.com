module.exports = function (eleventyConfig) {
	return {
		templateFormats: ["md", "njk"],
		markdownTemplateEngine: "njk",
		dir: {
			input: "content",
			includes: "../_includes",
			data: "../_data",
			output: "_site",
		},
	};
};
