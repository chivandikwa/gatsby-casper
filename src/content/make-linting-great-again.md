---
layout: post
title: Make linting great again
image: img/clean/used/horse-status.jpg
author: [Thulani S. Chivandikwa]
date: 2021-06-29T10:00:00.000Z
tags: [eslint, linting, node]
draft: false
excerpt: make linting great again
---

I am a firm believer in the role of linting in keeping code bases from decaying and enforcing standards and consistency. Particularly, I feel linting tools really shine as code bases age. For JavaScript based projects, I find eslint to be pretty powerful but acknowledge that one thing that can keep developers from using it often is that it can be slow in running if not setup properly, especially with regards with caching and is hooked up to commits with something like husky, and if linting violations have been ignored for a while one can drown in a lot errors and warnings.

My common eslint usecase is running it against files I have just added/updated and quite rarely do I need to run it on the whole solution until I am ready to open a pull request. If I do however I always make sure caching is on by using the `--cache` flag that only runs linting on file changed since last run.

> Setup the `--cache` flags as part of a lint command in your package.json for ease of use

However how do I get to run eslint only on files I just updated? The answer is simple, I use git and one easy way to narrow down these files is to have them staged.
Enter lint-staged!

## lint-staged

[Lint staged](https://www.npmjs.com/package/lint-staged) is a tool that runs linters against git files that are staged to stop the 💩 from slipping into your code. Notice I said linters, not eslint, so this can be used with various linting tools. Install it with `npm i lint-staged --save-dev`.

To set it up for the first time run `npx mrm lint-staged`. I prefer to use the .linstagedrc file for configuration and if you are using eslint you can set it up as

```json
{
  "*": "eslint --cache"
}
```

I typically run my linting and manually go over any warning/errors. If you want to auto-fix what can be auto-fixed you can use the `--fix` flag.

Once setup you can give it a go with `npx lint-staged`. Don't forget off course that you need staged files for this to work. You can go a step further and set it up to auto-run with hooks by using tools such as husky.

> By default lint-staged will only show error in the run summary, to see warnings as well, which is super useful run with the `--verbose` flag.

Now that you can't complain about being overwhelmed by lint violations others introduced or slow runs, what is your excuse not to take advantage or linting with eslint 😀?
