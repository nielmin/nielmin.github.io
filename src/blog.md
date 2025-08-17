---
title: 'Blog'
summary: 'Here are some of my writings'
layout: 'layouts/feed.html'
pagination:
  data: collections.blog
  size: 5
  alias: posts
permalink: 'blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
---
