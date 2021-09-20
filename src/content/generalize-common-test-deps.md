---
layout: post
title: Generalize .net test dependencies
image: img/clean/used/dandelion.jpg
author: [Thulani S. Chivandikwa]
date: 2021-06-29T10:00:00.000Z
tags: [.net, Directory.Build.props]
draft: false
excerpt: generalize .net test dependencies with Directory.Build.props
---

The Directory.Build.props offers a lot of interesting features for targeted projects, solution folders or the entire solution. Unfortunately I will only be going over just one in this post, generalizing test dependencies.

Test project dependencies tend to be mostly the same across multiple projects and annoyingly can be quite easy to point to different versions and require consolidating. I use the Directory.Build.props at the root of a solution to target all test projects, in my case by the suffix .Tests in the name, and apply the generic dependencies in one place.

## Example:

```csharp
<Project>
    <PropertyGroup Condition="$(MSBuildProjectName.EndsWith('.Tests'))">
        <IsPackable>False</IsPackable>
    </PropertyGroup>

    <ItemGroup Condition="$(MSBuildProjectName.EndsWith('.Tests'))">
        <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.9.1" />
        <PackageReference Include="xunit" Version="2.4.1" />
        <PackageReference Include="xunit.runner.console" Version="2.4.1">
            <PrivateAssets>all</PrivateAssets>
            <IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
        </PackageReference>
        <PackageReference Include="xunit.runner.visualstudio" Version="2.4.3">
            <PrivateAssets>all</PrivateAssets>
            <IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
        </PackageReference>
    </ItemGroup>
</Project>
```

In this example I am adding the Microsoft test sdk and xunit dependencies and setting the packable property to false. I no longer need to have these in each project and can control what goes in all the tests in one place, for instance I could add the coverlet dependency here and all tests would get it.

While this was specifically about tests, I can give some other use cases. You could set things like you copyright and assembly info in one place by targeting all projects. Cases like these are often the same for all projects but over time people forget to update some projects or it just becomes tedious to keep up.
