---
layout: post
title: Dependency injection with Scrutor
image: img/unsplash/mick-haupt-eQ2Z9ay9Wws-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-05-01T19:00:00.000Z
tags: [Scrutor, Dependency Injection, Microsoft.Extensions.DependencyInjection]
draft: false
excerpt: Compliment Microsoft.Extensions.DependencyInjection
---

Photo by <a href="https://unsplash.com/ko/@rocinante_11?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mick Haupt</a> on <a href="https://unsplash.com/photos/eQ2Z9ay9Wws?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Dependency injection

Dependency injection is a key concept in modern software development, as it allows developers to write code that is modular, testable, and easy to maintain. `Microsoft.Extensions.DependencyInjection` is a popular DI container in the .NET ecosystem, which allows developers to register dependencies and resolve them at runtime. However, as projects grow in size and complexity, managing all the dependencies can become challenging.

That's where `Scrutor` comes in. Scrutor is a library that complements `Microsoft.Extensions.DependencyInjection`, providing additional features for scanning and registering dependencies. It allows developers to scan assemblies and register dependencies based on naming conventions, interfaces, and attributes, reducing the amount of boilerplate code required for DI configuration. In this article, we'll explore some of the benefits of using Scrutor and show code examples of how it can be used to improve the dependency injection experience.

# Scanning for Dependencies with Scrutor

Let's start by looking at an example of registering dependencies without Scrutor

```csharp
services.AddScoped<IRegistrationService, RegistrationService>();
services.AddSingleton<RedisHealthCheck>();
services.AddSingleton<SqlDbHealthCheck>();
services.AddSingleton<AzureServiceBusHealthCheck>();
```

This is a straightforward approach to registering dependencies, but it can become cumbersome as the number of dependencies grows. Additionally, if a new dependency is added to the project, it needs to be manually registered with the container, for example, if we were to introduce more implementations of health checks we would need to remember to include them manually.

With Scrutor, we can simplify this process by `scanning` for dependencies based on naming conventions or attributes. For example, we can scan all assemblies in the current application domain and register all classes that implement an interface with a given name

```csharp
services.Scan(scan => scan
    .FromAssemblyOf<IHealthCheck>()
    .AddClasses(classes => classes.AssignableTo<IHealthCheck>())
    .AsSelf()
    .WithSingletonLifetime());
```

The `FromAssembliesOf` method specifies which assemblies to scan, and the `AddClasses` method specifies which classes to include in the scan. The `AsSelf` method tells Scrutor to register each concrete class as itself, and the `WithSingletonLifetime` method sets the lifetime of each dependency to scoped.

You can also use the following registrations

- `As(params Type[] types)` and `As(IEnumerable<Type> types)`: Registers each matching concrete type as each of the specified types
- `As<T>()`: Registers each matching concrete type as `T`
- `AsImplementedInterfaces()`: Registers each matching concrete type as all of its implemented interfaces
- `AsImplementedInterfaces(Func<Type, bool> predicate)`: Registers each matching concrete type as all of its implemented interfaces, with a predicate to filter which interfaces to register
- `AsMatchingInterface()`: Registers the type with the first found matching interface name
- `AsMatchingInterface(Action<Type, IImplementationTypeFilter> action)`: Registers the type with the first found matching interface name with a filter for the matching type
- `As(Func<Type, IEnumerable<Type>> selector)`: Registers each matching concrete type as each of the types returned from the func
- `UsingAttributes()`: Registers each matching concrete type according to their definition of a `ServiceDescriptorAttribute`

All the scopes supported by `Microsoft.Extensions.DependencyInjection` are available:

- `WithSingletonLifetime()`
- `WithScopedLifetime()`
- `WithTransientLifetime()`
- `WithLifetime()`

There are multiple ways to add classes:

- `AddClasses()`: Adds all public, non-abstract classes from the selected assemblies
- `AddClasses(bool publicOnly)`: Adds all public, non-abstract classes from the selected assemblies with a boolean on whether to add public types only
- `AddClasses(Action<IImplementationTypeFilter> action)`: Adds all public, non-abstract classes from the selected assemblies that match the requirements specified in the filtering action
- `AddClasses(Action<IImplementationTypeFilter> action, bool publicOnly)`: Adds all public, non-abstract classes from the selected assemblies that match the requirements specified in the filtering action with a boolean on whether to add public types only

There are also multiple ways to target and assembly:

- `FromCallingAssembly()`: Scans for types from the calling assembly
- `FromExecutingAssembly()`: Scans for types from the currently executing assembly
- `FromEntryAssembly()`: Scans for types from the entry assembly
- `FromApplicationDependencies()`: Will load and scan all runtime libraries referenced by the currently executing application. Calling this method is equivalent to calling `FromDependencyContext(DependencyContext)` and passing in `DependencyContext.Default`.
- `FromApplicationDependencies(Func<Assembly, bool> predicate)`: Will load and scan all runtime libraries referenced by the currently executing application with a predicate filter. Calling this method is equivalent to calling `FromDependencyContext(DependencyContext)` and passing in `DependencyContext.Default`.
- `FromAssemblyDependencies(Assembly assembly)`: Will load and scan all runtime libraries referenced by the specified assembly
- `FromDependencyContext(DependencyContext context)`: Will load and scan all runtime libraries in the given `DependencyContext`
- `FromDependencyContext(DependencyContext context, Func<Assembly, bool> predicate)`: Will load and scan all runtime libraries in the given `DependencyContext` with a filter predicate
- `FromAssemblyOf<T>()`:  Will scan for types from the assembly of `T`
- `FromAssemblyOf(params Type[] types)` and `FomAssembliesOf(IEnumerable<Type> types)`:  Will scan for types from the assemblies of each passed-in type
- `FromAssemblies(params Assembly[] assemblies)` and `FromAssemblies(IEnumerable<Assembly> assemblies)`:  Will scan for types from each passed in assembly

By using Scrutor to scan for dependencies, we can reduce the amount of boilerplate code required for DI configuration and ensure that all dependencies are automatically registered with the container.

> Scrutor means to explore/scan/search carefully, search into or out, examine thoroughly, explore a thing, investigate to scrutinize.

# Open Generics

Scrutor also supports registering open generic types. For example, let's say we have an interface `IFoo<T>` and a class `Foo<T>` that implements it

```csharp
public interface IFoo<T> { }
public class Foo<T> : IFoo<T> { }
```

We can register all implementations of `IFoo<T>` using the `AddClasses` method with the `AssignableTo` and `AsImplementedInterfaces` methods, like so:

```csharp
services.Scan(scan => scan
    .FromAssemblyOf<Foo<int>>()
    .AddClasses(classes => classes
        .AssignableTo(typeof(IFoo<>))
        .AsImplementedInterfaces()));
```

# Decorators with Scrutor

Another powerful feature of Scrutor is the ability to use decorators to modify or replace registered dependencies. For example, let's say we have an existing service that we want to enhance with additional functionality. We can do this by registering a decorator that wraps the existing service

Let's say we have an existing health check implementation:

```csharp
public class MyHealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default(CancellationToken))
    {
        // Perform health check logic here
    }
}
```

We want to add logging to this health check without modifying the original code. We can do this by registering a decorator that wraps the existing health check:

```csharp
services.Decorate<IHealthCheck>((check, serviceProvider) =>
    new LoggingHealthCheckDecorator(check));
```

The `Decorate` method takes a delegate that creates the decorator instance, passing in the existing health check and the service provider. The decorator can then modify or replace the existing health check as needed.

Here's an example of what the `LoggingHealthCheckDecorator` might look like:

```csharp
public class LoggingHealthCheckDecorator : IHealthCheck
{
    private readonly IHealthCheck _innerCheck;
    private readonly ILogger<LoggingHealthCheckDecorator> _logger;

    public LoggingHealthCheckDecorator(
        IHealthCheck innerCheck,
        ILogger<LoggingHealthCheckDecorator> logger)
    {
        _innerCheck = innerCheck;
        _logger = logger;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default(CancellationToken))
    {
        _logger.LogInformation("Checking health");
        var result = await _innerCheck.CheckHealthAsync(context, cancellationToken);
        _logger.LogInformation("Health check result: {Result}", result.Status);
        return result;
    }
}
```

By using decorators with Scrutor, we can easily enhance or replace existing dependencies without modifying the original code.

# Conclusion

Scrutor is a powerful library that complements `Microsoft.Extensions.DependencyInjection` by providing additional features for scanning and registering dependencies. With Scrutor, we can simplify the DI configuration process and ensure that our code remains modular, testable, and easy to maintain.

By leveraging the power of Scrutor, we can write cleaner, more maintainable code and spend less time managing dependencies.
