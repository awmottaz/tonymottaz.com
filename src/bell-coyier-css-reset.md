---
title: The Bell-Coyier CSS reset
description: Distilling great ideas into a modern CSS reset
date: 2023-10-04
layout: layouts/post.liquid
tags:
	- post
---

Not too long ago, [Andy Bell updated his modern CSS reset](https://andy-bell.co.uk/a-more-modern-css-reset/). Just the other day, [Chris Coyier reacted to it and offered some suggested modifications](https://chriscoyier.net/2023/10/03/being-picky-about-a-css-reset-for-fun-pleasure/). Here, I distill their ideas into a single modern CSS reset.

Please refer to their posts for explanations of the different rules included here.

<!-- prettier-ignore-start -->

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
  line-height: 1.5;
}

body,
h1, h2, h3, h4, h5, h6,
p, figure, blockquote, pre,
dl, dd {
  margin: 0;
}

ul[role="list"],
ol[role="list"] {
  margin: 0;
  padding: 0;
  list-style: none;
}

body {
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6,
button, input, label {
  line-height: 1.1;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

img, picture {
  max-width: 100%;
  display: block;
}

input, button, textarea, select {
  font: inherit;
}

textarea:not([rows]) {
  min-height: 10em;
  form-sizing: normal;
}

:target {
  scroll-margin-block: 5ex;
  scroll-margin-block: 1rlh;
}
```

<!-- prettier-ignore-end -->
