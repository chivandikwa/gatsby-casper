---
layout: post
title: Technical analysis checklist
image: img/unsplash/glenn-carstens-peters-RLw-UC03Gwc-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2024-12-28T00:00:00.000Z
tags: [technical analysis, checklist, agile]
draft: false
excerpt: A checklist for technical analysis
---

Photo by <a href="https://unsplash.com/@glenncarstenspeters?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Glenn Carstens-Peters</a> on <a href="https://unsplash.com/photos/person-writing-bucket-list-on-book-RLw-UC03Gwc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

# Technical analysis checklist

This technical checklist should serve as a reference for things to consider before starting any technical work. Many checks need to be in place that range from understanding the ticket and establishing that it is ready for development, to determining blockers/dependencies, options, potential challenges and more to ensure that the technical implementation will be as smooth as possible. This can also ensure that other necessary aspects, such as code quality, security, deployment, and maintenance, are considered.

> ℹ️ This checklist is not meant as a 'gate' or 'red tape`. Such a checklist acts as a roadmap, guiding teams through complex processes in a structured yet flexible manner. They ensure thoroughness and adherence to best practices, while also fostering efficiency and clarity in project execution. This is best used as a once-off read as a team to establish how the team gets ready for technical work and as a reference only thereafter as necessary. It is certainly not a checklist in the sense that for each ticket you need to open this and tick things off.

## Checklist

- [ ] Is the ticket well understood?
  > Read and comprehend the user story or task description thoroughly. Clarify any ambiguities or uncertainties with the relevant stakeholders

> Equally important is understanding the 'why' behind the specific change and how it will benefit the client. This will require acquiring a comprehensive business context for both the tickets and the overarching goals

- [ ] Is the implementation goal clear?
  > Understand what problem or need the software is trying to address
- [ ] Does the work item need to be broken down?
  > If the user story or task seems complex, break it down into smaller sub-tasks or sub-goals to facilitate better understanding and implementation
- [ ] Are there any dependencies or blockers?
  > Identify any dependencies or blockers that need to be addressed before the work can be picked up.
  >
  > 1. **Avoid too many dependencies in a Sprint and highlight these.**
  > 2. **Clearly mark items that are blocked and identify who is responsible for unblocking the team.**
- [ ] Is there a clear Sprint Goal and are the Priorities communicated?
  > Leverage Azure DevOps functionality to set out a clear Sprint Goal and ensure that priorities are clear
- [ ] Is this technically feasible?
  > Assess whether the proposed solution is technically feasible within the given constraints (e.g., time, resources, technology stack). Consider potential limitations or technical challenges.
- [ ] Will this impact existing functionality or other planned work?
  > Evaluate the impact of the user story or task on the existing system or codebase. Identify potential areas that may be affected and consider how changes will be implemented.
- [ ] What other criteria need to be met to complete this work item?
  > Identify things like test coverage, monitoring and observability, performance criteria, security requirements etc.
- [ ] Is there a clear implementation approach?
  > Define an approach or strategy for implementing the user story or task. Consider factors like architecture, code structure, and best practices. Discuss and validate your approach with other technical colleagues
- [ ] Has the effort of implementation been estimated?
  > Estimate the effort required to complete the user story or task. Break it down into smaller tasks if necessary. Consider the complexity, skill level, and availability of team members.
- [ ] Has any required documentation been identified?
  > Document any assumptions made during the analysis process, as well as decisions taken regarding the implementation approach, design choices, or technology selection.

## Technical considerations

The following technical considerations should be made as clear as possible as part of the technical analysis

- [ ] Required test coverage
  > Specify the types of tests that should be implemented, such as unit tests, integration tests, or end-to-end tests.
  > Identify any special testing requirements, such as performance testing or security testing.
- [ ] Error handling and logging
- [ ] Monitoring and observability
  > Determine the key metrics, logs, or events that need to be monitored to ensure the system's health and performance.
- [ ] Frameworks and tools that can/should be used
- [ ] Coding practices/standards that should be adhered to
- [ ] Any required configuration
- [ ] Any additional steps for the feature to be available
- [ ] Artifacts that are expected as part of the implementation (documentation, scripts, Shared Lib contributions etc)
- [ ] Special performance considerations
  > Identify performance requirements, such as response time, throughput, or scalability. Determine any performance testing tools or frameworks that should be used, such as JMeter. Specify any performance optimization techniques or best practices to be followed.
