---
layout: post
title: VS Code workspace recommended extensions
image: img/unsplash/barn-images-t5YUoHW6zRo-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2021-06-30T10:00:00.000Z
tags: [vscode, extensions]
draft: false
excerpt: sharing extension recommendations in workspace
---

Photo by <a href="https://unsplash.com/@barnimages?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Barn Images</a> on <a href="https://unsplash.com/photos/t5YUoHW6zRo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Visual Studio Code has support for specifying extension recommendations as part of you workspace. Developers can then see these in the extensions tab and decide what to install.

## Here is how to set it up

![gif](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/extensions-recommendation.gif)

This creates a file named `extensions.json` under `.vscode` in your workspace root which looks something like this.

```json
{
  "recommendations": ["editorconfig.editorconfig"]
}
```
