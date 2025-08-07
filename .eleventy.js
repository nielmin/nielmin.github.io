module.exports = (config) => {
  config.addPassthroughCopy("./src/styles");
  config.addPassthroughCopy({"./node_modules/@picocss/pico/css/pico.min.css": "styles/pico.min.css"});
  config.addWatchTarget("./src/styles/");
  
  // Returns a collection of blog posts in reverse order
  config.addCollection('blog', (collection) => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
  });
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
