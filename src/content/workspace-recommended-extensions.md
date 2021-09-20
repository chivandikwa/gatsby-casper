---
layout: post
title: VS Code workspace recommended extensions
image: img/clean/used/bird.jpg
author: [Thulani S. Chivandikwa]
date: 2021-06-30T10:00:00.000Z
tags: [vscode, extensions]
draft: false
excerpt: sharing extension recommendations in workspace
---

Visual Studio Code has support for specifying extension recommendations as part of you workspace. Developers can then see these in the extensions tab and decide what to install.

## Here is how to set it up.

![gif](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/extensions-recommendation.gif)

This creates a file named `extensions.json` under `.vscode` in your workspace root which looks something like this.

```json
{
  "recommendations": ["editorconfig.editorconfig"]
}
```
