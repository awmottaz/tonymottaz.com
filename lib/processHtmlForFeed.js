const posthtml = require("posthtml");
const urls = require("posthtml-urls");
const { absoluteUrl } = require("./absoluteUrl.js");

module.exports = async function (htmlContent, base) {
  const plugin = urls({ eachURL: (url) => absoluteUrl(url.trim(), base) });
  const { html } = await posthtml().use(plugin).process(htmlContent);
  return html;
};
