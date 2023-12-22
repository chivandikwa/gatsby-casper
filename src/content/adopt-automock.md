---
layout: post
title: Adopt AutoMock with Autofac and Moq
image: img/unsplash/sander-sammy-q7ZlbWbDnYo-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-27T00:00:00.000Z
tags: [.net unit tests, mocking frameworks, efficient software testing]
draft: false
excerpt: Learn how AutoMock simplifies mocking of service dependencies, reduces test maintenance, and enhances test suite robustness
---

Photo by <a href="https://unsplash.com/@sammywilliams?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sander Sammy</a> on <a href="https://unsplash.com/photos/q7ZlbWbDnYo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Adopt AutoMock in dotnet tests for Autofac and Moq

## Context

While the effort of manually mocking services in .NET tests can be high, understanding the underlying mechanism of AutoMock can greatly reduce this complexity. AutoMock, when integrated with Autofac and Moq, not only simplifies the process but also provides a more intuitive approach to creating mocks. Here's a deeper exploration of how AutoMock works

Mocking service dependencies manually in tests creates fragile tests that will need updating each time those dependencies change. Ideally, tests should change when the behaviour of interest changes.

## Problem scenario

```csharp

var sut = new SomeService(
        Mock.Of<IDependency1>(),
        Mock.Of<IDependency2>(),
        Mock.Of<IDependency3>(),
        Mock.Of<IDependency4>(),
        dataContext,
    );

```

In this hypothetical case, the only mock we care about is the data context and so the rest can be auto-mocked.

## Recommendation

Adopt Autofac's Moq helper [automock](https://docs.autofac.org/en/latest/integration/moq.html) as a way to create service instance SUTs (System Under Test). Unlike Autofixture this will not mock the SUT as well but will only locate the ctor and auto mock dependencies, maintaining trust in the SUT.

### Application scenario

```csharp

var autoMock = AutoMock.GetLoose(c => c.RegisterInstance(dataContext));

var sut = autoMock.Create<SomeService>();

```

Now if `SomeService` were to have an additional dependency injected via the ctor which does not affect the behaviour we are testing, there is no need to update the test(s) as this will just get auto-mocked, ideally what we would have done manually anyway.

### Additional cases

```csharp

var autoMock = AutoMock.GetLoose(c =>

{

    //If you need a real instance of a dependency, auto mock will transitively mock the concrete implementation's dependencies as well

    c.RegisterType<Dependency1>().As<IDependency1>();

    c.RegisterInstance(dataContext);

});


//Setup and verifications can be done on the mocks using Moq's API as

autoMock.Mock<IDependency1>().Setup(...);

autoMock.Mock<IDependency1>().Verify(...);

```

A great thing about Auto mock is that it exposes the Moq API, meaning everything else is working with Moq.

## Benefits

- Over time the dependency list can grow and it is quite cumbersome to have to modify tests to add new mocks

- Quite often most of the mocks do not require setup so you do not need to explicitly create the mock, it can be auto-created

- The code can be made more succinct and easier to read

> ℹ Often when a service is updated to add a new dependency, this indicates new behaviour and likely means you would add new tests, not modify existing ones. With this approach, you do not have to update the tests.
Is Onboarded To Portal
