---
layout: post
title: Dotnet must know - Serializable Exceptions
image: img/unsplash/ux-indonesia-WCID2JWoxwE-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-03-17T10:00:00.000Z
tags: [dotnet must know,.net, exceptions]
draft: false
excerpt: Dotnet must know - Serializable Exceptions
---

Photo by <a href="https://unsplash.com/@uxindo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">UX Indonesia</a> on <a href="https://unsplash.com/photos/WCID2JWoxwE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Ensuring Custom Exceptions are Serializable and Implement the Four Core Constructors

> This article is part of a series for [`Dotnet must know`](https://www.drunkonmonads.com/tags/dotnet-must-know/)

Exceptions are an integral part of any software application, and custom exceptions provide a way to handle application-specific errors in a more specific and meaningful way. However, when creating custom exceptions, it's important to ensure they are serializable and implement the four core constructors.

## Why Is This Important?

When an exception occurs in an application, it may need to be propagated across different tiers or processes, or even persisted to a log or database. In such cases, the exception object must be serializable so that it can be transmitted or stored. If the exception object is not serializable, it may not be possible to propagate or store it, resulting in loss of valuable debugging information.

The four core constructors provide a way to initialize an exception object with the necessary information. The parameterless constructor initializes the exception object with default values, while the constructor that takes a string message initializes it with a user-defined message. The constructor that takes a string message and an inner exception initializes it with a user-defined message and the inner exception that caused the current exception. Finally, the constructor that takes a SerializationInfo object and a StreamingContext object is used to initialize an exception object during deserialization.

Enforcing this rule ensure consistency as the expectations will always be the same for all custom Exceptions.

## Enforcing This Using Unit Tests

To ensure that all custom exceptions in an application are serializable and implement the four core constructors, we can use unit tests. Here's an example of how to do this in xUnit and Fluent Assertions:

```csharp
/// <summary>
/// At a minimum, you should mark your custom exception as serializable and implement the four basic constructors
/// </summary>
public class ExceptionSerializationTests
{
    [Fact]
    public void GivenAnAssemblyContainingExceptionTypes_ShouldEnsureAllExceptionTypesAreSerializable()
    {
        var assembly = typeof(AssemblyMarker).Assembly;

        assembly.Should().ContainSerializableExceptions();
    }

    [Fact]
    public void GivenAnAssemblyContainingExceptionTypes_ShouldEnsureAllExceptionTypesHaveTheFourBasicConstructors()
    {
        var assembly = typeof(AssemblyMarker).Assembly;

        assembly.Should().ContainExceptionsImplementingAllBaseConstructors();
    }
}
```

```csharp
/// <summary>
/// Extension methods for Fluent Assertions to provide custom assertions for the Assembly type.
/// </summary>
public static class AssemblyAssertionsExtensions
{
    /// <summary>
    /// Asserts that all custom exception types in the assembly are decorated with the Serializable attribute.
    /// </summary>
    /// <param name="assertions">The assembly assertions.</param>
    /// <returns>A chainable assertion object.</returns>
    public static AndConstraint<AssemblyAssertions> ContainSerializableExceptions(
        this AssemblyAssertions assertions)
    {
        var exceptionTypes = assertions.Subject.GetTypes()
            .Where(t => t.IsSubclassOf(typeof(Exception)) && !t.IsAbstract);

        foreach (var exceptionType in exceptionTypes)
        {
            Execute.Assertion.ForCondition(Attribute.IsDefined(exceptionType, typeof(SerializableAttribute)))
                .FailWith(
                    $"Expected exception type '{exceptionType.Name}' to be decorated with SerializableAttribute.");
        }

        return new AndConstraint<AssemblyAssertions>(assertions);
    }

    /// <summary>
    /// Asserts that all custom exception types in the assembly have the four basic constructors: parameterless,
    /// string message, string message and inner exception, and SerializationInfo and StreamingContext.
    /// </summary>
    /// <param name="assertions">The assembly assertions.</param>
    /// <returns>A chainable assertion object.</returns>

    public static AndConstraint<AssemblyAssertions> ContainExceptionsImplementingAllBaseConstructors(
        this AssemblyAssertions assertions)
    {
        var exceptionTypes = assertions.Subject.GetTypes().Where(t => typeof(Exception).IsAssignableFrom(t));

        foreach (var exceptionType in exceptionTypes)
        {
            var constructors =
                exceptionType.GetConstructors(BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Public);

            Execute.Assertion.ForCondition(constructors.Any(c => c.GetParameters().Length == 0))
                .FailWith($"Expected exception type '{exceptionType.Name}' to have a parameterless constructor.");

            Execute.Assertion.ForCondition(constructors.Any(c =>
                    c.GetParameters().Length == 1 && c.GetParameters()[0].ParameterType == typeof(string)))
                .FailWith(
                    $"Expected exception type '{exceptionType.Name}' to have a constructor that takes a string message.");

            Execute.Assertion.ForCondition(constructors.Any(c =>
                    c.GetParameters().Length == 2 &&
                    c.GetParameters()[0].ParameterType == typeof(string) &&
                    c.GetParameters()[1].ParameterType == typeof(Exception)))
                .FailWith(
                    $"Expected exception type '{exceptionType.Name}' to have a constructor that takes a string message and an inner exception.");

            Execute.Assertion.ForCondition(constructors.Any(c =>
                    c.IsFamily && c.GetParameters().Length == 2 &&
                    c.GetParameters()[0].ParameterType == typeof(System.Runtime.Serialization.SerializationInfo) &&
                    c.GetParameters()[1].ParameterType == typeof(System.Runtime.Serialization.StreamingContext)))
                .FailWith(
                    $"Expected exception type '{exceptionType.Name}' to have a protected constructor that takes a SerializationInfo object and a StreamingContext object.");
        }

        return new AndConstraint<AssemblyAssertions>(assertions);
    }
}
```

By enforcing these requirements using unit tests, we can ensure that all custom exception types in our application are serializable and can be properly initialized with the necessary information. This helps us avoid potential bugs and loss of valuable debugging information in the event of an exception.
