---
layout: post
title: General Software Development Standards and Practices
image: img/unsplash/call-me-fred-fJSRg-r7LuI-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-02-19T00:00:00.000Z
tags: [software, standards, practices]
draft: false
excerpt: General Software Development Standards and Practices
---

Photo by <a href="https://unsplash.com/@callmefred?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Call Me Fred</a> on <a href="https://unsplash.com/photos/fJSRg-r7LuI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# General Software Development Standards and Practices

# General Standards and Practices

## Documentation Principles

✅ **DO** Recognize that certain tasks such as setting up a new environment, establishing infrastructure, or registering services are often repeated. These recurring tasks can benefit immensely from thorough documentation. Advocate for a `Run Book` approach, where the documentation is designed to guide the reader—whether it's someone else or your future self—through each step of the process. This ensures that anyone following the guide can easily replicate the process without unnecessary trial and error.

✅ **DO** create a reference of all decisions of architectural relevance by employing Architecture Decision Records (ADRs). An architecture decision record is a short text file in a format similar to an Alexandrian pattern. (Though the decisions themselves are not necessarily patterns, they share the characteristic balancing of forces.) Each record describes a set of forces and a single decision in response to those forces. Note that the decision is the central piece here, so specific forces may appear in multiple ADRs. See [more](https://dev.azure.com/bscglobal/Cash%20Flow%20Capital/_wiki/wikis/Cash%20Flow%20Capital/1375/Architecture-Decision-Records)

✅ **DO** acknowledge that well-documented standards and practices are essential for any team that wants to be efficient, effective, and reliable. They provide a shared understanding of how things should be done, which helps to avoid confusion and errors. They also make it easier to onboard new team members and improve/maintain quality. It is important to do this for all operations, for exampled coding standards, infrastructure management standards, DevOps standards, expectations on team ceremonies and roles etc. Ensure that the team has the relevant processes and gates for reviewing things such as Pull Request, second pair of eyes on infrastructure changes etc., while avoiding red tape and rigidity. Save time by also identifying standards and policies that can be automated with things like linting.

> These approaches align well with the principle of prioritizing **working software over extensive documentation**. It doesn't require an inordinate amount of time to document these processes. However, the quality of the documentation should not be compromised. High-quality, concise documentation can save time and effort in the long run, making it a worthwhile investment.

## Programming Principles

✅ **DO** use consistent coding styles. Consistency in coding styles can help make your code more readable and easier to maintain, so it's important to establish clear coding standards and guidelines that all team members can follow.

✅ **DO** use version control. Version control tools like Git can help you manage and track changes to your codebase over time, making it easier to collaborate with other developers and keep your codebase organized.

✅ **DO** use continuous integration and delivery. Continuous integration and delivery (CI/CD) tools can help you automate your build, testing, and deployment processes, making it easier to deliver high-quality code more quickly and efficiently.

✅ **DO** write automated tests.: Writing automated tests can help you ensure that your code is functioning correctly and that changes you make to your code don't introduce new bugs or errors.

✅ **DO** follow best practices for performance. Optimizing performance can be a key consideration in many software development projects, so it's important to be mindful of best practices for performance, such as reducing the number of database queries or minimizing the use of expensive operations.

✅ **DO** prioritize security. Security should be a top priority in all of your software development efforts, and you should always be mindful of potential security risks and vulnerabilities in your code.

✅ **DO** embrace dependency injection. Dependency injection is a technique for managing dependencies in your code and can help you create code that is more modular, flexible, and testable.

✅ **DO** practice defensive programming. Defensive programming is a mindset that emphasizes anticipating and guarding against potential errors, bugs, and other issues in your code. This can help you create more reliable and resilient code.

✅ **DO** use consistent naming conventions. Consistent naming conventions can help make your code more readable and easier to understand, so it's important to establish clear naming conventions and stick to them throughout your codebase.

✅ **DO** apply a library developers mindset on any task that you pick up.

This means thinking about the code you're writing as a potential reusable library that can be used by others in the future, rather than just a one-off solution to a particular problem.

To apply this principle effectively, you should consider whether the code you're writing has good potential for reuse. If so, it may be worth extracting it into a library, either as part of an existing library like NetUtilities, or as a new library in its own repository, like the HubSpot Client implementation mentioned in the principle.

To determine whether code has good reuse potential, you should consider a few key factors. One important factor is the level of abstraction in the code - code that is highly abstracted and modular is generally easier to reuse in different contexts. You should also consider the specific problem domain that the code is addressing - code that solves a common problem or performs a common task may be more likely to be reused than code that addresses a very specific, niche problem.

When deciding whether to extract code into a library, it's also important to consider the maintenance burden of the library. If you extract code into a library, you're committing to maintaining that library over time, fixing bugs, updating it to work with new versions of dependencies, and so on. This can be a significant investment, so you should be sure that the potential benefits of having a reusable library outweigh the costs of maintaining it.

By applying a library developer's mindset to all programming tasks, you can create code that is more modular, more reusable, and more maintainable in the long term. This can help to reduce duplication of effort, improve code quality, and accelerate development speed overall.

✅ **DO** Leave the campground cleaner than you found it. This means that you should always strive to improve the codebase and associated assets (such as documentation and tests) when working on a project, rather than simply adding new features or functionality.

To apply this rule effectively, there are several actions you can take:

  - Observe documentation that is out of date, then update it. This helps to ensure that others who use your codebase can understand it and use it effectively. It also helps to maintain the quality of the project overall, and can reduce confusion and errors in the future.

  - Observe code that violates your team's standards and practices or principles, then address it. Consistency is key in software development, and adhering to established coding standards and principles can make the codebase easier to read and maintain over time.

  - Observe missing test coverage in critical areas, then add it. Tests are a crucial component of software development and can help to ensure that the codebase is robust and reliable. Adding missing test coverage in critical areas can help to prevent regressions and other issues from creeping into the codebase.

  - Observe technical debt, then address it. Technical debt is a term used to describe code that has been written quickly or without proper consideration, and which may require additional work or refactoring in the future. Addressing technical debt can help to improve the quality of the codebase overall, and can make it easier to maintain and extend in the future.

Of course, there may be situations where applying the boy scout rule would be a big distraction, requiring a lot of attention and time. In such cases, it is justifiable to move on, however, it's important to track these issues in your backlog or issue-tracking system, so that they can be addressed at a later time.

By following the boy scout rule, you can help to create a codebase that is clean, maintainable, and extensible, and that can be a valuable asset for your team and your organization.

✅ **DO** apply care to not introduce new technical debt. It's important to apply care to not introduce new technical debt into your codebase. It can be tempting to take shortcuts or make compromises under pressure, but these decisions can lead to long-term problems and make it difficult to maintain or evolve the codebase over time.

One way to avoid introducing technical debt is to seek a second opinion, particularly from someone who is disconnected or immune to the current pressure. This can help to provide a fresh perspective and ensure that decisions are made with the long-term health of the codebase in mind.

To help identify potential sources of technical debt, consider the following factors that can impact the quality and maintainability of your codebase:

  - Performance: If code is poorly optimized or inefficient, it can lead to slow or unreliable performance, which can impact the user experience and scalability of the application.

  - Evolvability: Code that is inflexible or tightly coupled can be difficult to evolve, leading to problems when new features or changes are required.

  - Observability: If code is difficult to observe or monitor, it can be challenging to diagnose and fix issues when they occur.

  - Security: Code that is not properly secured or has vulnerabilities can put the application and its users at risk.

  - Maintainability: Code that is difficult to understand or maintain can be time-consuming and expensive to work with, making it more difficult to fix issues or add new features.

  - Scalability: Code that is not designed to scale can limit the ability of the application to handle increasing amounts of traffic or data.

  - Cost: Code that is inefficient or wasteful can be expensive to operate and maintain over time.

  - Robustness: Code that is not properly tested or validated can be prone to errors or failures, which can impact the reliability and usability of the application.

By paying attention to these factors and avoiding shortcuts or compromises, you can help to ensure that your codebase is maintainable, scalable, and resilient and that it can serve as a valuable asset for your organization over the long term

> The decision to go into debt alters the course condition of your life. You no longer own it. You are owned - Dave Ramsey

✅ **DO** embrace `within reason` functional concepts for code that is easier to reason about, less prone to bugs, and easier to consume and test.

  - Immutability: Immutability is the idea that once a variable is assigned a value, that value cannot be changed. This can make code easier to reason about, as you don't have to worry about unexpected changes to variables.

  - Referential transparency/Purity: Referential transparency is the idea that a function's output depends only on its input, and not on any external state. This can make functions easier to test, as you don't have to worry about the external state affecting the results of your tests.

  - First-class functions: First-class functions are functions that can be treated like any other value in the language. This means you can pass functions as arguments to other functions, return functions from functions, and store functions in variables.

  - H.O.F (Higher Order Functions): Higher-order functions are functions that take other functions as arguments, or return functions as output. This allows you to build more complex and flexible functionality by composing simpler functions.

  - Disciplined state: Disciplined state means that state changes are done in a controlled and predictable manner. This can help to reduce bugs related to state changes and make code more predictable and easier to reason about.

  - Closures: Closures are functions that capture variables from their surrounding environment. This can be used to create functions with "memory" or to build more complex functionality by composing simpler functions.

  - Lazy evaluation: Lazy evaluation is the idea that values are only computed when they are needed. This can help to reduce unnecessary computation and make code more efficient.

By embracing functional concepts in your code, you can create code that is easier to understand, test, and maintain, and that is less prone to bugs and unexpected behaviour. However, it's important to use these concepts within reason and to balance them with other design principles and patterns, as appropriate for your specific use case

✅ **DO** be mindful of code style as a blocker. Does the style and structure of your code make it harder to read and maintain?

The style and structure of your code can have a significant impact on its readability, maintainability, and overall quality.

When code is poorly structured or styled, it can be difficult for others to understand and maintain. This can lead to slower development cycles, increased bugs, and higher technical debt. In contrast, well-structured and well-styled code is easier to read and maintain, making it faster and less costly to develop and maintain.

To avoid code style as a potential blocker, it's important to adhere to best practices and style guides for your programming language and framework. This means writing code that is consistent in terms of naming conventions, indentation, comments, and other formatting elements.

In addition, you should take care to structure your code in a way that is easy to read and maintain. This might mean breaking down complex functions into smaller, more focused functions, or organizing code into well-defined modules or classes.

By being mindful of code style and structure, you can help to ensure that your code is easy to read and maintain, which can accelerate your development process and improve the quality of your code overall.

✅ **DO** enforce simplicity.

The virtue of simplicity cannot be overstated - simpler interfaces are easier to use for all kinds of users, and require less code to create, providing an obvious performance advantage.

Design decisions can be difficult, and often require user research to be done well. However, keeping things simple is always the right thing to do. This means not just simplifying or making things seem simple, but truly striving for simplicity in all aspects of your code and interfaces.

When creating code and interfaces, aim to do a little and do it well, for as many people as you can. This means creating interfaces that are straightforward to understand, with clear and intuitive functionality. It also means creating code that is focused and purposeful, with minimal complexity or unnecessary features.

By enforcing simplicity in your code and interfaces, you can create software that is not only easier to use and understand, but also faster and more performant. You can also reduce the likelihood of bugs and technical debt, making your code easier to maintain and extend over time.

So remember, when it comes to software development, simpler is almost always better. Strive for simplicity in everything you create, and focus on doing a little and doing it well, for as many people as you can.

>   Bugs hide behind less important but easily noticeable things or complexity

✅ **DO** avoid overly WET code, otherwise known as `write everything twice`, `write every time`, `we enjoy typing`, or `waste everyone's time`. This means that you should strive to avoid duplicating code unnecessarily, as it can lead to more work and maintenance in the long run.

However, it's also important to recognize that there are times when duplication may be necessary or even preferable to the wrong abstractions. This means that in some cases, it may be better to have duplicated code that is easier to understand and maintain, rather than trying to create complex abstractions that are more difficult to work with.

Duplication can also be a useful tool for further understanding how to make the right abstraction. By seeing where and how code is being duplicated, you can identify common patterns and determine where an abstraction may be appropriate.

In general, the key is to find a balance between avoiding unnecessary duplication and creating abstractions that are too complex or difficult to work with. This means being mindful of where duplication is occurring and why, and seeking to create abstractions that are simple, intuitive, and easy to understand and maintain.

By avoiding overly WET code and finding the right balance between duplication and abstraction, you can create code that is both efficient and maintainable, and that can be a valuable asset for your organization over the long term.

🛑 **DO NOT** repeat yourself. This principle states that every piece of knowledge or information within a system should have a single, unambiguous, and authoritative representation.

When information is duplicated or repeated across a system, it can lead to inconsistencies, errors, and maintenance headaches. It can also make it difficult to update or modify the system, as changes may need to be made in multiple places.

To avoid repetition and adhere to the DRY principle, it's important to identify common patterns and extract them into reusable functions, modules, or components. This can help to reduce duplication and make code easier to understand and maintain.

By following the DRY principle, you can create systems that are more reliable, easier to maintain, and less prone to errors and other issues. It can also make it easier to modify and extend the system over time, as changes can be made in a single place and propagated throughout the system.

>   Apply care to strike the right balance with DRY, premature abstractions can be worse especially if attained by speculating future usages.

🛑 **DO AVOID**  leaky abstractions. A leaky abstraction exposes details or complexities that should be hidden from the consumer, making the abstraction more difficult to use and maintain.

A classic example of a leaky abstraction is an implementation of an HttpClient wrapper that leaks HTTP details out to the consumer. In this case, the HttpClient wrapper should abstract away the details of the HTTP protocol, making it easier to use and maintain. However, if the wrapper leaks HTTP details to the consumer, it becomes less useful and more difficult to work with.

To avoid leaky abstractions, it's important to carefully consider the scope and purpose of each abstraction you create. The abstraction should be designed to hide details and complexities, not to expose them to the consumer.

## GIT

✅ **DO** add at least two branch suffixes as part of new branch names, an indication of your name and change type to have the name syntax `[name]\[change-type]\[devops-code]`, i.e `jane\bug\10111`. By using this naming convention, you can create a branching hierarchy that is easy to navigate and manage. The name makes it easy for one to target specific branches, for example, to clean up their branches. The change types make it easy to navigate branches by the type of change, such as a new feature implementation, bug fix, architecture changes, or documentation-only changes.

Here are the tags that you can use for the change type:

| Tag          | Description                                            |
| ------------ | ------------------------------------------------------ |
| feature      | New feature implementation                             |
| bug          | Bug fix                                                |
| architecture | Architecture changes                                   |
| doc          | Documentation-only changes                             |
| pending      | Work-in-progress branch that may likely be long-living |

✅ **DO** clean up remote branches after they are merged. An easy way to guarantee this is to configure a Pull Request to delete the branch automatically on merge.

By cleaning up remote branches in this way, you can keep your repository organized and easy to navigate, and reduce clutter and confusion. It can also help to improve the overall quality and efficiency of your development process, as it reduces the need for manual cleanup and maintenance tasks.

✅ **DO** use the imperative mood in the subject line

Using the imperative mood in the subject line helps to ensure that your message is clear, concise, and action-oriented. It also makes it easier for others to understand what changes are being made and why.

For example, bad commit messages might include vague or uninformative subject lines, such as `tweaks to package-info files` or `polishing`. These messages don't provide much information about what changes were made or why making it more difficult for others to understand the changes being made.

In contrast, good commit messages use the imperative mood in the subject line to clearly describe what changes were made and why. For example, `fix failing CompositePropertySourceTests`, `rework @PropertySource early parsing logic`, or `add tests for ImportSelector meta-data`. These messages provide clear and concise information about the changes being made, making it easier for others to understand the context and purpose of the changes.

> The idea is that instead of a commit message saying what has been done it should be read as this is what will happen when the commit is applied.

## .NET

✅ **DO** target the highest .net support surface area you can reasonably achieve and aim for a health test coverage when creating libraries.

Targeting the highest .NET support surface area means that you should aim to make your library compatible with the widest possible range of .NET applications and platforms. This will make your library more useful to a larger number of developers, and increase its potential for adoption.

Achieving a high level of .NET support surface area can be challenging, as it may require incorporating features and APIs from multiple versions of .NET. However, it's important to strike a balance between achieving high support surface area and maintaining compatibility with the specific versions of .NET that are relevant to your users.

In addition to targeting a high support surface area, it's also important to aim for healthy test coverage. This means writing comprehensive unit tests, integration tests, and other automated tests to ensure that your library functions correctly and reliably in a variety of scenarios.

A healthy test coverage helps to ensure that your library is both correct and robust, and can help to prevent regressions and other issues from creeping in as you add new features or make changes. It also helps to build confidence in your library among users, who can see that it has been thoroughly tested and validated.

> ℹ️ [ChatGPT](https://openai.com/blog/chatgpt/) proved to be a very useful resource in proofreading the initial draft and researching more content.
