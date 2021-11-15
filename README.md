This is the source code for the website of Tony Mottaz, published to
https://tonymottaz.com.

## License

See the `LICENSE` file in this directory.

## Building and local development

In order to build this site, you need the following installed:

- Hugo version 0.83.0 or greater:
  https://github.com/gohugoio/hugo#choose-how-to-install
- Node.js + npm: https://nodejs.org/en/download/

Once you have these installed, be sure to install the dependencies:

```sh
npm install
```

Common commands:

```sh
# Start a local web server
hugo server

# Format all source files
npm run fmt

# Make a production-ready build
npm run build
```

## Code conventions

I hope that this repository is a good example for how to write a Hugo site well.
With that goal in mind, this section of the README is dedicated to explaining
the conventions and methods that I use to organize and author the code you will
find here.

### Hugo shortcode documentation

[Hugo shortcodes](https://gohugo.io/content-management/shortcodes/#readout) are
extremely useful, but one thing that is sorely lacking is conventional shortcode
documentation. The most necessary information to have is a list of the
attributes that can be set on a shortcode. At the top of all of my shortcodes is
the following comment:

```
{{/* Brief description about what the shortcode does.
  first-attribute: Description of attribute.
  second-attribute?: This one is optional.
  inner: Not an attribute, but the literal .Inner content for this shortcode.
*/}}
```

### CSS Methodology

See [_CSS Methodology_](./css-methodology.md).
