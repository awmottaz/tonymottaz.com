const path = require("node:path");
const { minify } = require("html-minifier-terser");

module.exports = async function (content) {
  if (!this.page.outputPath) return content;

  const parsedPath = path.parse(this.page.outputPath);
  if (parsedPath.ext !== ".html") {
    return content;
  }
  const formatted = await minify(content, {
    minifyCSS: true,
    minifyJS: true,
  });
  return formatted;
};
