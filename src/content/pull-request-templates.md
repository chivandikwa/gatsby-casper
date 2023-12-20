---
layout: post
title: Enriching Code Review Culture with Pull Request Templates
image: img/unsplash/glenn-carstens-peters-RLw-UC03Gwc-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-10-25T00:00:00.000Z
tags: [pull request template, pull request, code review]
draft: false
excerpt: Enriching Code Review Culture
---

Photo by <a href="https://unsplash.com/@glenncarstenspeters?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Glenn Carstens-Peters</a> on <a href="https://unsplash.com/photos/person-writing-bucket-list-on-book-RLw-UC03Gwc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>


# Enriching Code Review Culture with Pull Request Templates

The practice of submitting Pull Requests (PRs) is a tradition that not only actions the introduction of changes to the code but also encourages a culture of peer review and collaborative improvement. The elegance of a PR lies in its ability to encapsulate changes, encourage discussions, and ensure a seamless merge with the existing code.

This post aims to showcase not just the structural makeup of a well-curated Pull Request template to complement Pull Request processes and culture, but the underlying ethos that it carries. It's about progressing from mere code contributors to being custodians of a culture that values clarity, collaboration, and code quality above all.

However, the effectiveness of this practice relies on the quality of the information provided within a PR. An ill-described PR can easily become a hole of iterative clarifications, delayed merges, and potentially missed deadlines. Here's where a Pull Request Template comes into play. A well-structured PR template serves to give clarity, ensuring that every proposed change is accompanied by sufficient context, visual aids, and a checklist ensuring its readiness for review. In essence, a PR template is not just a tool, but a culture-enhancer.

A Pull Request (PR) Template is a predefined file that provides a structured format for developers to fill out when they create a new Pull Request on platforms such as GitHub, Azure DevOps or Bitbucket. The template is automatically populated in the pull request description field when a new pull request is created. The primary aim is to ensure consistency and quality in the information provided with each pull request, which in turn facilitates a smoother review process and better collaboration among team members.

Let's see an example of a simplistic yet effective PR template and dissect its potential impact:

```markdown
### Description
What are you changing, and what does merging this achieve?

### Visuals
- **Before and After**: If there's a UI change, provide screenshots/gifs showcasing the change.

### Checklist
- [ ] Self-review completed.
- [ ] Code compiles without errors.
- [ ] Relevant tests added/updated.
- [ ] All tests pass locally.
- [ ] Relevant documentation updated.

💗 Thank you for contributing!
```

The value given by PR template:

1. **Explicitness**: By urging the contributors to provide a clear rationale and expected impact, we're fostering a culture of accountability and clarity.
2. **Visual Aids**: Encouraging the inclusion of visuals like screenshots can significantly accelerate the understanding of the proposed changes. This can also save the reviewer a lot of time in not having to pull down and run the changes, while still having a view and confidence of what the change looks like. PRs should emphasize code review and not be about testing changes this helps to achieve that while giving context.
3. **Self-review Checklist**: A pre-merge checklist instils a sense of responsibility towards ensuring code quality and readiness.

Implementing a Pull Request template isn't merely about adhering to a set protocol, but about nurturing a culture of better communication, self-review, and collaborative growth. It’s about making each stride towards code enhancement a well-informed, well-discussed, and well-documented journey.

In fostering a culture of engineering excellence, tools and practices like a Pull Request template become indispensable allies.

Go ahead and review your team's Pull Request process. These questions can help you establish where you may find value with Pull Request templates.
- What are the things you do very well that you want to continue to encourage?
- What are some things you can do better or that prove to be common pain points in PRs?
- What usually causes delays in PRs?
- What would make it easier or faster for reviewers to go through PRs?
- What is commonly forgotten by the team when making PRs?


Focus on elevating the following areas with Pull Request Templates
- Consistent structure and format
- Information/context probing
- Self-check list
- Reducing time to approval
- Standardizing compliance and best practices
- Encouraging lean yet effective documentation that can be reviewed later
- Encouraging effective collaboration
- Increasing the quality of contributions

> Pull Request templates are meant to complement the Pull Request process and culture and can work hand in hand with other tools. For instance, a line could have been added to remind and encourage the submitter to link tickets to the Pull Request, however with something like Azure DevOps as an example, branch protection can be used to enforce that tickets should be linked to Pull Requests instead.
