---
layout: post
title: How to assume an AWS IAM role via the CLI
image: img/unsplash/engin-akyurt-8sM2SsANvKk-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [AWS IAM role, AWS CLI assume role, AWS Identity and Access Management]
draft: false
excerpt: Learn how to assume an AWS IAM role via the CLI with this step-by-step guide.
---

Photo by <a href="https://unsplash.com/pt-br/@enginakyurt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">engin akyurt</a> on <a href="https://unsplash.com/photos/8sM2SsANvKk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Assuming an AWS IAM role via the CLI is a crucial part of managing your AWS resources securely. This guide will walk you through the process, step by step, and provide best practices to ensure a smooth experience.


## Approach

Assume/Impersonate a role that has rights you desire using `aws sts` `assume-role` command

```bash
aws sts assume-role --role-arn "arn:aws:iam::[Account Id]:role/[Role Name]" --role-session-name [Session Name]
```

Depending on your workflow, ensure that the `AccessKeyId`, `SecretAccessKey`, and `SessionToken` output from that command are stored where they need to be securely. Also, ensure that the region is set to the desired target. A simple approach is to create a new section in the credentials file and mark that as the default with the required values.

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

> ⚠️ It's important to note that assuming a role provides a short-lived token. If you suddenly lose access, check that the token has not expired, in which case you will need to assume the role again.

Usage scenarios
- Cross-Account Access: Assume a role in another AWS account to access resources securely.
- Temporary Permissions: Provide temporary elevated permissions to users or services without sharing long-term access keys.

# Conclusion

Assuming an AWS IAM role via the CLI is a powerful way to enhance the security of your AWS resources. By following these steps and best practices, you can efficiently manage your AWS access and permissions.

For more detailed information and advanced use cases, refer to the official AWS IAM documentation.
