---
layout: post
title: Testing Best Practices
image: img/clean/used/2c4aedfc-35df-4f4b-8256-c7ba5c422d79.jpg
author: [Thulani S. Chivandikwa]
date: 2023-02-19T00:00:00.000Z
tags: [testing, xunit, jest, fluentassertions]
draft: false
excerpt: Testing Best Practices
---

# Testing Best Practices

Unit tests are an essential part of software development that help ensure that code works as expected, both initially and in the future. To maximize the value of unit tests, it is important to follow best practices.

This document provides a comprehensive set of testing best practices for developers to follow to create high-quality and low-maintenance tests that aid in building robust and maintainable codebases.


## General

✅ **DO** aim for your tests to meet the following positive heuristics
- Run fast

  Tests should run quickly so that developers can run them frequently and not be slowed down by the testing process. Slow tests can be a barrier to TDD and other agile practices and can slow down feedback cycles
- Not break often or be flaky

  Tests should be reliable and not break often, especially due to reasons unrelated to the code being tested, such as timing issues, race conditions, or other environmental factors. This can lead to decreased trust in the testing process and can be frustrating for developers.
- Not be high maintenance

  Tests should be easy to maintain, update and refactor as code changes, so they don't become a burden to the development process. This is especially important in large and complex codebases where maintaining the tests themselves can become a time-consuming and error-prone task.
- Easy to read and understand

  Tests should be easy to read and understand for developers who did not write the code being tested. This helps new developers on a team quickly understand what is being tested and how it's being tested.
- Have the same style and diligence as the code being tested

  Tests should follow the same coding standards and best practices as the code being tested so that developers can maintain and update the tests as easily as they can the code.
- Be deterministic

  Tests should be deterministic, meaning that they always produce the same output given the same input. This helps ensure that the tests are reliable and can be trusted.
- Survive major refactorings

  Tests should survive major refactorings, meaning that they continue to work as expected even when large parts of the codebase are changed. This is important to ensure that developers can continue to rely on the tests even as the codebase evolves.
- High coverage of important functionality

  Tests should have high coverage of important functionality, helping to catch regressions and ensuring that changes don't cause unintended side effects.
- A good balance between unit tests, integration tests, and end-to-end tests, each serving its purpose in validating different aspects of the system.

🛑 **DO AVOID** the following negative heuristics of tests:
- ⚒️ Heavy work

  A heavy reliance on manual testing, with developers spending a lot of time manually testing the system and debugging issues.
- 🧪 Logic in tests

  Tests should focus on the behaviour of the code being tested rather than its implementation details. Including too much logic in tests makes them less readable, less maintainable, and more difficult to understand.
- 🪄 Magic values

  Tests should use clearly defined, meaningful values instead of arbitrary or hard-coded values. Magic values can lead to confusion and make it difficult to understand what the test is verifying.
- 😔 Not writing tests because `they are difficult` or something is `untestable`

  Not writing tests is a common problem among developers, especially when they are working on complex or legacy codebases. However, skipping tests because they are difficult or deemed untestable can lead to major issues down the line, such as regressions or bugs that go unnoticed.
- 🔫 Shotgun surgery

  This can lead to unhealthy practices like reading private methods with reflection to test functionality that should be public, which can lead to brittle and difficult-to-maintain tests.
- 🌝 Eager test

  Tests that are too eager expose a lot of irrelevant details about the system under test (SUT), which can distract the test reader from what the test is verifying. These details can change often and require frequent updates to the test code.
- 😬 Happy path

  Happy path testing only tests the paths where things go well, but often misses potential issues and edge cases. It's important to test both the happy path and other potential paths to ensure the system under test behaves as expected in all situations.
- 🦥 Slow Poke

  Tests that take too long to run can be a drain on productivity and can lead to frustration among developers. These types of tests can often be optimized by using techniques such as parallelization or avoiding unnecessary setup.
- 🦣 Giant

  Large tests are difficult to maintain and can cause problems if they fail unexpectedly. It's best to break tests down into smaller, more manageable units that are easier to understand and maintain.
- 🤡 Mockery

  Overuse of mocking can lead to tests that are difficult to read and understand, and can also make it more difficult to identify problems when they occur.
- 🔎 Inspector

  Tests that violate the black box approach make assumptions about the inner workings of the system under test, which can lead to brittle and difficult-to-maintain tests.
- 🪰 Generous leftover

  Tests that depend on run order or data that is shared between tests can be difficult to maintain and debug, especially when they fail unexpectedly.
- 🦸 Local hero

  Tests that only pass in specific environments are not reliable and can lead to false positives. Tests should be designed to run in any environment and not be dependent on specific configurations.
- 🐜 Nitpicker

  Tests that focus on irrelevant specifics that are likely to change frequently can be difficult to maintain and can lead to false positives.
- 📢 Loudmouth

  Tests that clutter the console with diagnostic messages can make it difficult to identify problems when they occur.
- 🤥 The liar

  Tests that skip the red-green-refactor process, use mocked SUTs, or are not specific enough can lead to false positives and make it more difficult to identify problems when they occur.
- 🆓 Free ride

  Assertions that piggyback on an existing test when they should be split out can lead to false positives and make it more difficult to identify problems when they occur.
- 🔮 Mystery guest

  Tests that use magic elsewhere or do not indicate the cause and effect between act, arrange, and assert can be difficult to understand and maintain.
- 🤫 Useless test
  Useless tests are those that do not provide any value to the project, and only exist to satisfy a code coverage metric. Such tests might pass or fail randomly, and require manual debugging to figure out what caused them to fail. This results in a waste of time and effort for the team. Always make sure that your tests are relevant and valuable to the project.
- 🪲 Flaky test

   Flaky tests fail under specific conditions like time of day, day of the week, or hardware configuration. These tests are usually caused by race conditions, timing issues, or random data. Flaky tests are frustrating for developers because they are hard to reproduce and debug. It is crucial to fix flaky tests as soon as possible and ensure that your tests run reliably in all environments.
- 💹 High maintenance tests

  Tests that are high maintenance are those that are fragile and require constant updates as the codebase changes. UI-driven tests are a common cause of high-maintenance tests. Overly complex tests, tests that are tightly coupled to the implementation, and tests with a lot of setups are also more likely to be high maintenance. High-maintenance tests consume a lot of resources and can make it difficult to refactor the codebase.
- 🐡 Lost tests

  Lost tests are those that do nothing and have no value. These tests might have been good at some point but have since been refactored to oblivion or were never implemented in the first place. Lost tests add noise to your test suite, making it harder to determine which tests are meaningful. Always make sure that your tests are relevant to the current state of the project.
- 🔏 Using uncleansed data

Using prod data as-is in tests can expose sensitive information and pose a security risk. Always use sanitized or synthetic test data when running tests, to ensure that sensitive information is not exposed.
- ⚙️ Ignoring business needs or issues

  Tests that focus only on the technology and ignore business needs or issues can result in software that does not meet business requirements. It is essential to involve stakeholders and understand the requirements of the software before writing tests. Tests should focus on ensuring that the software meets business needs and requirements.
- 🕔 Involving testing late

  Testing late in the development process can result in a lot of bugs being discovered late in the development cycle, which can be expensive and time-consuming to fix. It is essential to involve testing early in the development process to catch bugs as soon as possible. Writing tests alongside the code can also result in more effective tests and a more stable codebase.
- 🤐 Secret catcher

  Secret catchers rely on exceptions happening in the code and being caught by the test runner. This approach can be brittle and difficult to maintain, as it relies on specific error messages and exceptions that can change over time. It is better to use a more proactive approach to testing, ensuring that the software meets the desired behaviour under normal conditions.
- 🔢 Line hitter

  Tests that are only written to increase the code coverage metric, without any consideration for the quality of the tests, are known as line hitters. Line hitter tests do not provide any real value to the software and can be misleading. It is important to write meaningful tests that ensure the software meets business needs and requirements.

✅ **DO** use test doubles (such as mocks and stubs) to isolate the code under test from its dependencies. Test doubles can make it easier to write focused tests that only test the behaviour of the code under test.

✅ **DO** use code coverage metrics to identify untested code. Code coverage can be a useful tool for identifying parts of the codebase that are not being tested, which can help guide the creation of new tests.

✅ **DO** use property-based testing to generate large amounts of test data automatically. Property-based testing can be a useful technique for testing complex or edge-case behaviour.

✅ **DO** use continuous integration (CI) system to run tests automatically on each commit. A CI system can help catch regressions early and ensure that the test suite is always up to date.

✅ **DO** use version control systems to track changes in the tests. This makes it easy to roll back to a previous version in case of issues.

✅ **DO** use code reviews to ensure that tests are well-written and adhere to best practices.

✅ **DO** prioritize test cases based on the risk and impact of failure. This helps ensure that critical functionality is always tested.

✅ **DO** use test-driven development (TDD) to guide the development process. TDD can help ensure that the code is thoroughly tested and that new features are implemented correctly.

✅ **DO** use the classic `AAA` (Arrange Act Assert) and `RGR` (Red Green Refactor).

  The AAA and RGR patterns are two common testing patterns that help to write clear, maintainable tests. The AAA pattern is a three-step pattern that consists of Arranging the test, Performing an Action, and Asserting the results. The RGR pattern is a three-step pattern that consists of writing a failing test (Red), making the test pass (Green), and then Refactoring the code. Following these patterns helps to ensure that the tests are clear, maintainable, and reliable.

> ℹ️ When `RGR` is ignored there is the possibility of creating tests with false positives, also known as the `liar`.

✅ **DO** familiarize yourself with Fixtures and best practices around their usage.

  A fixture is a fixed state that the system is in for a test. Fixtures help to ensure that tests are reproducible and predictable. For example, if a test relies on a particular file being in a certain state, the test can set up a fixture to ensure that the file is in the correct state for the test to run. It is important to familiarize yourself with fixtures and best practices around their usage to ensure that tests are reliable and reproducible.

✅ **DO** consider live unit testing tooling and practices.

  Live unit testing is a tool that runs unit tests automatically as the code is being developed. This tool can help to identify issues quickly and efficiently. By running the tests automatically, developers can focus on writing code and receiving immediate feedback on the code's behaviour. Consider using live unit testing tooling and practices to improve the speed and reliability of testing.

✅ **DO** use data generation sparingly and only in cases where specific data is not of relevance.

  Data generation is a tool that helps to create test data automatically. It can help generate large amounts of data or data that would be difficult to create manually. However, it is important to use data generation sparingly and only in cases where specific data is not relevant to the test.

> ℹ️ Apply caution with tooling like AutoFixture.

✅ **DO** write more tests. In particular, areas that require tests at all times are

-   Algorithms
-   Intricate business logic
-   Helpers and Utilities
-   Resolved bugs

> ℹ In addition to having more test coverage that helps with more confidence to change existing code and ensuring that previously discovered regressions do not occur again, tests are very good at identifying issues, especially coupling. Code that violates certain core principles that ensure a healthy and maintainable code base is very difficult to test, writing more tests allows us to see this upfront.

✅ **DO** validate private methods by unit testing public methods.

  Validating private methods through their corresponding public methods ensures that all the code within a unit is being tested, including any private code that is called by the public methods. This practice helps prevent changes in private methods from breaking the functionality of public methods. To validate private methods through their public methods, a developer needs to create test cases that call the public methods with input data that exercise the private methods. The output of the public methods is then validated to ensure that the private methods have produced the expected results.

✅ **DO** keep an eye on test metrics. These should answer questions about how fast tests run, whether there are regressions, how often tests fail, whether there are any tests that stand out as flaky, and what the code coverage is.

Test metrics can provide valuable insights into the effectiveness of your testing approach. Metrics can help answer questions such as: How long do tests take to run? Are tests failing more often than usual? Are certain tests consistently failing or passing? How much code is covered by tests? Tracking these metrics can help identify areas for improvement, such as slow tests or areas of code that need more coverage. It's important to keep an eye on test metrics regularly and adjust your testing approach as needed to improve the quality and speed of testing.

✅  **DO** consider a data generator like [Bogus](https://github.com/bchavez/Bogus) paired builders.

Data generators like Bogus can be very helpful for creating test data. Test data generation can be time-consuming, especially if the data needs to be complex or varied. By using a data generator, a developer can easily create a large amount of realistic data to use in testing. Paired builders are a common pattern for generating data that have relationships or dependencies between different objects. They can help create data that is more representative of real-world scenarios and make it easier to write tests that cover a variety of use cases.

-   Over time the dependency list can grow and it is quite cumbersome to have to modify tests to add new mocks
-   Quite often most of the mocks do not require setup so you do not need to explicitly create the mock, it can be auto-created
-   The code can be made more succinct and easier to read

> ℹ Often when a service is updated to add a new dependency, this indicates new behaviour and likely means you would add new tests, not modify existing ones. With this approach, you do not have to update the tests.

✅ **DO** name mocks vs mock object instances accordingly. Mocks from `AutoMoq`, `new Mock<T>()` or `Mock.Of<T>` should have the suffix mock but not the object instances from `mock.Object` i.e userMock for the mock and user for the object. This distinction can go a long way in the readability of tests.

The mocks should have the suffix Mock, while the object instances should not have this suffix. This helps in the readability of tests, making it clear which objects are mocks and which are not. For example, you can name the mock as userMock and the object instance as a user.

✅ **DO** make use of the name `sut` for the `system under test`. This small detail shines particularly when the test is heavy in the arrange stage, it needs to be clear what the sut is.

It is a good practice to use the name sut for the system under test in your tests. This makes it clear which object is being tested, especially in a test with a large setup. It also helps to avoid anti-patterns as it forces a test to have one SUT. The same standardization applies to what is expected with the name expected and results for any sut call results

> ℹ️ This is in contrast to the actual entity name and actual result type i.e. deal. That approach means a lot of unique names and does not help in a large code base. As for the SUT, there is an understated benefit of immediately being able to identify what is the system under test, especially in a test with a large setup. This can also avoid anti-patterns as it forces a test to have one SUT. The same standardization applies to what is expected with the name `expected` and `result` for any sut call results.

✅ **DO** make use of the name `result`, for the result to be asserted in a test.\

It is recommended to use the name result for the variable that holds the result of the system under test in your tests. This makes it clear what the variable represents and which variable is being asserted.

✅ **DO** abstract things out to keep arrange phase clean.

It is a good practice to abstract things out to keep the arrange phase of your tests clean. This helps to reduce duplication and keep the tests concise. However, when doing this, make sure that it is still clear what is going on entirely from reading the test. It is very easy to introduce the mystery guest while doing this.

✅ **DO** favour naming tests in the format `given then should` or `given when then should`. Long test names are perfectly fine.

The recommendation to name tests in the format given then should or given when then should is to make the intent of the test clear and to make it easy to understand what the test is doing. The given section sets up the initial conditions for the test, the when section describes the action being taken, and the then section describes the expected outcome.

Using this naming convention can make it easier to write tests and can make it easier to read and understand the tests later on. The long test names may seem cumbersome, but they can make the tests more readable and self-documenting.

For example, consider the following test name: `GivenAListOfIntegers_WhenSortingInDescendingOrder_ThenShouldReturnSortedListInDescendingOrder`

This test name clearly states what the test is doing: it is given a list of integers, sorting them in descending order, and then it checks that the resulting list is sorted in descending order.

Using this naming convention consistently throughout the project can make it easier for developers to find and understand tests, and can make the codebase more maintainable

⛔ **DO NOT** use tools that do not adhere to mocking best practices like `NSubstitute`.

It is important to use mocking tools that adhere to best practices, as otherwise, your tests may be unreliable and difficult to maintain. NSubstitute is one such tool that does not follow best practices, so it is recommended to avoid it.

⛔ **DO NOT** test the inner details of components, take a black box approach. Inner details should be able to change without necessarily affecting a consumer. When tests rely on these details they become brittle and high maintenance with minimal to no value added.

It is important to take a black box approach to test components, as this ensures that your tests will be more resilient to changes in the implementation. If your tests rely on inner details, they may become brittle and difficult to maintain.

⛔ **DO NOT** aim for 100% code coverage instead aim for high-quality and low-effort tests. Focusing on code coverage regressions is however reasonable. Emphasis on this metric can lead to `line hitter` tests that developers create just to achieve a metric without really adding much value.

While high code coverage is important, it should not be the sole focus of your testing efforts. Instead, aim for high-quality tests that are easy to write and maintain. Focusing too much on code coverage can lead to tests that are low-value and difficult to maintain

⛔ **DO** not use the `MemberData` attribute for primitive types, only use this for complex types that cannot use `InlineData`. InlineData makes it easy to see the test and its test data easily, you lose this with a separate method for member data.

```csharp
[Theory]
[InlineData(null, false)]
[InlineData("", false)]
[InlineData(" ", false)]
[InlineData("value", true)]
public void Sample(string input, bool expected){}

// IS BETTER THAN
[Theory]
[MemberData(nameof(TestData))]
public void Sample(string input, bool expected){}
```

⛔ **DO NOT** write tests with multiple responsibilities, instead a test should have a single focus. Multiple unrelated assertions are a red flag.

When writing tests, it's important to keep in mind that each test should have a single responsibility and focus. This means that multiple unrelated assertions within a single test should be avoided. When a test has multiple responsibilities, it becomes more difficult to understand and maintain and may lead to false positives or false negatives.

Instead, tests should be written with a clear, single focus. This allows for better isolation of failures and makes it easier to diagnose and fix issues when they arise. It also helps to keep the tests readable and understandable, making it easier for other developers to understand what the test is testing and what the expected outcome is.

## .NET

✅ **DO** make use of `AutoMoq to create instances of an object that have dependencies in tests.

Data generators like Bogus can be very helpful for creating test data. Test data generation can be time-consuming, especially if the data needs to be complex or varied. By using a data generator, a developer can easily create a large amount of realistic data to use in testing. Paired builders are a common pattern for generating data that have relationships or dependencies between different objects. They can help create data that is more representative of real-world scenarios and make it easier to write tests that cover a variety of use cases.

  - The effort of mocking services is quite high given the typical number of dependencies
  - Mocking service dependencies manually in tests creates fragile tests that will need updating each time those dependencies change. Ideally tests should change when behavior of interest changes.

Problem scenario:

```csharp
  var sut = new ValueService(
      Mock.Of<IJobService>(),
      Mock.Of<ICache>(),
      dataContext,
      Mock.Of<IServiceProvider>(),
      Mock.Of<IClaimsPrincipalProvider>(),
      new NullLoggerFactory(),
      Mock.Of<ILocalisedExceptionProvider>()
  );
```

In this case the only mock we care about is actually the data context and so the rest can be auto mocked.

```csharp
  var autoMock = AutoMock.GetLoose(c => c.RegisterInstance(dataContext));

  var sut = autoMock.Create<ValueService>();
```

Additional cases:

```csharp
  var autoMock = AutoMock.GetLoose(c =>
  {
      // if you need a real instance of JobService, automock will transitively mock JobService's deps as well
      c.RegisterType<JobService>().As<IJobService>();
      c.RegisterInstance(dataContext);
  });

  // setup can be done on the mocks using Moq's api as
  autoMock.Mock<IJobService>().Setup(...);
  autoMock.Mock<IJobService>().Verify(...);
```

✅ **DO** replicate the folder structure of the project being tested in your tests. This makes it easy to navigate between the two and helps ensure that tests are placed in logical locations.

✅ **DO** favour creating test projects for each project being tested. This allows tests to be parallelized at a project level, which can help speed up test execution time. Using a single test project can create a bottleneck and slow down the testing process.

✅ **DO** name test files with suffix tests

Naming test files with a suffix such as Tests help to indicate that the file is related to testing and makes it easier to find all test files in the codebase. The naming convention of using a Tests suffix is widely used and understood by developers in the .NET community, making it a best practice to follow.

For example, suppose you have a class DictionaryExtensions in your production code that provides additional functionality for working with dictionaries. In that case, it would be a good practice to create a separate file DictionaryExtensionsTests.cs, which contains unit tests for the DictionaryExtensions class. This way, when you are navigating through the codebase, it is easy to identify and locate the tests for a given class or module.

🎃 **DO** be aware of a **GOTCHA** with working with the EF core in-memory data context. This implementation chooses to enforce referential integrity for navigation properties. If you create an object that has a `non-nullable` navigation property and leaves this as null and then add it into the data context in your test, any attempt to read this back out will not return anything. All `non-nullable` navigation properties will have to be `non-null` as well for this to work. Quite the annoyance for tests but currently with no workaround.

This is an important consideration when using the EF Core in-memory data context for testing. If you encounter this issue, you will need to make sure that all non-nullable navigation properties are set to non-null values.

## Jest and React Testing Library

✅ **DO** group related tests under a describe if multiple tests are in one file such as with tests for utils.

When multiple tests are in one file, it's a good idea to group them using the describe function. The describe function creates a block that groups together several related tests, making it easier to read and understand the test suite.

```typescript
describe('Utils', () => {
  test('should do something', () => {
    // test code
  });

  test('should do something else', () => {
    // test code
  });
});
```

✅ **DO** name test files with suffix tests i.e `utils.test.ts`, `breadCrumbs.test.tsx`

```
src/
  utils.js
  utils.test.js
  components/
    breadcrumbs.js
    breadcrumbs.test.js
```

✅ **DO** favour data driven tests with `test.each` over duplicated tests

```typescript
test.each([
    [new Date(2000, 11, 12), false],
    [new Date(1970, 11, 12), false],
    [new Date(1969, 11, 12), true],
    [new Date(1950, 11, 12), true],
])("isDateBefore_1970 returns relevant boolean", (date: Date, expected: boolean) => {
    expect(isDateBefore_1970(date)).toBe(expected);
});
```

🎃 When setting up a mock with jest.mock, ideally you may want to set up one of the properties based on a variable so that you can use the same value in your assertions. Jest will however fail the test complaining that mocks cannot access outside variables. This is in place to avoid dirty mocks, however, you can bypass this by simply naming the variables with the `mock` suffix i.e `mockUser`

```typescript
const mockUnknown = "#9E9E9E";

jest.mock("../../redux/store", () => ({
    getState: (): RecursivePartial<RootState> => ({
        app: {
            statusColors: {
                unknown: mockUnknown,
            },
        },
    }),
}));
```

⛔ **DO NOT** use `ReactTestUtils`. Use `React Testing Library` which is designed to enable and encourage writing tests that use your components as the end users do. `ReactTestUtils` has features like mock elements, which do not simulate how a user will use the components and encourages
very bad testing approaches.

ReactTestUtils is a utility library that was introduced early in the development of React. It provides various methods for testing React components. However, using ReactTestUtils is no longer recommended for testing React applications. The library encourages testing the internal implementation details of the components, rather than their behaviour, which can result in tests that are tightly coupled to the implementation and are therefore more brittle and difficult to maintain.

Instead, the recommended approach for testing React components is to use React Testing Library. React Testing Library is a lightweight testing library that is designed to enable and encourage writing tests that use components as the end users do. Its API is designed to be intuitive and mirrors how users interact with components in the browser. For example, instead of directly accessing a component's internal state and props, you interact with the component through its rendered output and the DOM nodes that it produces.

React Testing Library is focused on testing the behaviour of the components, rather than their implementation details. This approach makes it easier to write tests that are maintainable and do not break as often. Additionally, the library provides a better developer experience and makes it easier to write tests that are expressive and easy to read.

## Examples

Here are some examples to demonstrate some of these practices at play in unison.

### .NET

```csharp
using System;
using Xunit;
using Moq;
using AutoMoq;
using Bogus;

public class OrderServiceTests
{
    // Naming convention for test method is in the format of
    // given [scenario], when [action], then [expected outcome]
    [Fact]
    public void GivenValidOrder_WhenSubmittingOrder_ThenOrderIsSavedAndConfirmationIsReturned()
    {
        // Arrange
        var sut = new OrderService();

        // Create a fake order using the Bogus data generator
        var fakeOrder = new Faker<Order>()
            .RuleFor(o => o.Id, f => f.Random.Guid())
            .RuleFor(o => o.CustomerName, f => f.Name.FullName())
            .RuleFor(o => o.ProductName, f => f.Commerce.ProductName())
            .RuleFor(o => o.Quantity, f => f.Random.Int(1, 10))
            .Generate();

        // Use AutoMoq to create an instance of the OrderRepository with the required dependencies mocked
        var mocker = new AutoMoqer();
        var mockRepository = mocker.Create<OrderRepository>();

        // Set up the mock repository to return the fake order when the Save method is called
        mockRepository.Setup(r => r.Save(It.IsAny<Order>())).Returns(fakeOrder);

        // Inject the mock repository into the SUT
        sut.Repository = mockRepository.Object;

        // Act
        var result = sut.SubmitOrder(fakeOrder);

        // Assert
        // Check that the Save method was called on the mock repository with the correct argument
        mockRepository.Verify(r => r.Save(fakeOrder), Times.Once);

        // Check that the confirmation message is not empty and contains the order ID
        Assert.True(!string.IsNullOrEmpty(result.ConfirmationMessage));
        Assert.Contains(fakeOrder.Id.ToString(), result.ConfirmationMessage);

        // Check that the returned order is not null and has the same ID as the fake order
        Assert.NotNull(result.Order);
        Assert.Equal(fakeOrder.Id, result.Order.Id);
    }
}
```

In this test, we see the following best practices being applied:

- The test method name follows the format given [scenario], when [action], then [expected outcome].
- The sut variable is used to clearly identify the System Under Test.
- The result variable is used to clearly identify the result of the action being tested.
- Mock objects are used to isolate the SUT from its dependencies.
- AutoMoq is used to make it easier to create mock objects with dependencies.
- The MemberData attribute is not used for primitive types in favor of InlineData.
- The test is kept focused with a single responsibility.
- The Fact attribute is used to mark the method as a test.
- The OrderServiceTests class follows the naming convention of adding Tests as a suffix to the class being tested.
- A shared data generator like Bogus is used to create fake orders for testing.
- The test code is kept organized with clear comments and whitespace.
- The `Mock.Of<T>` factory method is used for mock objects with no additional setup required.
- The AutoMoq library is used to make tests more concise and easier to read.
- The result variable is used to clearly identify the result of the action being tested.
- The test file follows the naming convention of adding Tests as a suffix to the file being tested.
- The InlineData attribute is used to supply test data directly to the test method.
- The test method is kept focused with a single responsibility.

```typescript
// Import the function being tested
import { formatName } from '../utils';

// Describe block for the group of tests
describe('formatName function', () => {
  // Single responsibility test case
  it('should format a first and last name correctly', () => {
    // Arrange
    const firstName = 'John';
    const lastName = 'Doe';

    // Act
    const formattedName = formatName(firstName, lastName);

    // Assert using fluent assertions
    expect(formattedName)
      .to.be.a('string')
      .and.to.equal('Doe, John')
  });

  // Data driven tests with test.each
  test.each`
    firstName      | lastName        | expected
    ${'John'}      | ${'Doe'}        | ${'Doe, John'}
    ${'Mary'}      | ${'Smith'}      | ${'Smith, Mary'}
    ${'James'}     | ${'Brown'}      | ${'Brown, James'}
  `('should format $firstName $lastName correctly', ({ firstName, lastName, expected }) => {
    // Arrange and Act
    const formattedName = formatName(firstName, lastName);

    // Assert using fluent assertions
    expect(formattedName).to.equal(expected);
  });

  // Clear and concise test descriptions with given-when-then format
  it('should capitalize the first letter of first and last names', () => {
    // Arrange
    const firstName = 'john';
    const lastName = 'doe';

    // Act
    const formattedName = formatName(firstName, lastName);

    // Assert using fluent assertions
    expect(formattedName).to.equal('Doe, John');
  });

  // Descriptive naming for test files and functions
  it('should return an empty string if no parameters are passed', () => {
    // Arrange and Act
    const formattedName = formatName();

    // Assert using fluent assertions
    expect(formattedName).to.equal('');
  });
});
```

This test incorporates best practices such as using clear and concise test descriptions in the given-when-then format, having descriptive naming for test files and functions, using data-driven tests with test.each, using single-responsibility tests, and utilizing fluent assertions for more readable and maintainable test code.

## Recommended reading

- [xUnit Test Patterns(Refactoring Test Code)]https://www.amazon.co.uk/xUnit-Test-Patterns-Refactoring-Signature/dp/0131495054)
[Unit Testing:Principles, Practices and Patterns: Effective Testing Styles, Patterns, and Reliable Automation for Unit Testing, Mocking, and Integration Testing with Examples in C#](https://www.amazon.co.uk/dp/1617296279/ref=as_li_tl?ie=UTF8&linkCode=gs2&linkId=bbc23e6697b3d4b1c78d3cffc3cc9f3a&creativeASIN=1617296279&tag=booksoncode-21&creative=9325&camp=1789)
- [C# and .NET Core Test-Driven Development: Dive into TDD to create flexible, maintainable, and production-ready .NET Core applications](https://www.amazon.co.uk/dp/B0772S8R7Q/ref=as_li_tl?ie=UTF8&linkCode=gs2&linkId=8c075ed3114ab84c093b54c5a5353361&creativeASIN=B0772S8R7Q&tag=booksoncode-21&creative=9325&camp=1789)

> ℹ️ [ChatGPT](https://openai.com/blog/chatgpt/) proved to be a very useful resource in proofreading the initial draft and researching more content.
