---
title: "Oh no! My JSON!"
description: |
  The `hanging-punctuation` CSS property made the rounds recently. In this post, I encourage a bit more caution before you apply it globally.
date: 2023-12-08
---

Chris Coyier [recently wrote about the `hanging-punctuation` CSS property](https://chriscoyier.net/2023/11/27/the-hanging-punctuation-property-in-css/). He concludes his post saying,

> I think hanging-punctuation is nice! Just a nice bonus where supported and not a huge deal if it’s not. I’d probably start a new project with:
>
> ```css
> html {
>   hanging-punctuation: first allow-end last;
> }
> ```

I'm recommending a little more caution here, otherwise you may find yourself in a similar situation to me...

## Oh no! my JSON!

I'm a programmer who occasionally blogs. As such, I tend to include code snippets in my blog posts.

After _yet another_ redesign of my website, I decided to be a Good Programmer and check how things looked in other browsers. When I opened up a post in Safari, I saw something like this:

{% image "img/hanging-punctuation-json-code.png" "A screenshot of a web page with a JSON code snippet. There is a border around the code snippet. The opening curly brace of the JSON data is further left than expected, overlapping with the border." %}{% endimage %}

Well, hmm... that's not what I wanted. The opening curly brace in my JSON snippet is offset. How did this happen?

## Here's a hint: it's not called `hanging-quotes`

The CSS property is called `hanging-punctuation`, not `hanging-quotes`. Which other punctuation marks does this property apply to?

On the [MDN page on `hanging-punctuation`](https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation), you will find that for the values `first` and `last`, the punctuation marks that will hang include all characters from the following Unicode tables:

- [Ps](https://unicodeplus.com/category/Ps) (`first` only)
- [Pe](https://unicodeplus.com/category/Pe) (`last` only)
- [Pf](https://unicodeplus.com/category/Pf)
- [Pi](https://unicodeplus.com/category/Pi)

Did you go look? The Ps and Pe categories includes some characters that are very common in code — parentheses, square brackets, and curly braces.

So this "bug" is just `hanging-punctuation` doing its thing! This took me a _long time_ to figure out. I hope I can save someone else the time wasted looking at `margin` and `padding` and `text-indent` and user-agent stylesheets and _thinking you actually have no idea [how CSS layout algorithms work](https://www.joshwcomeau.com/css/understanding-layout-algorithms/)_...

That was a long night.

## Add exceptions for code blocks

Given this, I recommend adding an exception for code blocks at a minimum. I would probably start a new project with:

```css
html {
  hanging-punctuation: first allow-end last;
}

pre {
  hanging-punctuation: none;
}
```

Here is a CodePen you can play with: <https://codepen.io/tonymottaz/pen/MWLxaOG>
