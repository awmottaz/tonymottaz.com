---
title: Writing code for both computers and humans
description: Code is run by computers, but it is read by humans. In this post, I explore an example of code that is written with empathy for other programmers.
date: 2023-10-15
layout: layouts/post.liquid
tags:
	- post
---

One day, I was reading some [source code from the Adobe Spectrum library][spectrum-code] when I saw this JavaScript ternary expression:

```js
isNaN(defaultValue) ? NaN : defaultValue;
```

[spectrum-code]: https://github.com/adobe/react-spectrum/blob/69a3121367d2120cf77a53e91d9b66529889595d/packages/%40react-stately/numberfield/src/useNumberFieldState.ts#L90

This made me pause for a moment. The logician in me was confused why such an expression was necessary—this ternary is equivalent to just using the value of `defaultValue`. If `defaultValue` were `NaN` then we get back `NaN` anyway.

But then I realized that this code _lead me through that thought process in the first place_ because it was written this way. If you think about it, this code expresses a lot of information:

- `defaultValue` is going to be a number
- It is possible that the value is `NaN`
- The author who implemented this code considered and handled this possibility
- A `NaN` value is explicitly forwarded through

Now consider the alternative. What if the author left this as just `defaultValue`? If you saw that, your spidey-sense might start tingling, "This is a number—did they consider the `NaN` case?" To answer this question, you need to start looking around for clues. Maybe they left a comment explaining this, but more often you will need to read the surrounding code to find out. Or worse, run some tests. Or worse worse, write new tests. Or worse worse _worse_, run the app and manually test!

This ternary is much better. **This is expert-level programming.** This is how to write code with empathy for other programmers.

I tip my cap to [@snowystinger][snowystinger] (who wrote this expression, and best as I can tell) and the rest of the Spectrum team.

[snowystinger]: https://github.com/snowystinger
