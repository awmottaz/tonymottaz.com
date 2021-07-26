---
title: "Indeterminate Checkboxes Are Weird"
date: 2021-03-04T08:48:42-06:00
publishdate: 2021-03-05
summary:
  "Indeterminate checkboxes are officially supported by browsers, but they are
  weirdly difficult to get right. In this post, I go over a quick tour of the
  spec and some recommendations for implementing your own in React."
acknowledgements:
  - "[Matthew Newman](https://github.com/matthewnewman43) for reviewing an early
    draft."
  - "[Devin Dreszer](https://github.com/devindreszer) for reviewing an early
    draft."
  - "Nathanael Beisiegel for clarifications."
  - "Miriam Speert Crowley for great questions that improved the content of this
    post."
updates:
  - 2021-04-02: Clarifications of wording.
---

A checkbox usually has two states: checked and unchecked. But indeterminate
checkboxes are in a third state: neither checked nor unchecked. The
"checkedness" is not determined.

You have seen these before. The most common reason to have an indeterminate
checkbox is when it is controlling a set of checkboxes. When none of the
checkboxes are checked, neither is the master checkbox. When all of them are
checked, so is the master checkbox. But if some are checked and some are not
checked? The master checkbox state cannot be determined—it is indeterminate!

For example, each email in your GMail inbox has its own checkbox to select it.
Up top, there is another checkbox. If you check that one, all of the emails are
selected. Uncheck to deselect all emails.

If you only select a few emails, then the state of that checkbox cannot be
determined. You have neither selected all of the emails, nor have you deselected
all of them.

{{< img pattern="gmail-checkboxes" alt="A screenshot of a list of emails in GMail. Three of the seven visible emails are selected. There is an arrow pointing to a checkbox which controls the select all or none behavior of the emails. That checkbox appears with a line in the middle, indicating an indeterminate state." >}}
The checkbox to select all or none of your emails appears in an indeterminate
state when only a few of the emails are selected. {{< /img >}}

## How do we make this happen?

Although indeterminate checkboxes are conceptually simple, implementing them
correctly on a web page is not. We will be referencing
[the HTML specification about checkboxes](<https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)>)
and using that information to implement indeterminate checkboxes.

Let's go!

## Content and IDL attributes

The first part of the specification we need to understand is this:

{{< blockquote source="https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)" credit="HTML Specification" >}}
If the element's `indeterminate` IDL attribute is set to true, then the
control's selection should be obscured as if the control was in a third,
indeterminate, state. {{< /blockquote >}}

This begs the question: What is an "IDL attribute"?

Glad you asked.

In HTML, elements have "content attributes". These are the attributes that you
can set on HTML elements, such as `id` and `class`.

```html
<p id="neat-paragraph" class="neato">Content attributes are neat</p>
```

HTML code is interpreted by the browser on the web page's first load in order to
initialize the DOM. You can use content attributes to set up the initial state
on the DOM nodes created by your HTML code.

Later on, if I wanted to get the class name for this element in JavaScript, I
could do this:

```js
const p = document.querySelector("#neat-paragraph");
console.log(p.className); // "neato"
```

That property `className` on the `p` element is an "IDL attribute" for that
element. "IDL" stands for "Interface Definition Language". The
[Web IDL](https://heycam.github.io/webidl/) is the specification for IDL
attributes to be implemented in web browsers. In JavaScript, we can use IDL
attributes to interact with the state of DOM nodes.

So to sum up:

<dl>
    <dt>Content attributes</dt>
    <dd>The attributes you set on DOM nodes by writing them in your HTML code. </dd>
    <dt>IDL attributes</dt>
    <dd>The attributes on DOM nodes that you interact with in JavaScript code.</dd>
</dl>

Content attributes and IDL attributes often correspond, but not always. In the
example above, we see that the content attribute is called `class` but the IDL
attribute is called `className`. The kinds of things you can do with those
attributes are also totally different between HTML and JavaScript.

The `indeterminate` attribute is one case of an IDL attribute that does not have
any corresponding content attribute. This means that the only way to set this
state is with JavaScript.

```js
const cb = document.querySelector("#select-all-checkbox");
cb.indeterminate = true;
```

## Checkboxes only have two states

The next important thing we need to understand is this:

{{< blockquote source="https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)" credit="HTML Specification" >}}
The control is never a true tri-state control, even if the element's
`indeterminate` IDL attribute is set to true. The `indeterminate` IDL attribute
only gives the appearance of a third state. {{< /blockquote >}}

This is good to keep in mind. Whether or not a checkbox is checked is always
determined; it is always true or false. This matters when you are handling the
submitted values from a `form`. It will never submit an indeterminate value.

## A note about ARIA

I am always trying to keep my websites accessible, and you should, too.
{{< marginnote id="accessible" >}}You can read the accessibility statement for
this very website on the [home page](/).{{< /marginnote >}} To keep things
accessible, it is important that we follow the
[ARIA guidelines from the W3C](https://www.w3.org/WAI/). They have excellent
documentation!

For checkboxes, there is an `aria-checked` attribute that you could set on the
checkbox. It is
[strongly recommended that you don't do this](https://www.w3.org/TR/html-aria/#att-checked).
The reason for this is that it would be really bad for `aria-checked` to
disagree with the actual state of the element.

The good news is that the value of `aria-checked` is automatically calculated
for you!

{{< img pattern="checked-mixed" alt="A screenshot of a checkbox in an indeterminate state, with the Chrome developer tools opened next to it in the Accessibility tab. The computed ARIA properties include a property called 'checked' with a value of 'mixed', corresponding to the state of the checkbox." >}}
The Chrome developer tools has an Accessibility tab where we can see the
computed ARIA attributes for the elements in the DOM. As you can see, the
computed `Checked` value for an indeterminate checkbox is "mixed". {{< /img >}}

I don't see any reason why you would need to manually set the `aria-checked`
attribute for a checkbox, unless you are building one from scratch out of `div`
elements.

Perhaps you think you need this so that you can write a CSS selector for
indeterminate checkboxes.

However…

## There's a CSS selector for that

More good news! CSS allows us to select checkboxes in any of the three states
using pseudo-classes.

- The `:checked` pseudo-class selects checkboxes that are checked.
- We can use `:not(:checked)` to select for checkboxes that are not checked.
- The `:indeterminate` pseudo-class selects checkboxes in an indeterminate
  state.

## A React + TypeScript implementation

Now that we have pulled back the curtain on tri-state checkboxes, I will end
this post with an implementation of a `Checkbox` component in React +
TypeScript. The benefits of wrapping the native element in a component is that
we can support an `indeterminate` prop right on the component itself.

The goal is to use the `Checkbox` like so, where `checked` and `indeterminate`
are two boolean props on the component.

```jsx
<Checkbox checked indeterminate />
```

Here is the full implementation:

{{< highlight-file Checkbox.tsx tsx >}}

You can play around with it in
[this Codesandbox](https://codesandbox.io/s/indeterminate-checkbox-dh0m5?file=/src/Checkbox.tsx:0-2017).

Happy hacking!
