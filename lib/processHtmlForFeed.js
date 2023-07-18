const posthtml = require("posthtml");
const removeAttributes = require("posthtml-remove-attributes");
const urls = require("posthtml-urls");
const absoluteUrl = require("./absoluteUrl.js");

module.exports = async function (htmlContent, base) {
  const pluginUrls = urls({ eachURL: (url) => absoluteUrl(url.trim(), base) });
  const pluginRemoveAttributes = removeAttributes(["style"]);
  const { html } = await posthtml()
    .use(pluginUrls)
    .use(pluginRemoveAttributes)
    .process(htmlContent);
  return html;
};
