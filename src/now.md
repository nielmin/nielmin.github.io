---
title: 'Now'
layout: 'layouts/feed.html'
pagination:
  data: collections.now
  size: 5
  alias: posts
permalink: 'now{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
---
