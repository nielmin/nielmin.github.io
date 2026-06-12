---
layout: 'layouts/tags.html'
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - blog
permalink: '/tags/{{ tag | slugify }}/index.html'
eleventyComputed:
  title: "Posts tagged with \"{{ tag }}\""
---
