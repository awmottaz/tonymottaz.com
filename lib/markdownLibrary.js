const markdownIt = require("markdown-it");

module.exports = new markdownIt({
  html: true,
  typographer: true,
});
