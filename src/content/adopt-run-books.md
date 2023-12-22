---
layout: post
title: Adopt run books
image: img/unsplash/calle-macarone-15wIddvL5dU-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [Software Incident Management, Technical Documentation, Run Books]
draft: false
excerpt: Discover the essential role of run books in streamlining incident management and maintenance scenarios
---

Photo by <a href="https://unsplash.com/ja/@callemac?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Calle Macarone</a> on <a href="https://unsplash.com/photos/15wIddvL5dU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Adopt run books

A Run Book / Operations Manual for known maintenance scenarios. These should act as a technical support knowledge base. Run books, often underutilized, serve as a beacon of clarity and order in this chaotic landscape. They are comprehensive, step-by-step guides that detail the processes and actions necessary for handling routine operational tasks and resolving incidents.

Example scenarios include:

- Routine maintenance like database backups
- Incident response like a security breach
- Software deployments

> ℹ Any known manual tasks or issue remedies should be documented as a run book including any scripts used to automate technical workflows or investigations of production issues.

> ⚠️ Please keep these run books up to date. If you run through one and notice something different or require additional steps please do account for this. If you solve a new technical issue do document this as a run book. This avoids solving the same problems over and over.

## Best Practices

- Ensure each step in the run book is clearly described and easy to follow. Avoid jargon and overly technical language unless absolutely necessary.
- Keep run books up-to-date with the latest procedures and changes in the infrastructure. Outdated run books can lead to ineffective or harmful actions.
- Regularly test the procedures in your run books to ensure they work as expected. This is especially crucial for critical incident response run books.
- Encourage team members to provide feedback on the run books based on their experiences. Continuous improvement is key to maintaining effective run books.
- Incorporate run books into training programs for new staff to ensure they are familiar with established procedures and protocols.

By adopting these practices, organizations can maximize the effectiveness of their run books, leading to more efficient and reliable operations and incident management.

## Template

```markdown
# Description

## Situation

What is the situation that this run book addresses?

## Remedy

What steps need to be taken to remedy this?
```

## Example

# How to assume an AWS IAM role via the CLI

## You need to assume a role from the AWS CLI

## Situation

Assume/Impersonate a role that has the rights you desire using `aws sts` `assume-role` command

## Solution

```bash

aws sts assume-role --role-arn "arn:aws:iam::[Account Id]:role/[Role Name]" --role-session-name [Session Name]

```

Depending on your workflow, ensure that the `AccessKeyId`, `SecretAccessKey`, and `SessionToken` output from that command are stored where they need to be. Also, ensure that the region is set to the desired target. A simple approach is to create a new section in the credentials file and mark that as the default with the required values.

Example:

```

[default]

aws_access_key_id = [Access Key]

aws_secret_access_key = [Secret Key]

```

On completion, a session token will be added to the credentials file:

```
[default]

aws_access_key_id = [Access Key]

aws_secret_access_key = [Secret Key]

aws_session_token=[Security Token]

```

> ⚠️ Assuming a role provides a short-lived token, if you suddenly lose access again, check that the token has not expired. In which case you will need to assume the role again.
