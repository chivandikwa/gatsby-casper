---
layout: post
title: Make linting great again
image: img/dandelion.jpg
author: [Thulani S. Chivandikwa]
date: 2021-06-29T10:00:00.000Z
tags: [eslint, linting, node]
draft: false
excerpt: make linting great again
---

A am a firm believer in the role of linting in keeping code bases from decaying and enforcing standards and consistency and particularly feel linting tools really shine as code bases age. I find eslint to be pretty powerful but acknowledge that one thing that can keep devs from using it often is that it can be slow and if linting violations have been ignored for a while one can drown in a lot errors and warnings.

My common eslint usecase is running it against files I have just added/updated and quite rarely do I need to run it on the whole solution. If I do however I always make sure caching is on by using the `--cache` flag that only runs linting on file changed since last run. However how do I get to run eslint only on file I just updated?

The answer is simple, I use git and one easy way to narrow down these files is to have them staged. Enter lint-staged!

## lint-staged

[Lint staged](https://www.npmjs.com/package/lint-staged) is a tool that runs linters against git files that are staged to stop the 💩 from slipping into your code. Notice I said linters, not eslint, so this can be used with various linting tools. Install it with `npm i lint-staged --save-dev`. To set it up for the first time run `npx mrm lint-staged`. I prefer to use the .linstagedrc file for configuration and if you are using eslint you can set it up as

```
{
    "*": "eslint --cache"
}
```

I typically run my linting and manually go over any warning/errors. If you want to autofix what can be autofixed you can use the `--fix` flag.

Once setup you can give it a go with ``npx lint-staged`. Don't forget offcourse that you need staged files for this to work. You can go a step further and set it up to autorun with hooks by using tools such as husky.

Now that you can complain about being overwhelmed by lint violations others introduced or slow runs, what is your excuse not to take advantage or linting with eslint 😀?