---
layout: post
title: Killing node processes
image: img/unsplash/gunnar-ridderstrom-M95qcCum7t8-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2021-06-30T10:00:00.000Z
tags: [node]
draft: false
excerpt: killing node processes
---

Photo by <a href="https://unsplash.com/@gunnarridder?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Gunnar Ridderström</a> on <a href="https://unsplash.com/photos/M95qcCum7t8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Visual Studio has this annoying tendency to leave zombie node processes after you have run a node app from it. This can be quite expensive and leave your machine very laggy as they accumulate from multiple runs. You may also run into this situation for different reason.

There are two ways to kill these zombie processes

1. Kill all node processes running
2. Target specific node processes

To kill all node processes run the command

```cmd
taskkill /f /im node.exe
```

This has proven to be a bit problematic for me as I sometime have node processes that I want to keep alive such as those from running VS Code and extensions or other apps. I therefore prefer to target specific node apps based on the command that is used to spawn them. For instance if using `react-app-rewired start` to run the app I would target that by running the following script.

```powershell
Get-WmiObject Win32_Process | Where-Object {$_.CommandLine -like '*react-app-rewired*start*' -and $_.Name -eq 'node.exe' } | ForEach-Object {$_.terminate(0)}
```
