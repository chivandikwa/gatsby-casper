---
layout: post
title: Dotnet Tools
image: img/clean/used/deltse.jpg
author: [Thulani S. Chivandikwa]
date: 2020-12-01T00:00:00.000Z
tags: [.net]
draft: false
excerpt: some really handy dotnet tools
---

Dotnet tools are really awesome and cover quite a broad range of uses. I have a couple that I cannot do without that I would like to share.

### Managing references

I like to keep my projects clean and tend to prune transitive dependencies. Doing it manually however can be tedious. There is a tool for that.

[snitch] (https://github.com/spectresystems/snitch) `dotnet tool install -g snitch`

### Visualizing code coverage

I use coverlet and often need to convert the output into a human readable format, html in my case. There is a tool for that.

[report generator] (https://github.com/danielpalme/ReportGenerator) `dotnet tool install -g dotnet-reportgenerator-globaltool`

### Enforcing .editorconfig

I honestly get frustrated when formatting is inconsistent, particularly when it makes me start to read through code slower. Well how do you enforce that nice editorconfig you already worked on as a team? There is a tool for that.

[report generator] (https://github.com/dotnet/format) `dotnet tool install -g dotnet-format`

### Update packages

I like dependabot but there are times when I need to do this locally as well. In particular if say there are 10 packages to update, I would like to update 1 at a time and on each update run a dotnet clean, build and test. If all is good then move to the next. There is a tool for that.

[nukeeper] (https://github.com/NuKeeperDotNet/NuKeeper) `dotnet tool install nukeeper --global`

> For my particular use case I use the `nukeeper update` option. There are however more options including the ability to open pull requests for a project or entire org (only supported in GigHub)
