---
title: OTF or TTF?
description: Should you use OTF or TTF font files?
date: 2023-03-18
layout: layouts/post.liquid
tags:
	- post
---

<aside>

### Note

This post is written in the context of installing fonts on a _desktop computer_, where it is common to get both OTF and TTF font files when you download a new font. If you are including custom fonts on a website, you probably want to use [woff2](https://developer.mozilla.org/en-US/docs/Web/Guide/WOFF).

Thank you for your feedback, [Manu](https://manuelmoreale.com/)!

</aside>

Use OTF font files if you have them. Otherwise, TTF is fine.

"OTF" stands for "OpenType Font". It is a more modern format than TTF ("TrueType Font").

OTF fonts usually provide additional controls for typographic features, such as ligatures and contextual alternates. On the web, you can enable or disable those features using the [`font-feature-settings` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings).

---

I wrote this post after the umpteenth time that I downloaded font files and forgot which format I wanted to use. Hopefully, I never forget again! At the very least, I know where to find this information again — I hope it helps you, too!
