# CSS Methodology

This document describes the rules that I follow to organize the styles for this
website. This system aims to optimize for simplicity. This site isn't huge, and
I'm the only developer. Too much modularization only slows me down.

Some major sources of inspiration include:

- [RSCSS](https://rscss.io/index.html)
- [_The styled-components Happy Path_](https://www.joshwcomeau.com/css/styled-components/)
  by Josh W. Comeau
- [SMACSS](http://smacss.com/)

## Organization

```
assets/
  styles/
    foundation/
      _base.scss
      _font-{font}.scss
      _tokens.scss
      _theme.scss
    components/
      _index.scss
      _{component}.scss
    layouts/
      {layout}.scss
```

## Foundation

The `foundation` module is a set of CSS rules that apply everywhere.

- `_base.scss`: CSS reset and default styles for each element.
- `_font-[font].scss`: The `@font-face` declarations for a specific font.
- `_tokens.scss`: Sass-only variables, tokens for building the themes.
- `_theme.scss`: CSS custom properties that are reused elsewhere.

These styles _must not_ set layout styles on elements (positions, floats,
margins, width/height, etc.).

## Components

A component is a named set of styled markup. Components are specified by
classnames of at least two words in kebab-case.

- `.external-link`
- `.code-snippet`

A component is either something reused in multiple layouts or the styles for a
shortcode.

### Layout Components

See [the RSCSS guidelines](https://rscss.io/components.html) for authoring
components in layouts.

### Shortcode Components

The markup from a shortcode defines a component as well. At minimum, it should
declare a classname on the root element. Style
[variants](https://rscss.io/variants.html) can be supported with a custom
`class` attribute. For example:

```
{{ $class := "my-shortcode" }}
{{ with .Get "class" }}{{ $class := print $class " " . }}{{ end }}

<div class="{{ $class }}" />
```

Base styles would be applied to the `.my-shortcode` class, and variations should
be named using a flag syntax. E.g. `-small`, `-large`, `-simple`, etc.

```
{{< my-shortcode class="-small -simple" >}}
```

## Layouts

The layout styles are the compiled CSS files that will actually be used in the
website. There should be exactly one layout stylesheet per layout template.
These stylesheets are coupled to the markup of those layout templates. Layout
stylesheets define all
[position-related CSS styles](https://rscss.io/layouts.html).

## Contextual styles

Every component owns its own styles. Avoid reaching into one component from
another component.

If a certain variant of a component should always apply when nested in some
other component, do not rely on remembering to set that variant every time.
Instead, a component may be given "contextual styles".

For example (adapted from Josh W. Comeau), suppose our anchor tags have the
following base styles.

```scss
a {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}
```

But when the text link appears within an aside note, we want it to look
different. To do this, we take advantage of Sass's `&` placeholder token and put
the contextual styles within the text link's style block.

```scss
a {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);

  .aside-note & {
    color: var(--color-text);
    font-weight: var(--font-weight-bold);
  }
}
```

This way, we know clearly what all of the possible styles are for the `a` tag.

## Components never layout themselves

Components must not dictate their own layout so that they are reusable
everywhere they are needed. Do not use the following CSS rules on components:

- Positioning: `position`, `top`, `bottom`, `right`, `left`
- Floats: `float`, `clear`
- Margins: `margin*`
- Dimensions: `width`, `height`
  - Unless the component has a fixed size, such as avatars or logos.

Components may (and should) position the elements within them in a responsive
manner.

General purpose layouts are their own components that are used to wrap other
components. Name these as `.layout-*`

```scss
.layout-fullbleed {
  display: grid;
  grid-template-columns: 1fr min(65ch, 100%) 1fr;

  & > * {
    grid-column: 2;
  }

  & > .fullbleed {
    width: 100%;
    grid-column: 1 / -1;
  }
}
```

> Credit:
> [_Full-Bleed Layout Using CSS Grid_ by Josh W. Comeau](https://www.joshwcomeau.com/css/full-bleed/).

## Tokens and themes

Tokens are raw Sass variables that are reused to define themes.

A theme consists of semantically named values defined in CSS custom properties.

```scss
$red: #ff0000;
$green: #00ff00;

:root {
  --color-success: $green;
  --color-error: $red;
}
```

Components should use theme values (custom properties) for any styles that are
shared by multiple components, such as typography and color values.
