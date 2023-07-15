const Image = require("@11ty/eleventy-img");

async function getMDProcessor() {
  const { unified } = await import("unified");

  const processor = unified()
    .use((await import("remark-parse")).default)
    .use((await import("remark-flexible-code-titles")).default)
    .use((await import("remark-smartypants")).default)
    .use((await import("remark-torchlight")).default, {
      config: {
        theme: "liver-dark",
        cache: ".torchlight-cache",
        options: {
          lineNumbers: false,
        },
      },
    })
    .use((await import("remark-rehype")).default, {
      allowDangerousHtml: true,
    })
    .use((await import("rehype-stringify")).default, {
      allowDangerousHtml: true,
    });

  return processor.process;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", {
    set: () => {},
    render: async (str) => {
      const process = await getMDProcessor();

      return (await process(str)).value;
    },
  });

  eleventyConfig.addPairedShortcode(
    "image",
    async function (content, src, alt) {
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

      const process = await getMDProcessor();
      const captionHTML = (await process(content)).value;

      const html = `<figure>${imgHTML}<figcaption>${captionHTML}</figcaption></figure>`;
      return html;
    },
  );
};
