const Image = require("@11ty/eleventy-img");
const markdownLibrary = require("./markdownLibrary");

module.exports = async function (content, src, alt) {
  const metadata = await Image(src, {
    widths: [300, "auto"],
    formats: ["avif", "jpeg"],
  });

  const imageAttributes = {
    alt,
    sizes: "(min-width: 30em) 50vw, 100vw",
    loading: "lazy",
    decoding: "async",
  };

  const imgHTML = Image.generateHTML(metadata, imageAttributes);

  if (!content) return imgHTML;

  const captionHTML = markdownLibrary.renderInline(content);

  const html = `
<figure class="image-figure">
  ${imgHTML}
  <figcaption>
    <div class="caption-text">${captionHTML}</div>
  </figcaption>
</figure>
`;
  return html;
};
