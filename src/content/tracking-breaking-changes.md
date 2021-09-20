---
layout: post
title: Track API breaking changes in .net
image: img/clean/used/builder.jpg
author: [Thulani S. Chivandikwa]
date: 2021-01-29T00:00:00.000Z
tags: [python]
draft: false
excerpt: prevent accidental breaking changes in your public api with roslyn
---

If you have ever maintained a public API, in particular a large one, you may know just how easy it is to accidentally make breaking changes and roll them out. I have found some interesting ways in the past to avoid this, but I won't bore you with those as I found a better way. Microsoft rolled out a Roslyn Analyzer, PublicApiAnalyzers, that solves just this problem.

The Analyzer works via two text files, `PublicAPI.Unshipped.txt` and `PublicAPI.Shipped.txt`. The analyzer once setup gives the option via Visual Studio to track certain entities as being part of the public API. This will be done by serializing as text, a representation of that entity in the PublicAPI.Unshipped.txt. How you use the PublicAPI.Shipped.txt is entirely up to you. Once you have made changes to the API you will see a warning about something not being in the public API, ideally you would choose the option to update the API details. Now each time you see a change in your pull requests that results in this file being changed it is good reflection point to check if all the API changes are safe or intended and as we will cover later, you can also fail the build on some of the changes.

### Example

You will need to install the nuget package `Microsoft.CodeAnalysis.PublicApiAnalyzers` and manually add the two text files we discussed to your project. Ensure that the text files are added as `AdditionalFiles` in, this is important for the analyzer to work. Your project file should look something like this:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net5.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <AdditionalFiles Remove="PublicAPI.Shipped.txt" />
    <AdditionalFiles Remove="PublicAPI.Unshipped.txt" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.CodeAnalysis.PublicApiAnalyzers" Version="3.3.2">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>

</Project>
```

Let's say you had the following as part of your public API

```csharp
namespace PublicApiSample
{
    using System;
    using System.Collections.Generic;

    public delegate void TagsAppender(List<string> tagBuilder);

    public class Metrics
    {
        public void Timer(string key, TimeSpan elapsed, TagsAppender tags = null)
            => throw new NotImplementedException();

        public IDisposable Timer(string key, TagsAppender tags = null)
            => throw new NotImplementedException();
    }
}
```

You will now notice a warning on the various types indicating that they are not part of the public API.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/tracking-breaking-changes/1.jpg)

You can proceed to add everything in this document to the public API.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/tracking-breaking-changes/2.jpg)

The `PublicAPI.Unshipped.txt` file should now have the following.

```csharp
PublicApiSample.Metrics
PublicApiSample.Metrics.Metrics() -> void
PublicApiSample.Metrics.Timer(string key, PublicApiSample.TagsAppender tags = null) -> System.IDisposable
PublicApiSample.Metrics.Timer(string key, System.TimeSpan elapsed, PublicApiSample.TagsAppender tags = null) -> void
PublicApiSample.TagsAppender
```

Now if you for instance blindly add a new constructor that replaces the default constructor it would be breaking the public API. You will have the warning again to add this to the public API and doing so would raise a question in the pull request.

![screenshot](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/img/screenshots/tracking-breaking-changes/3.jpg)

If again you delete the first of the two methods in the Metrics class and build the project you will have the following warning in the build output:
`Symbol 'PublicApiSample.Metrics.Timer(string key, System.TimeSpan elapsed, PublicApiSample.TagsAppender tags = null) -> void' is part of the declared API, but is either not public or could not be found`

In addition to the IDE features, all the change scenario have warnings emitted on build. I would recommend determining which of those warnings are of interest and treating them as error instead.

The following warnings are available:

- RS0016: Add public types and members to the declared API
- RS0017: Remove deleted types and members from the declared API
- RS0022: Constructor make noninheritable base class inheritable
- RS0024: The contents of the public API files are invalid
- RS0025: Do not duplicate symbols in public API files
- RS0026: Do not add multiple public overloads with optional parameters
- RS0027: Public API with optional parameter(s) should have the most parameters amongst its public overloads
- RS0036: Annotate nullability of public types and members in the declared API
- RS0037: Enable tracking of nullability of reference types in the declared API
- RS0041: Public members should not use oblivious types
- RS0048: Missing shipped or unshipped public API file

See the documentation of these warnings [here.](https://github.com/dotnet/roslyn-analyzers/blob/master/src/PublicApiAnalyzers/Microsoft.CodeAnalysis.PublicApiAnalyzers.md)

Making your builds fail on these warnings is easy. You could for example treat all the warnings as errors by adding the following to the csproj file.

`<WarningsAsErrors>$(WarningsAsErrors);RS0016;RS0017;RS0022;RS0024;RS0025;RS0026;RS0027</WarningsAsErrors>`
