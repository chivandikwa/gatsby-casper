---
layout: post
title: Reason for Outage tracking
image: img/unsplash/ehmitrich-y4aUBTWgzgQ-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [production, tracking, incidents]
draft: false
excerpt: history of production issues
---

Photo by <a href="https://unsplash.com/@ehmitrich?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Антон Дмитриев</a> on <a href="https://unsplash.com/photos/y4aUBTWgzgQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Reason For Outage (RFO) tracking

An RFO (Reason for Outage) is a body of knowledge for tracking known outages to learn from and to use as a reference when going back in time. This creates an actionable history of things that go wrong in production environments and can help in decision-making and resolution of potential issues.

Outages include

- Resources that become unavailable. This could be due to many issues like network, infrastructure, faulty applications
- Failed deployments
- Manual application restarts necessitated by something going wrong

Outages do not include

- Maintenance application/infrastructure restarts that are expected
- Application downtimes due to deployments. This is not ideal however and can be avoided by adopting a different deployment strategy.

```markdown
# Reason for Outage

# Outage

ISO Date

Description

Resolution
```

Example:

```markdown
# Reason for Outage

# Surge in application Kubernetes pods restart

2022-08-27

There was an increase in the number of Kubernetes pod restarts starting at ... and flagged by DataDog at ... . See the screenshot below.

The surge in pod restarts was due to a faulty configuration of ... that led to an increase in memory usage and eventually some Out of Memory Exceptions that were resulting in pod restarts. See details on the ticket ... about the misconfiguration and resolution.

DataDog monitors were also updated by applying ... to ensure that when something like this happens we will be notified within a shorter window.
```
