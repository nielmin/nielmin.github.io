const { DateTime } = require("luxon");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = (config) => {
  config.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "blog", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "Blog Title",
			subtitle: "This is a longer description about your blog.",
			base: "https://example.com/",
			author: {
				name: "Your Name",
				email: "", // Optional
			}
		}
  });
  config.addPassthroughCopy("static");

  config.addPassthroughCopy("static/img");
  config.addWatchTarget("static/img");

  config.addPassthroughCopy("src/css");
  config.addWatchTarget("src/css/");

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

  config.addCollection('now', (collection) => {
    return [...collection.getFilteredByGlob('./src/now/*.md')].reverse();
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
