---
layout: post
title: Secure AWS instance metadata
image: img/unsplash/regularguy-eth--o90yRQoXAM-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [aws, security, EC2]
draft: false
excerpt: avoiding cloud metadata attacks
---

Photo by <a href="https://unsplash.com/@moneyphotos?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">regularguy.eth</a> on <a href="https://unsplash.com/photos/-o90yRQoXAM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Secure AWS EC2 instance metadata

Instance metadata is data about your instance that you can use to configure or manage the running instance. Instance metadata is divided into [categories](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-categories.html), for example, host name, events, and security groups. As a practice, the exposing of data about an instance via an internal endpoint this is not limited to just AWS. A Cloud Metadata Attack attempts to abuse a misconfigured web server in order to access the instance metadata maintained by cloud service providers such as AWS, GCP, and Azure. All of these providers provide metadata via an internal unrouteable IP address `169.254.169.254` - this can be exposed by incorrectly configured web servers and accessed by using this IP address in the Host header field. This makes instance metadata security-sensitive given that if attackers get access to this they have specifics about your instances such as OS, security groups etc. that could allow for more targeted attacks with a higher success rate.

## Solution

-   Do not trust user data in web server configuration. For example in [NGINX configs the $host variable which is set from the 'Host' header can be controlled by an attacker](https://www.nginx.com/blog/trust-no-one-perils-of-trusting-user-input/)
-   Disable instance metadata. This is not always an option, for example, in AWS there are services such as Systems Manager that rely on this metadata to correctly identify instances.
-   Secure the instance metadata. That is what we shall be focusing on.

## Secure instance metadata

This change cannot be done in the AWS console and requires the use of the AWS CLI. Impersonate a role that has the rights to make this change if required or attain user login from the CLI.

Run a command to update the instance metadata as required. For example to enable the HTTP endpoint on a given instance:

```bash
aws ec2 modify-instance-metadata-options --instance-id [INSTANCE_ID] --http-endpoint enabled
```

> ⚠️ It is desirable to keep the instance metadata enabled as this is required by various AWS services including Systems Manager which we require for automated scanning and patching of EC2 instances. This means the `http-endpoint` flag should always be set to `enabled`. To enforce security however, we set the `http-tokens` option to `required` which enforces sending a signed token header with any instance metadata retrieval request and hence requires an IAM role which is harder to be exploited. Additionally the `http-put-response-hop-limit` is also set to `1`.

```bash
aws ec2 modify-instance-metadata-options --instance-id [INSTANCE_ID] --http-endpoint enabled --http-tokens required --http-put-response-hop-limit 1
```

To get the status of a given instance run the following command

```bash
aws ec2 describe-instances --instance-id [Instance ID]

# this return a lot of data so preferable pipe to file to view easily

aws ec2 describe-instances --instance-id [Instance ID] > result.txt
```
