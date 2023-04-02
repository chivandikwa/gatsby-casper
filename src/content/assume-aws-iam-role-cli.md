---
layout: post
title: How to assume an AWS IAM role via the CLI
image: img/unsplash/engin-akyurt-8sM2SsANvKk-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [aws, iam, cli]
draft: false
excerpt: aws iam roles
---

Photo by <a href="https://unsplash.com/pt-br/@enginakyurt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">engin akyurt</a> on <a href="https://unsplash.com/photos/8sM2SsANvKk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# How to assume an AWS IAM role via the CLI

You need to assume a role from the AWS CLI.

## Approach

Assume/Impersonate a role that has rights you desire using `aws sts` `assume-role` command

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
