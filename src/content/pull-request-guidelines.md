---
layout: post
title: Pull Request Guidelines
image: img/unsplash/stijn-swinnen-Q8FHN3qSq2w-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-09-18T19:00:00.000Z
tags: [pull requests, best practices, git]
draft: false
excerpt: practices for disciplined development with GIT and PRs
---

Photo by <a href="https://unsplash.com/@stijnswinnen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Stijn Swinnen</a> on <a href="https://unsplash.com/photos/Q8FHN3qSq2w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

## Pull Request Guidelines

✅ **DO** consider PRs as a useful process to reviewing code and ensuring standards are followed.

✅ **DO** create a process to ensure review of PRs is done in a timely manner to avoid blocking other team members' progress. Not getting this right can be a common reason for a team to not commit to the process.

✅ **DO** provide actionable and constructive feedback when reviewing Pull Requests and be prepared to provide more time to assist in further understanding or addressing that feedback.

✅ **DO** encourage reviewers to be ready to pair with contributors to assist with recommendations they have provided.

✅ **DO** encourage reviewers to provde specific examples or suggestions when requesting changes or improvements.

✅ **DO** respond to comments and reply with urgency, whether you have opened the Pull Request or are a reviewer.

✅ **DO** make use of various [markdown features](https://learn.microsoft.com/en-us/azure/devops/project/wiki/markdown-guidance?view=azure-devops) to make your comments easier to follow through. For example, use code fences when code is provided. Providing links is also critical.

✅ **DO** keep your PRs concise. Small PRs are easier to review, less error-prone, and quicker to integrate. Aim for a single concern per PR.

✅ **DO** ensure that the PR title is descriptive. It should give a summary of the changes, making it easier to understand the purpose of the PR at a glance.

✅ **DO** [link relevant tasks, user stories, or bugs](https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-requests?view=azure-devops&tabs=browser#link-work-items-to-a-pull-request) from Azure Boards to your PR. This provides context and allows tracking of work across the project both from the PR and from the linked work items.

> Enforce this by making linked work items a requirement for a Pull Request to be merged via [branch policies](https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops&tabs=browser#check-for-linked-work-items). You also get the added benefit of potentially autocompleting linked items on Pull Request merge.

✅ **DO** use [draft Pull Requests](https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-requests?view=azure-devops&tabs=browser#create-draft-prs) in Azure DevOps if your changes are still in progress. This signals to reviewers that feedback is welcome, but the PR isn't ready for final review.

✅ **DO** assign specific team members as reviewers based on their expertise or involvement in the code/module you've modified where necessary. This ensures the right eyes are on your PR.

> While this ensures the right eyes are on a PR, it should be used sparingly and necessary. It will make for better team dynamics if any team member can review Pull Requests and in the long run, this can avoid bottlenecks and potential biases.

✅ **DO** consider [automatically include reviewers](https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops&tabs=browser#automatically-include-code-reviewers) on Pull Requests. You can create a group with all the team members on the team and assign this as required, meaning one team member needs to review and approve the PR before the merge

✅ **DO** address review feedback promptly. This keeps the review process efficient.

✅ **DO** favour [inline or file level comments](https://learn.microsoft.com/en-us/azure/devops/repos/git/review-pull-requests?view=azure-devops&tabs=browser#provide-feedback-in-comments) to provide context close to were the remarks apply on a Pull Request, either as author or reviewer.

✅ **DO** make use of the [suggested changes feature](https://learn.microsoft.com/en-us/azure/devops/repos/git/review-pull-requests?view=azure-devops&tabs=browser#suggest-changes-in-comments) to suggest replacement text for one or more lines in a file which offers convenience for the author to apply the changes by staging a commit if they agree.

✅ **DO**  make use of [comment statuses](https://learn.microsoft.com/en-us/azure/devops/repos/git/review-pull-requests?view=azure-devops&tabs=browser#change-comment-status) accordingly.

- **Active**: the default status for new comments.
- **Pending**: the issue in this comment is under review and awaits something else.
- **Resolved**: the issue in this comment is addressed.
- **Won't fix**: the issue in this comment is noted but won't be fixed.
- **Closed**: the discussion in this comment is closed.

✅ **DO** use the vote feature as a reviewer to indicate your status of the review.

- Approve: Approve the proposed changes in the PR. This option is just a vote and doesn't approve the PR.
- Approve with suggestions: Approve the proposed changes in the PR with optional suggestions for improvement. This option is just a vote and doesn't approve the PR.
- Wait for author: asks the author to review the reviewer's comments. The PR author should let the reviewers know to re-review the code after the PR author has addressed the comments. If a required reviewer sets this vote option, the vote will block PR approval.
- Reject: indicates that the changes aren't acceptable. When you choose this option, add a comment explaining why. If a required reviewer sets this vote option, the vote will block PR approval. This vote option should normally not be required.
- Reset feedback: clears your vote. The absence of a vote doesn't prevent a PR from being

✅ **DO** make use of [labels and tags](https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-requests?view=azure-devops&tabs=browser#add-tags-to-a-pull-request) in Azure DevOps to categorize your PRs. This can help in filtering PRs based on their nature (e.g., bug, enhancement) or priority.

✅ **DO** consider pushing Pull Request notifications to the Team's preferred messaging platform, preferably something that allows further interaction like Microsoft Teams.

✅ **DO** set up Azure Pipelines to conduct a [pre-merge build](https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops&tabs=browser#build-validation) to ensure the changes don't break the main branch. This is essential to maintain the health of your main branch. Create at minimum a CI pipeline for your PRS to ensure that code compiles, tests and linting succeeds among other things.

> Do similar checks on merging a branch as verifying a branch does not guarantee that the code will necessarily be sane once merged. Consider checks like builds, test runs, deployments to a development environment etc. Your Pull Request checks may include things you may want to omit in these checks like linting.

✅ **DO** configure your PR settings to require [at least one (or more) approval](https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops&tabs=browser#require-a-minimum-number-of-reviewers) before merging. This ensures that every change has been vetted by another set of eyes.

✅ **DO** configure your PR settings to [allow only the merge types](https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops&tabs=browser#limit-merge-types) that match your team branching strategies. Azure Repos has several merge strategies, and by default, all of them are allowed. You can maintain a consistent branch history by enforcing a merge strategy for PR completion.

✅ **DO** configure your PR settings to [require comment resolution](https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops&tabs=browser#check-for-comment-resolution) before merging.

✅ **DO** consider an exit hatch to [bypass branch policies](https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops&tabs=browser#bypass-branch-policies) by granting bypass permission to a user or group. In some cases, you might need to bypass policy requirements so having this exit hatch would be handy, however, you must ensure that this is not abused.

✅ **DO** consider [enabling autocomplete](https://learn.microsoft.com/en-us/azure/devops/repos/git/complete-pull-requests?view=azure-devops&tabs=browser#complete-automatically) on creating a Pull Request. This automatically completes a Pull Request once it fulfils all policies and also allows for automatically completing associated work items and deleting the branch after merging.

> It is highly encouraged to always enable this with the branch deletion ticked to keep the remote clean.

✅ **DO** encourage `drive by` reviews. Even if one person has taken ownership or reviewed a Pull Request, it should be fine and is quite beneficial for someone else with the capacity to join and ask questions or make additional comments.

✅ **DO** encourage the creation of new work items based on suggestions that are great but outside the scope of the current Pull Request. This avoids slowing down the review process while still considering great suggestions that go through the triage and prioritization processes of the team.

✅ **DO** encourage an environment where it is OK to disagree with Pull Request review remarks or how an implementation has been done, however politely and constructively. Encourage discussions and feedback in PRs, and always be respectful and adhere to your team's standards and practices

> Effort in ensuring the team has a shared view on coding practices and principles, architecture etc. makes it easier to be constructive in feedback as there is always a reference point on the agreed upon team approach, which however should not be the law but can also be challenged as the team learns more from the project and grows

✅ **DO** look out for common and recurring feedback and find ways to automate the checks. A lot of linting-esque tools can be used to automate such checks, for example Roslyn Analyzers and the [Editor Config](https://learn.microsoft.com/en-us/visualstudio/ide/create-portable-custom-editor-options?view=vs-2022) in .NET with dotnet tools like [dotnet-format](https://github.com/dotnet/format), [ES Lint](https://eslint.org/) for JavaScript/TypeScript, [Hadolint](https://hadolint.github.io/hadolint/) for Docker files, [kubeconform](https://github.com/yannh/kubeconform) for Kubernetes, [Spectral] for OpenAPI and more.

> Use CI tools to automate linting, coding practices, test runs, and other checks to streamline code reviews and maintain code quality. Do this with PR comments that become regular.

> See Github's [Super-Linter](https://github.com/super-linter/super-linter) for inspiration on some linters that can be used in Github actions and independently elsewhere, for example from Azure Pipelines.

✅ **DO** use a [Pull Request template](https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-request-templates?view=azure-devops) to standardize the information provided when opening a PR. This ensures consistency and provides reviewers with the necessary context.

Example

```
### Description
What are you changing, and what does merging this achieve? Why is this change being made?

### Screenshots
Is this a UX change or can screenshots help the reviewer see the before and after or understand the solution better? Do you have any manual testing evidence?

### Checklist

- [ ] Self-review complete
- [ ] Code builds without errors
- [ ] Relevant tests have been authored/updated
- [ ] All tests are passing locally
- [ ] Relevant documentation updates have been made

💗 Thank you for your contribution!
```
