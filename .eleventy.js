const { DateTime } = require("luxon");

module.exports = (config) => {
  config.addPassthroughCopy("./src/styles");
  config.addWatchTarget("./src/styles/");

  config.addPassthroughCopy({"./node_modules/@picocss/pico/css/pico.min.css": "styles/pico.min.css"});
  config.addPassthroughCopy({"./node_modules/@picocss/pico/css/pico.colors.min.css": "styles/pico.colors.min.css"});
  
  config.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  config.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

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
