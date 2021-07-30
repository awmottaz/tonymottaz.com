# CSS Methodology

This document describes the rules that I follow to organize the styles for this
website. This system aims to optimize for simplicity. This site isn't huge, and
I'm the only developer.

Some major sources of inspiration include:

- [RSCSS](https://rscss.io/index.html)
- [_The styled-components Happy Path_](https://www.joshwcomeau.com/css/styled-components/)
  by Josh W. Comeau
- [SMACSS](http://smacss.com/)

## Organization

```
assets/
  _foundation.scss
  layouts/
    about.scss
    baseof.scss
    home.scss
    list.scss
    single.scss
  partials/
    _index.scss
    {partial}.scss
  shortcodes/
    _index.scss
    {shortcode}.scss
```

## Foundation

The `foundation` module is a set of CSS rules that apply everywhere.

- Default styles for semantic elements
- CSS reset
- Initial values of CSS custom properties

## Components

A component is a piece of UI that is comprised of markup and styles. The markup
is written either as a partial template, shortcode template, or layout template.
The styles are organized to mirror this.

- Components do not style their own layout. That is, the root element(s) should
  not have any position, float, margin, or dimension styles applied to them.
- They may, however, apply layout styles to the elements within the component.
- Avoid using element selectors. Prefer class selectors.

### Nesting components

Components may have to be nested within each other. If this happens, do not
style the inner component from the outer component.

Instead, give the inner component contextual styles.

```scss
.link {
  color: blue;

  .sidenote & {
    color: green;
  }
}
```

More on this strategy [here][1].

[1]: https://www.joshwcomeau.com/css/styled-components/#single-source-of-styles

### Layout components

The layout components are the target compiled stylesheets. Each of these are
included in their respective layout templates.

The `baseof.scss` file will include `_foundation.scss` as well as all `partials`
and `shortcodes` styles. If this becomes a size/performance issue in the future,
I may reconsider this approach.

## Typography

Typography styles are handled differently than other styles because these are
generally inherited by nested elements. For this reason, it is okay to generally
ignore the "contextual styles" advice for typography-related styles. A couple of
things to keep in mind, however:

- Be intentional about when certain styles should be inherited vs. set
  explicitly.
- If multiple style declarations should be logically linked, use a CSS custom
  property to achieve that.

## CSS custom properties

CSS custom properties are extremely useful for logically linking the styles of
several elements. I make liberal use of them.
