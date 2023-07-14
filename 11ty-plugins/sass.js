const path = require("node:path");
const sass = require("sass");
const browserslist = require("browserslist");
const lightningcss = require("lightningcss");

const targets = lightningcss.browserslistToTargets(browserslist("defaults"));

module.exports = function (eleventyConfig) {
	eleventyConfig.addTemplateFormats("scss");

	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compile: function (inputContent, inputPath) {
			const parsedPath = path.parse(inputPath);
			if (parsedPath.name.startsWith("_")) {
				return;
			}
			const { css, loadedUrls } = sass.compileString(inputContent, {
				loadPaths: [parsedPath.dir || ".", this.config.dir.includes],
				sourceMap: false,
			});
			this.addDependencies(inputPath, loadedUrls);
			const { code } = lightningcss.transform({
				filename: inputPath,
				code: Buffer.from(css, "utf-8"),
				minify: true,
				sourceMap: false,
				targets,
			});

			return () => code;
		},
	});
};
