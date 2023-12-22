---
layout: post
title: Adopting decision records
image: img/unsplash/maksym-kaharlytskyi-Q9y3LRuuxmg-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [Architecture Decision Records, Software Design, Team Collaboration]
draft: false
excerpt: Architecture Decision Records (ADRs) serve as a crucial tool in documenting software design choices that address significant functional or non-functional requirements in architecture.
---

Photo by <a href="https://unsplash.com/@qwitka?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Maksym Kaharlytskyi</a> on <a href="https://unsplash.com/photos/Q9y3LRuuxmg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Architecture Decision Records (ADRs)

An Architecture Decision Record (ADR) is a software design choice documentation that addresses a functional or non-functional requirement that is architecturally significant.

Having this record-keeping allows the team to easily go back in time to understand the current status and be better able to pivot with complete knowledge. These prove very useful for new joiners as well. Another key thing is that when the team decides on something and someone is tasked with putting it down as a record, often that could identify gaps or misalignment and allow addressing this early on particularly when examples are involved.

## Example

---

# Adopt SQL Temporal Tables for time travel

> Created: 2023-01-01

> Updated: 2023-01-05

> Participants: Entire Tech Team

## Status

Accepted

## Context

We are building an Analytics database that needs to keep track of historical data, and we need to decide on the best way to implement this feature.

## Alternatives

- ...

- SQL Temporal Tables: This approach involves using the built-in SQL temporal table feature to automatically track the history of a table. This approach allows for easy querying of historical data and does not require additional storage as the history is stored in the same table as the current data.

## Decision

We will use the SQL Temporal Tables approach for tracking history.

## Reasoning

SQL Temporal Tables allow for easy querying of historical data. It also allows storing the history of a table transparently and is easy to use.

### Pros

- Temporal tables allow for easy tracking and querying of historical data.
- ...

### Cons

- Temporal tables can add complexity to a database schema.
- ...

---

## Authoring recommendations

✅ **DO** ensure that the records are immutable. The decisions made in a previously published ADR should not be altered in a way that changes the decision, a new record should be made in the interest of maintaining the history.

✅ **DO** ensure that each record is specific to one decision only.

✅ **DO** ensure that all decisions are consistent with other team and organization agreed-upon principles and standards.

✅ **DO** reference other detailed documentation and supporting artefacts to avoid duplications.

✅ **DO** ensure that you document a clear argument as this is as important as the decision. Outline the position, including things like implementation cost, ownership cost, resource requirements, etc.

✅ **DO** follow a minimalist approach and document only the issues that need addressing or attention.

## Template

---

# NUMBER - Title

> Created: [YYYY-MM-DD] when the decision was created

> Updated: [YYYY-MM-DD] when the decision was last updated

> Participants: [list involved participants/team]

## Status

Proposed | Rejected | Accepted | Deprecated | … | Superseded by [Another Run Book Link]

## Context

Describe the context and problem statement, e.g., in free form using two to three sentences. You may want to articulate the problem in form of a question

## Decision

This is the decision that was made if any alternatives were considered, list them here

## Consequence

This is the consequence of the decision
---

## Conclusion

In summary, ADRs are instrumental in maintaining a clear and accessible record of architectural decisions, aiding in team alignment, retrospective analysis, and onboarding new members.
