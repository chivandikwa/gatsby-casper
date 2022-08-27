---
layout: post
title: Adopting decision records
image: img/clean/used/bird-2.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [decisions, records, documentation]
draft: false
excerpt: track all decisions of architectural significance
---

# Adopt decision records

A Decision Record (DR) is a software design choice documentation that addresses a functional or non-functional requirement that is architecturally significant. This might, for instance, be a technology choice (React vs. Angular), a choice of the IDE (Visual Studio Code vs. Visual Studio), a choice between a library (formik vs final form), or a decision on features (infinite undo vs. limited undo).

Having this record keeping allows the team to easily go back in time to understand the current status and be better able to pivot with complete knowledge. These prove very useful for new joiners as well. Another key thing is that when the team decides on something and someone is tasked with putting it down as a record, often that could identify gaps or misalignment and allow addressing this early on particularly when examples are involved.

## Template

```markdown
# NUMBER - Title

Created: [YYYY-MM-DD] when the decision was created]

Updated: [YYYY-MM-DD] when the decision was last updated]

Participants: [list involved participants/team]

## Status

`[Proposed | Rejected | Accepted | Deprecated | … | Superseded by [10-xxx](10-xxx.md)]`

## Context

[Describe the context and problem statement, e.g., in free form using two to three sentences. You may want to articulate the problem in form of a question]

## Decision

[This is the decision that was made if any alternatives were considered, list them here]

## Consequence

[This is the consequence of the decision]
```

## Guidelines

✅ **DO** ensure that the records are immutable. The decisions made in a previously published ADR should not be altered in a way that changes the decision, a new record should be made in the interest of maintaining the history.

✅ **DO** ensure that each record is specific to one decision only.

✅ **DO** ensure that all decisions are consistent with other team and enterprise agreed-upon principles and standards.

✅ **DO** reference other detailed documentation and supporting artifacts. Particularly avoid duplications.

✅ **DO** ensure that you document a clear argument as this is as important as the decision. Outline the position, including things like implementation cost, ownership cost, resource requirements, etc.

✅ **DO** follow a minimalist approach and document only the issues that need addressing.

## Example

```
# 2 - Adopt more use of trailing commas

Created: 2021-08-18

Updated: 2021-08-18

Participants: Team

## Status

`Accepted`

## Context

-   Auto merge often results in broken code on addressing addition to lists from multiple branches, particularly with things like constants files, enums, list definitions, etc.

-   Diffs appear dirtier as each addition to a list shows the previous line as having changed as well due addition of a comma at the end

## Decision

1. Favor cleaner diff

1. Favor safer merges

We shall add trailing commas where applicable going forward

### Typescript examples

✅ **DO** trailing comma in multiline literals


var arr = [
    1,

    2,

    3,
];

var object = {
    foo: "bar",

    baz: "qwerty",

    age: 42,
};


✅ **DO** use a trailing comma with multiline destructuring


var o = {
    p: 42,

    q: true,
};


✅ **DO** use a trailing comma in multiline named imports


import { A, B, C } from "D";


✅ **DO** use a trailing comma in single-line versions of the examples shown above. This is mainly useful in multiline scenarios but keep in mind as these single-line definitions grow they can be formatted to multiline.

⛔ **DO NOT** use trailing commas in JSON, that would not be valid

⛔ **DO NOT** use trailing comma in function parameters. Given the problem context, this is unlikely to be useful

## Consequence

N/A
```
