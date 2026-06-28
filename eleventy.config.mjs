import { DateTime } from "luxon";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import fontAwesomePlugin from "@11ty/font-awesome";

export default async function (config) {
  config.addPlugin(fontAwesomePlugin);

  config.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "blog", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "nielmin's blog",
			subtitle: "Blog posts from nielmin's personal site",
			base: "https://nielmin.github.io/",
			author: {
				name: "nielmin",
			}
		}
  });

  config.addWatchTarget("static");

  config.addPassthroughCopy({ "static/icons": "/icons" });

  config.addPassthroughCopy({ "static/img": "/img" });

  config.addPassthroughCopy("src/css");
  config.addWatchTarget("src/css/");

  config.addFilter("isoDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'America/Chicago'}).toFormat("yyyy-LL-dd");
  });

  config.addFilter("prettyMonthDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'America/Chicago'}).toFormat("LLL dd");
  });

  config.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'America/Chicago'}).toFormat("LLL dd yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  config.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'America/Chicago'}).toFormat('yyyy.LL.dd');
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
