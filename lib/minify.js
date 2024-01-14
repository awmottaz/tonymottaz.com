const path = require("node:path");
const { minify } = require("html-minifier-terser");
const htmlnano = require("htmlnano");

module.exports = async function (content) {
  if (!this.page.outputPath) return content;

  const parsedPath = path.parse(this.page.outputPath);
  if (parsedPath.ext !== ".html") {
    return content;
  }
  const result = await htmlnano.process(content);
  return result.html;
};
