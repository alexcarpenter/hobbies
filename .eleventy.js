const CleanCSS = require('clean-css');
const { minify } = require("terser");
const htmlmin = require('html-minifier');
const slugify = require('@sindresorhus/slugify');
const markdownIt = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true
});

const ENV = require('./src/_data/env.js');
// const PRODUCTS = require('./src/_data/products.json');

module.exports = function (eleventyConfig) {
  /**
   * Filters
   */
  eleventyConfig.addFilter('cssmin', code => new CleanCSS({}).minify(code).styles);

  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });
  
  eleventyConfig.addFilter('markdownify', str => markdownIt.render(str));
  
  eleventyConfig.addFilter('markdownify_inline', str => markdownIt.renderInline(str));

  eleventyConfig.addFilter('take', (arr, amt = 5) => arr.slice(0, amt));

  eleventyConfig.addFilter('slice', (arr, start = 0, end) => arr.slice(start, end));

  eleventyConfig.addFilter('shift', arr => arr.shift());

  eleventyConfig.addFilter('strip_html', str => str.replace(/<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g, ''));

  eleventyConfig.addFilter('permalink', str => str.replace(/\.html/g, ''));

  eleventyConfig.addFilter('kebab', str => slugify(str));

  /**
   * Transforms
   */
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (ENV.environment === 'production' && outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  /**
   * Shortcodes
   */
  eleventyConfig.addPairedShortcode("callout", (content, variant = 'green') => {
    return `<div class="callout bg-gradient-to-br from-${variant}-700 to-${variant}-900"><div class="w-full max-w-screen-lg mx-auto px-4">${content}</div></div>`;
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
    .addPassthroughCopy('src/assets/fonts/*')
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