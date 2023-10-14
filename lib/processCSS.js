const lightningcss = require("lightningcss");

const targets = require("./targets");

module.exports = function processCSS(inputContent) {
  const { code, warnings } = lightningcss.transform({
    filename: this.page.inputPath,
    code: Buffer.from(inputContent, "utf-8"),
    sourceMap: false,
    minify: true,
    targets,
  });

  warnings.forEach((warning) => {
    console.warn(warning);
  });

  return code.toString("utf-8");
};
