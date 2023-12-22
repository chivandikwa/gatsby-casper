---
layout: post
title: Generalize .net test dependencies
image: img/unsplash/shubham-dhage-nMcqssE0eA0-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2021-06-29T10:00:00.000Z
tags: [Directory.Build.props in .NET, Managing .NET Dependencies, Centralized Dependency Management]
draft: false
excerpt: This guide demonstrates how to simplify and unify test configurations across multiple .NET projects, enhancing maintainability and consistency
---

Photo by <a href="https://unsplash.com/@theshubhamdhage?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Shubham Dhage</a> on <a href="https://unsplash.com/photos/nMcqssE0eA0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Generalize .net test dependencies with Directory.Build.props

In the .NET ecosystem, Directory.Build.props is a powerful feature that allows developers to apply common settings across multiple project files. It acts as a central place to define properties and item groups that are automatically imported into every project in the directory tree. This means you can specify a single version of a NuGet package or a set of common properties in one file, and these settings will propagate to all relevant projects. This approach not only streamlines the configuration process but also ensures consistency and reduces the likelihood of errors in large solutions.

The `Directory.Build.props` file offers a lot of interesting features for targeted projects, solution folders, or the entire solution. Let's focus on how we can leverage this to generalize test dependencies and any required configuration in one place.

Test project dependencies tend to be mostly the same across multiple projects and annoyingly can be quite easy to point to different versions and require consolidating. I use the `Directory.Build.props` at the tests folder to target all test projects, in my case by the suffix `.Tests` in the name, and apply the generic dependencies in one place.

Utilizing Directory.Build.props offers several key benefits:

- Reduced Redundancy: By centralizing common configurations, it eliminates the need to duplicate settings across multiple project files.
- Ease of Updates: Updating a single `Directory.Build.props` file propagates changes to all projects, simplifying maintenance and version upgrades.
- Consistency Across Projects: Ensures uniformity in settings and dependencies, making the codebase more cohesive and manageable."

## Example

```xml
<Project>
    <PropertyGroup Condition="$(MSBuildProjectName.EndsWith('.Tests'))">
        <IsPackable>False</IsPackable>
    </PropertyGroup>

    <ItemGroup Condition="$(MSBuildProjectName.EndsWith('.Tests'))">
        <PackageReference Include="Autofac.Extras.Moq" Version="6.1.0" />
        <PackageReference Include="FluentAssertions" Version="6.7.0" />
        <PackageReference Include="FluentAssertions.Analyzers" Version="0.17.2" />
        <PackageReference Include="XUnitToFluentAssertionsAnalyzer" Version="1.0.2">
            <PrivateAssets>all</PrivateAssets>
            <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
        </PackageReference>
        <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.2.0" />
        <PackageReference Include="xunit" Version="2.4.1" />
        <PackageReference Include="xunit.runner.console" Version="2.4.1">
            <PrivateAssets>all</PrivateAssets>
            <IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
        </PackageReference>

        <PackageReference Include="xunit.runner.visualstudio" Version="2.4.5">
            <PrivateAssets>all</PrivateAssets>
            <IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
        </PackageReference>

        <PackageReference Include="AutoFixture" Version="4.17.0" />

        <PackageReference Include="coverlet.collector" Version="3.1.2">
            <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
            <PrivateAssets>all</PrivateAssets>
        </PackageReference>
    </ItemGroup>

    <ItemGroup Condition="$(MSBuildProjectName.EndsWith('.Tests'))">
        <ProjectReference Include="..\Sample.Tests.Common\Sample.Tests.Common.csproj" />
    </ItemGroup>
</Project>
```

In this example, we have all test projects marked as not being packable, setup of required package references and all tests have a project reference to a common test project that could contain shared things like fixtures, builder, etc. We no longer need to have these in each project and can control what goes in all the tests in one place.

While this was specifically about tests, there are many other use cases. For example, we could set things like copyright and assembly info in one place by targeting all projects, indicating the C# language version at the solution level, etc. Cases like these are often the same for all projects but over time people forget to update some projects or it just becomes tedious to keep up.

## Pitfalls

One common pitfall is inadvertently affecting projects with unwanted configurations. To avoid this, use conditional properties in your `Directory.Build.props` file to selectively apply settings. Another issue is the misplacement of the file; ensure it's correctly located at the solution root or appropriate directory level. Also, be mindful of the order of properties and their overriding behavior, as this can lead to unexpected configurations.

## Conclusion

In conclusion, `Directory.Build.props` is a highly effective tool in the .NET developer's arsenal for managing project dependencies and configurations. By centralizing common settings, it not only simplifies project management but also enhances the maintainability and consistency of your codebase. As demonstrated, its benefits extend beyond test projects, offering a streamlined approach to handle various aspects of .NET development. Adopting `Directory.Build.props` can significantly improve the efficiency and reliability of managing large and complex .NET solutions.
