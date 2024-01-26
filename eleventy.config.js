const Image = require("@11ty/eleventy-img");
const eleventyAutoCacheBuster = require("eleventy-auto-cache-buster");

const imageShortcodeCallback =
  async function(src, alt = '', linkUrl = '') {
		const metadata = await Image(src, {
			widths: [400, 800, 1200, 'auto'],
			formats: ['jpeg'],
      outputDir: 'dist/img',
		});

    const srcset =
      metadata.jpeg.map(data => data.srcset).join(', ');

		const lowsrc = metadata.jpeg[0];
		const originalsrc = metadata.jpeg[metadata.jpeg.length - 1];

    const anchor = linkUrl === ''
      ? `<a class="image-link" href="${originalsrc.url}" target="_blank">`
      : `<a class="image-link" href="${linkUrl}">`
    return `
      ${anchor}
        <img
          src="${lowsrc.url}"
          srcset="${srcset}"
          width="${originalsrc.width}"
          height="${originalsrc.height}"
          alt="${alt}"
          loading="lazy"
          decoding="async"
        >
      </a>
    `;
	};

const ytShortcodeCallback =
  async function(src) {
    return `
      <div class="aspect-box sixteen-to-nine yt-container">
        <iframe width="560" height="315" src="${src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    `;
	};

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyAutoCacheBuster);

	eleventyConfig.addShortcode('image', imageShortcodeCallback);
	eleventyConfig.addShortcode('yt', ytShortcodeCallback);

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
