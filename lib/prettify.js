const path = require("node:path");
const prettier = require("prettier");

module.exports = async function (content) {
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
};
