const docIcon = require("./icons/document");

class IDMaker {
  fnames = new Map();

  getLabelId(fname) {
    if (!this.fnames.has(fname)) {
      this.fnames.set(fname, 0);
    }

    const newCount = this.fnames.get(fname) + 1;
    this.fnames.set(fname, newCount);

    return `${fname}_${newCount}_label`;
  }
}

const idMaker = new IDMaker();

module.exports = async function withfilename(content, filename) {
  if (!filename) {
    throw new TypeError("filename required to use the withfilename shortcode");
  }

  const { default: slugify } = await import("@sindresorhus/slugify");
  const { htmlEscape } = await import("escape-goat");
  const labelId = idMaker.getLabelId(slugify(filename));

  return `
  <div class="withfilename">
    <span id="${labelId}">${docIcon}<code>${htmlEscape(filename)}</code></span>
    <div aria-describedby="${labelId}">${content}</div>
  </div>`;
};
