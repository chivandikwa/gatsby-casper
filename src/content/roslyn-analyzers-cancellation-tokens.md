---
layout: post
title: Must know Roslyn rules - Cancellation Tokens
image: img/clean/used/3d9b78f5-7c4a-44a5-88ef-53f2fc47beb7.jpg
author: [Thulani S. Chivandikwa]
date: 2023-03-17T10:00:00.000Z
tags: [roslyn rules, coding standards, cancellation]
draft: false
excerpt: Must know Roslyn rules - Cancellation Tokens
---

# Must know Roslyn rules - Cancellation Tokens

> This article is part of a series for [`Must know Roslyn rules`](https://www.drunkonmonads.com/tags/roslyn-rules/)

# CA1068: [CancellationToken parameters must come last](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca1068)

This rule suggests that `CancellationToken` parameters should be placed at the end of the parameter list. This is because CancellationToken is a special type of parameter that is used to signal cancellation of a long-running operation. By convention, it is placed at the end of the parameter list to make it clear that it is an optional parameter. We can configure the rule as follows in an `.editorconfig` file.

```swift
dotnet_diagnostic.CA1068.severity = error
dotnet_diagnostic.CA1068.exclude = *_generated.cs
```

In this example, we've set the rule to error, which fails the build on violation. We've also excluded generated files from this rule using the exclude property.

# CA2016: [Forward the CancellationToken parameter to methods that take one](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca2016)

CA2016 is a code analysis rule in Roslyn that checks whether a method that performs a long-running operation takes a CancellationToken parameter, and if it does, whether it forwards that parameter to any other methods that also take a CancellationToken parameter.

This rule suggests that methods that take a CancellationToken parameter should forward that parameter to any other methods that also take a CancellationToken parameter. This can help ensure that a long-running operation can be cancelled gracefully if needed.

Let's look at an example. Consider the following method:

```csharp
public async Task<int> DoLongRunningOperationAsync(CancellationToken cancellationToken)
{
    // Do something that takes a long time
    await Task.Delay(5000);

    // Return a value
    return 42;
}
```

This method takes a CancellationToken parameter but does not forward it to any other methods. If we run the code analysis tool in Visual Studio, we'll get a warning that suggests we should forward the CancellationToken parameter to any other methods that also. We can fix the violation.

```csharp
public async Task<int> DoLongRunningOperationAsync(CancellationToken cancellationToken)
{
    // Do something that takes a long time, and pass the CancellationToken parameter to Task.Delay
    await Task.Delay(5000, cancellationToken);

    // Return a value
    return 42;
}
```

In this updated implementation, the `cancellationToken` parameter is passed to the `Task.Delay` method, which also takes a `CancellationToken` parameter. This ensures that the long-running operation can be cancelled gracefully if needed.

To configure the CA2016 rule in an .editorconfig file, we can use the following settings:

```swift
dotnet_diagnostic.CA2016.severity = error
dotnet_diagnostic.CA2016.exclude = *_generated.cs
```

# Conclusion

While the CA1068 and CA2016 rules are independent of each other and can be configured separately, there is value in configuring them together to ensure that all method signatures are consistent and readable.

The CA1068 rule has exceptions for methods with optional parameters or ref/out parameters following a CancellationToken parameter. While these exceptions make sense for those specific scenarios, it's still a good idea to keep method signatures consistent and easy to read. For example, even if a method has optional parameters following a CancellationToken parameter, we might still want to keep the CancellationToken parameter at the end of the parameter list to make it clear that it is optional and to maintain consistency with other methods that have a CancellationToken parameter
