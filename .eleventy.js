const CleanCSS = require('clean-css');
const markdownIt = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true
});

const ENV = require('./src/_data/env.js');

module.exports = function (eleventyConfig) {
  /**
   * Filters
   */
  eleventyConfig.addFilter('cssmin', code => new CleanCSS({}).minify(code).styles);
  
  eleventyConfig.addFilter('markdownify', str => markdownIt.render(str));
  
  eleventyConfig.addFilter('markdownify_inline', str => markdownIt.renderInline(str));

  eleventyConfig.addFilter('take', (arr, amt = 5) => arr.slice(0, amt));

  /**
   * Shortcodes
   */
  eleventyConfig.addPairedShortcode("callout", (content, variant = 'green') => {
    return `<div class="callout bg-${variant}-700"><div class="w-full max-w-screen-lg mx-auto px-4">${content}</div></div>`
  });

  /**
   * Collections
   */
  eleventyConfig.addCollection('posts', collection => {
    const published = (p) =>
      ENV.environment === 'production' ? !p.data.draft : true;
    return [
      ...collection.getFilteredByGlob('**/posts/*.md').filter(published),
    ].reverse();
  });

  /**
   * ETC.
   */
  eleventyConfig.setLibrary('md', markdownIt);

  eleventyConfig
    .addPassthroughCopy('src/assets/images/*')
    .addPassthroughCopy('src/assets/styles/styles.css');

  return {
    templateFormats: ['njk', 'md', 'html'],
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'www',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
  }
};