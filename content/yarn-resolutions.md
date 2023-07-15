---
title: "Multiple versions of the same dependency in Yarn resolutions"
description: In this blog post, I explain how to set Yarn resolution rules in a Yarn workspaces monorepo when different workspaces need different versions of the same dependency.
date: 2023-04-01
layout: layouts/post.njk
tags:
	- post
---

## Setup

I was working with [Yarn 2 workspaces][] monorepo recently, and I needed to install a different version of React in different workspaces. The setup for that is straightforward. In each workspace's `package.json` file, you set the dependency versions as usual. For this example, I have `project-one` and `project-two` with different versions of React.

```json:packages/project-one/package.json
{
	"dependencies": {
		"react": "^17.0.0"
	}
}
```

```json:packages/project-two/package.json
{
	"dependencies": {
		"react": "^18.0.0"
	}
}
```

[Yarn 2 workspaces]: https://yarnpkg.com/features/workspaces

## Dealing with resolutions

For _reasons_, we needed to set [resolution rules][] for React to ensure that we were installing the correct version.

[resolution rules]: https://yarnpkg.com/configuration/manifest/#resolutions

Here's the rub: Yarn only allows you specify resolutions in the root workspace, and we needed separate resolution rules for each of the major versions of React that we are using.

To do that, you need to use the following syntax:

```json
{
  "resolutions": {
    "react@^17.0.0": "17.0.2",
    "react@^18.0.0": "18.2.0"
  }
}
```

In general, if your dependency is listed in `dependencies` or `devDependencies` like this:

```json
{
  "dependencies": {
    "<name>": "<range>"
  }
}
```

Then you can write a resolution rule like this:

```json
{
  "resolutions": {
    "<name>@<range>": "<resolve-range>"
  }
}
```

## A note about "yarn set resolution"

The [`yarn set resolution`][yarn set resolution] command can be used to update the installed version of your dependency, and it will update your `yarn.lock` file. However, be warned that the `-s, --save` flag for this command _is not implemented yet_ at the time of writing. So if you are like me and wondering why your root `package.json` is not being updated by this command, that is why!

[yarn set resolution]: https://yarnpkg.com/cli/set/resolution
