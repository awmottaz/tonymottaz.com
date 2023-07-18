const { Remarkable } = require("remarkable");
const hljs = require("highlight.js");

module.exports = new Remarkable({
  html: true,
  typographer: true,
  highlight: (content, language) => hljs.highlight(content, { language }).value,
});
