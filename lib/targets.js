const browserslist = require("browserslist");
const lightningcss = require("lightningcss");

const query = `defaults`;

module.exports = lightningcss.browserslistToTargets(browserslist(query));
