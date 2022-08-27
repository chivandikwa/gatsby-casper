---
layout: post
title: Adopt run books
image: img/clean/used/cat.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [runbook, incidents, documentation]
draft: false
excerpt: documenting steps to know situations
---

# Adopt run books

A Run Book / Operations Manual for known maintenance scenarios. These should act as a technical support knowledge base.

> ℹ Any known manual tasks or issue remedies should be documented as a run book and including any scripts used to automate technical workflows or investigations of production issues.

> ⚠️ Please do keep these run books up to date. If you run through one and notice something different or require additional steps please do account for this. If you solve a new technical issue do document this as a run book. This avoids solving the same problems over and over.

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

## You need to assume a role from the AWS CLI.

## Situation

Assume/Impersonate a role that has rights you desire using `aws sts` `assume-role` command

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
