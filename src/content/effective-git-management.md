---
layout: post
title: Effective Git Management Guide
image: img/unsplash/yancy-min-842ofHC6MaI-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-04-01T19:00:00.000Z
tags: [Git Best Practices, Effective Git Workflow, Git Collaboration Techniques]
draft: false
excerpt: Master the art of disciplined Git usage with our guide on best practices for commits, branch management, and pull requests.
---

Photo by <a href="https://unsplash.com/@yancymin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Yancy Min</a> on <a href="https://unsplash.com/photos/842ofHC6MaI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Effective Git Management Guide

## Commits

✅ **DO** push your commits often, in case **Murphy** *(Murphy's Law)* decides to visit.

✅ **DO** break your work into smaller, logical pieces as commits.

This helps with:

- Making it possible to cherry-pick and revert specific changes
- Making `git blame` easier when trying to track a change, especially around bug fixes, which will then tie nicely with a matching commit message
- Making it possible to review code by commits which can be useful for large Pull Requests

Overall, this approach helps maintain a clean and understandable commit history, making it easier to track the origin of changes and simplifying the review process.

✅ **DO** ensure each commit makes a single, focused change.

✅ **DO** use clear and descriptive commit messages that explain the purpose and effect of the change.

✅ **DO** use the imperative verbs/mood in the subject line. Use a consistent style for your commits, such as starting with a verb and using the present tense.

![bad-commit-messages.png](Git/bad-commit-messages.png)

![good-commit-messages.png](Git/good-commit-messages.png)

> The idea is that instead of a commit message saying what has been done, it should be read as this is what will happen when the commit is applied. Commit messages should read like chapters in a book, the book being the unit of work that will result in a Pull Request.

## Branches Management

✅ **DO** use a well-defined branching strategy like GitFlow or GitHub Flow to manage the development process effectively and keep the main branch stable.

✅ **DO** protect critical branches (e.g., main or develop) by applying branch protection rules, such as requiring PR reviews and passing CI checks before merging.

✅ **DO** use branch prefixes, starting with the name of the committer, a change type like feature, and preferably a task code if you have a tracking system, i.e. `john\feature\128952`. Most git visual tools will create a hierarchy out of this which makes it easy to navigate and filter, especially at the contributor level.

Examples of useful branch prefixes:

- `feature`: Introduces a new feature
- `bug` or `fix`: Addresses a bug
- `boyscout` or `chore`: Performs a change not related to features of fixes such as code formatting, updated dependencies etc. You can also get more granular, i.e. with `format`, `updates`, `style` etc.
- `refactor`: Code specific chore or boy scout
- `doc`: A contribution to documentation
- `test`: Introduces new test coverage or updates existing tests
- `ci`: Changes related to CI artefacts

> When it comes to reverts, generally it is better to retain the default message provided by git as there is a lot of context that can be lost by omitting it.

✅ **DO** clean up remote branches after they are merged to keep the repository clean and organized.

## Pull Requests

✅ **DO** consider PRs as a useful process for reviewing code and ensuring standards are followed.

✅ **DO** use CI tools to automate linting, coding practices, test runs, and other checks to streamline code reviews and maintain code quality. Do this with PR comments that become regular.

✅ **DO** include a summary of the changes, the motivation behind them, and any additional context that will help reviewers understand your work.

✅ **DO** use a pull PR template to enforce the desired structure and information.

Example:

```markdown
# Description

What are you changing, and what does merging this achieve? Why is this change being made?

# Screenshots

Is this a UX change or can screenshots help the reviewer see the before and after or understand the solution better? Do you have any manual testing evidence?

# Checklist

- [ ] Self-review complete
- [ ] Code builds without errors
- [ ] Relevant tests have been authored/updated
- [ ] All tests are passing locally
- [ ] Relevant documentation updates have been made
```

✅ **DO** keep the scope of your PRs limited to make it easier for reviewers to understand and provide feedback.

✅ **DO** encourage discussions and feedback in PRs, and always be respectful and adhere to your team's standards and practices.

✅ **DO** create at minimum a CI pipeline for your PRS to ensure that code compiles, tests and linting succeed among other things.

✅ **DO** configure the PR to autocomplete with branch deletion.

✅ **DO** enforce due diligence on your PRs, for example, you can enforce that a PR should have tasks linked to it and have default individuals/groups assigned as reviewers.

✅ **DO** use labels to categorize and organize pull requests.

✅ **DO** create a process to ensure the review of PRs is done promptly to avoid blocking other team members' progress. Not getting this right can be a common reason for a team to not commit to the process.

✅ **DO** encourage reviewers to provide specific examples or suggestions when requesting changes or improvements.

✅ **DO** encourage reviewers to be ready to pair with contributors to assist with recommendations they have provided.

✅ **DO** wire up your messaging system with your DevOps tool so notifications of PRs can be automatically pushed to the team.

## Other

✅ **DO** master your git tool and common git tasks.

🛑 **DO NOT** allow credentials to leak in git. Leverage tools like Azure Vault and purge the history if credentials are accidentally committed. Also, assume the worst for credentials that leak to your repo and change them.

🎃  DO resolve merge conflicts carefully, ensuring that the intended changes are preserved and the code remains functional. Communicate with your team members when resolving conflicts to avoid misunderstandings.

✅ **DO** use rebasing to maintain a cleaner, linear commit history that makes it easier to track changes and debug issues by perusing through the history with or without visualisation and when using tools like `git bisect`.

Rebasing helps to integrate changes from one branch into another by replaying the commits of the feature branch onto the base branch. This creates a linear commit history, which can be easier to understand and navigate. In contrast, merging combines the two branches by creating a new merge commit, which may result in a more complex commit history.

In the following example, we have a long-running branch, `feature`, that branches off `main`. After our `feature` branch, we then have two additional commits from another branch `bug` that makes their way into the main first.

![git-situation.png](Git/git-situation.png)

One way to sync the `feature` branch is to merge `main` into `feature`

![git-merge.png](Git/git-merge.png)

This creates noise in the history as the fact that `bug` got merged first is not an important detail and we do not need to see the commit in `feature`. If the feature had been started after `bug` was merged would it have mattered? If the answer is no then you want to lean towards rebasing

![git-rebase.png](Git/git-rebase.png)

Notice how the history now looks cleaner.

🎃 **DO BE AWARE** that while rebasing is great and encouraged,  the potential risks and complications when rebasing shared branches can be quite compromising.

Recommended workflow (simplified)

![worflow](Git/workflow.png)

### Handling Large PRs

In instances where you're dealing with large pull requests, it's beneficial to break them into smaller, more manageable parts. This approach makes reviewing easier and faster, as each part can focus on a specific feature or issue. When breaking down a PR, aim to ensure that each smaller PR is self-contained and does not introduce incomplete features or dependencies on other PRs. This strategy not only streamlines the review process but also minimizes the risk of introducing bugs due to complex changes being overlooked in a massive PR.

While it's generally best to avoid large pull requests (PRs) as they can complicate the review process and increase the risk of bugs, there are scenarios where they might be acceptable. For example, changes that are widespread but superficial, such as updates to a package.json file or mass-renaming operations, can be handled in a single large PR. However, for most development work, large PRs should be discouraged due to their complexity and the challenges they present in thorough reviewing and understanding the impact of changes.

One effective strategy for managing large changes is through granular commits. Even if a PR is sizeable, having well-structured, logical commits within it can significantly ease the review process. Each commit should represent a single, coherent change, making it easier for reviewers to understand and track changes step by step. This approach not only facilitates easier code reviews but also aids in future troubleshooting, as each commit stands as a clear record of a specific change.

In cases where large PRs are unavoidable, ensure that they are well-documented, with a clear description of each change and its purpose. Encourage reviewers to focus on individual commits rather than the entire PR at once, to better manage the review process. This granular approach to both commits and PR reviews can help maintain the quality and integrity of the codebase, even when dealing with substantial changes.

### Conclusion

In conclusion, effective Git management is pivotal for a disciplined and efficient development workflow. By adhering to best practices for commits, branch management, and pull requests, teams can maintain a clean and understandable Git history, facilitate easier code reviews, and ensure secure and streamlined collaboration. Large pull requests should be approached with caution, broken down into smaller parts when possible. Real-world experiences teach us the value of these practices in maintaining project health and team productivity. Embracing these guidelines will not only enhance your individual skill set but also contribute significantly to the success of your team's collaborative efforts in software development.
