---
layout: post
title: AWS Best Practices
image: img/unsplash/jon-tyson-1Mq4QQaVhis-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2022-06-30T10:00:00.000Z
tags: [AWS Best Practices Guide, Cloud Infrastructure Optimization, Security and Compliance in AWS]
draft: false
excerpt: Discover the essential AWS best practices to navigate the cloud right.
---

Photo by <a href="https://unsplash.com/@jontyson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jon Tyson</a> on <a href="https://unsplash.com/backgrounds/cool/best?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# AWS Best Practices

## General

✅ **DO** come up with a complete and documented disaster recovery process for all the services and workloads you utilize in AWS. Regularly review and run through the process to ensure that it stays up to date and that the team has the skills to execute it. Have a clear definition of the time to recovery and point of recovery for your workloads.

## IAM

✅ **DO** use access keys with restricted access to only what is required for a development setup and ensure that these are not linked to a user with AWS console access.

> ⚠️ The access keys used by developers are the ones at most risk as multiple people will have these on their machines, therefore, increasing the surface area of compromise.

✅ **DO** isolate resources by environment so that generated keys access only have access to the environment it is used in. For example, development keys should not be able to access production stacks.

⛔ **DO NOT** set up any AWS accounts with console access that do not have MFA enabled.

⛔ **DO NOT** login with a root account for day-to-day operations. IAM users/roles with specific permissions to the operation should be used instead. Root accounts should only be used for operations that cannot be done with any other account.

⛔ **DO NOT** login with the root user account without authorization. Only one team member should have the authorization to make use of the root account.

> ⚠️ While this is best practice the root user credentials should be shared with at least one other person should they be required in the absence of the primary.

## ECR

✅ **DO** ensure that repositories are not publicly exposed.

> ℹ️ There are exceptions. For example, a requirement to set up base build images for reuse would add unnecessary complexity to authenticate on each build. Given the is no company IP in creating a public build image that would be understandable.

✅ **DO** enable scan on push at repository level to automatically scan for vulnerabilities on any images pushed to a repository.

✅ **DO** consider a life cycle policy for cost optimization.

> ⚠️ This may not be ideal. The benefit of being able to get the artifacts by release number even months if not years from now may outweigh any cost implications of storing images so make this decision very carefully.

> ⚠️ Unfortunately the current implementation of the policies do not work well with semantic versioning making it difficult to automate a cleanup. There is an [open request](https://github.com/aws/containers-roadmap/issues/1213) to enable regular expression to facilitate this.

✅ **DO** use semantic versioning for all images pushed to ECR and consistent naming.

✅ **DO** enable cross-region replication of ECR images.

✅ **DO** create and push only minimal images by removing all extraneous binaries or dependencies and do not use unfamiliar base images.

✅ **DO** create and push only minimal images by using multi-stage builds.

✅ **DO** regularly update the packages in container images. Consider scanning tools like [Snyk](https://snyk.io/) to stay on top of this.

✅ **DO** scan and lint all Dockerfiles. Consider [hadolint](https://hadolint.github.io/hadolint/).

✅ **DO** ensure that all repositories have the immutability tag enabled to force tag updates on each push and restrict overwriting prior images.

> ⚠️ For reproducibility images must be immutable and for security purposes, this thwarts the possibility for attackers to push malicious versions by taking advantage of a tag that is already being pulled.

## EC2

✅ **DO** ensure that instances are launched off of the list of team-approved AMIs.

✅ **DO** ensure that instances that have a burstable instance type have the credit specification set to enable unlimited mode.

> ℹ️ If the average CPU utilization over 24 hours exceeds the baseline, you incur charges for surplus credits. Which is likely okay and desired for critical workloads.

✅ **DO** ensure that instances have termination protection enabled, which ensures that someone does not accidentally terminate an instance, an action that cannot be undone.

> ℹ️ There are exceptions to this rule. Instances that are created from spot requests cannot have this setting enabled and fully managed instances such as those created by EKS for a k8s cluster should not have this setting enabled.

✅ **DO CONSIDER** spot instances for non-critical workloads such as running builds, pull requests, etc.

✅ **DO** make use of the bastion/jump server pattern for access to servers that do hold production workloads or client data.

✅ **DO** make sure a bastion/jump server allows RDP/SSH access to traffic only from specific whitelisted IP addresses.

✅ **DO** provide descriptive names to instances and tag them accordingly to make it easy to tell what each instance is for.

✅ **DO** make use of elastic IPs for any instances whose public/private IP address is required.

✅ **DO** monitor and respond to events of your instances such as CPU usage, disk space usage, etc.

✅ **DO** regularly review and test the EC2 disaster recovery process for instances and volumes.

✅ **DO** utilize and configure security groups wisely as the firewall to instances, providing only required access. Implement the least permissive rules for your security groups.

✅ **DO** make use of VPCs to logically isolate instances from the rest of the AWS cloud.

✅ **DO** create any key pairs using one of the two supported formats consistently, otherwise, keys can be cross-converted between PEM and PPK using tools like putty-gen.

✅ **DO** make use of the most specific AMI for a workload. AMIs with the least dependencies and features that come packaged/enabled are better as these would have a smaller attack surface area therefore always choose one that provides only what is required.

> ℹ️ An example is the BottleRocket AMI over the AWS Linux 2 AMI for use in a Linux-based k8s cluster. BottleRocket is optimized for running docker and comes with very minimal for that.

✅ **DO** clean up unused instances by shutting them down or terminating them so as not to incur charges. `Terminated instances cannot be resurrected.`

✅ **DO** ensure that the account billing settings have the option to receive AWS Free Tier usage alerts always enabled.

> These AWS Free Tier usage alerts allow AWS to notify you when you're exceeding 85 per cent of your usage for the month. This of course can generate noise for non-expiring AWS free tier offerings.

> ⚠️ You must avoid browsing the internet on an instance by all means. If you must download something from the internet rather download it on your machine and copy it over. While the security group will act as a firewall for incoming traffic there is a caveat, if the incoming traffic is in response to a request it will come through, which is why one must avoid accessing the internet from any instances to avoid exposing the instance to attackers.

✅ **DO** regularly patch, update, and secure the operating system and applications on your instance.

✅ **DO** separate Amazon EBS volumes for the Operating System vs data and further group data on multiple volumes if possible i.e. database backups vs database logs.

⛔ **DO NOT** have any instances without encrypted EBS volumes or snapshots.

⛔ **DO NOT** create any snapshots or AMIs that are in a public catalogue.

⛔ **DO NOT** create security groups that open any traffic to the internet, including for developer access such as SSH and RDP. Any required access for servers that do not hold production workloads or client data should be via the session manager when possible.

⛔ **DO NOT** mishandle or lose access to access keys used to create instances. These should be stored securely as they are required to access the instances.

⛔ **DO NOT** disable EC2 instance metadata as this is required by various AWS services including Systems Manager for automated scanning and patching of EC2 instances. This means the `http-endpoint` flag should always be set to `enabled`. To enforce security, however, set the `http-tokens` option to `required` which enforces sending a signed token header with any instance metadata retrieval request and hence requires an IAM role which is harder to exploit. Additionally the `http-put-response-hop-limit` is also set to `1`.

⛔ **DO NOT** make use of Internet Explorer or Chrome on EC2 instances as they are not very secure. Firefox should be the browser used on all instances.

✅ **DO** create a process for security hardening of an instance such as uninstalling unnecessary programs.

✅ **DO** make sure scaled/duplicated instances are not in the same Availability Zones as this would not offer much resilience when an entire zone is down.

✅ **DO** make use of the session manager over RDP or SSH access to instances. This avoids using and exposing an SSH key or having to open ports or a bastion host and makes use of AWS KMS for secure sessions.

# Naming

✅ **DO** employ complete names but with standard acronyms and in all lower cases snake case:

| Entity | Prefix |

| -------------- | ----------------------- |

| Security Group | security-group-[region] |

| EC2 | ec2-instance-[region] |

> Only include the region (i.e eu-west-1) for resources that can be created in multiple regions
