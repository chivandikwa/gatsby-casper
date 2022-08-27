---
layout: post
title: C# Standards and Best Practices
image: img/clean/used/otter.jpg
author: [Thulani S. Chivandikwa]
date: 2022-08-24T19:00:00.000Z
tags: [c#, best practices, standards]
draft: false
excerpt: Standards for disciplined development
---

# C# Standards and Best Practice

A list of recommendations around working with C# and dotnet that can potentially be adopted by a team as standards. I highly recommend a team has very clear and explicit standards documented as below that are agreed upon and enforced.

There are multiple ways to enforce standards

- Pull request verification manual checks
- Automated checks like linters, Roslyn analyzers etc.
- Code scanning tools like Sonar

> ℹ️ While document has a bias towards certain tooling and frameworks, it is largely still very generic.

# Working with secrets

⛔ **DO NOT** store secrets within the source code or source code directories. These can be accidentally committed introducing surface area for leakage. Make use of user secrets which are managed outside of a repository.

> ⚠️ The Secret Manager tool doesn't encrypt the stored secrets and shouldn't be treated as a trusted store. It's for development purposes only. The keys and values are stored in a JSON configuration file in the user profile directory.

⛔ **DO NOT** use production secrets for non production environments. These should be considered highly sensitive and isolated. For example do not use the same storage location for development purposes as production and share access keys even if you isolate in other ways like folders etc.

⛔ **DO NOT** deploy secrets with an application, ideally these should be accessible through a controlled means like environment variables. This principle is particularly important if you adhere to the [12 Factor App]([The Twelve-Factor App (12factor.net)](https://12factor.net/)) way of managing an application.

⛔ **DO NOT** use the `:` character when working with secrets in flat files to create hierarchy, make use of the `__` sequence which is supported by all platforms.

# Projects

## Structure

Do adhere to a strict structure of managing projects and consistently/religiously apply this.

✅ **DO** ensure that projects are located in `/src` and their tests are located in `/test`, not just as projects in VS solution explorer but including the file structure. In addition to a clean separation, the projects and tests have separate `Directory.Build.prop` file and `.editorconfig` files. This will decouple rules around code from tests, meaning for instance that Roslyn analysis is specific to each group and dependencies are managed differently.

✅ **Consider** adding changes that affect multiple projects and need to be consolidated such as project version numbers and dependencies to `Directory.Build.props` or `Directory.Build.targets`.

Examples `Directory.Build.props` files

Located in root of tests to affect all projects in that hierarchy

```xml
<Project>

    <!--Enforce IsPackable false for all tests projects-->
	<PropertyGroup Condition="$(MSBuildProjectName.EndsWith('.Tests'))">
		<IsPackable>False</IsPackable>
	</PropertyGroup>

	<ItemGroup Condition="$(MSBuildProjectName.EndsWith('.Tests'))">
	    <!--Enforce specific package dependencies in all tests-->
	    <!--This is a sure way to ensure that versions are always consolidated-->
		<PackageReference Include="FluentAssertions" Version="6.7.0" />
		<PackageReference Include="FluentAssertions.Analyzers" Version="0.17.2" />
	</ItemGroup>

	<ItemGroup Condition="$(MSBuildProjectName.EndsWith('.Tests'))">
	    <!--Enforce specific project dependencies in all tests, for example with common helpers-->
		<ProjectReference Include="..\Tests.Common\Tests.Common.csproj" />
	</ItemGroup>
</Project>
```

Located in root of solution to affect all projects in that hierarchy

```xml
<Project>
    <PropertyGroup>
        <!--Enforce a shared assembly version for all projects in one place-->
        <Version>2022.0.1</Version>
    </PropertyGroup>
</Project>
```

# Logging

✅ **DO** make use of `Microsoft.Extensions.Logging` as the primary API into logging. Do not use SDKs like `Serilog` or `ApplicationInsights` for this. 3rd party tooling can be changed at any time and in that case should only be used for bootstrapping or wrapped around to avoid work on moving to something different.

> ℹ For example you can adopt use of `Serilog` for logger bootstrapping due to the power and flexibility it has with the supported sinks over `Microsoft.Extension.Logging`. It's use should then be limited only to that.

✅ **DO** make use of log scopes (log context) at all times. As an example, if a controller action has access to an correlation id for something that is being operated on, if this is added to the context and multiple call chains down the line some exception occurs and is captured there + logged, it will contain that correlation id which is very useful.

```csharp

using (logger.BeginScope(new Dictionary<string, object>{

    ["CorrelationId"] = id,

}))

{

    // other method calls

}



using (logger.BeginScope("{Operation} running for department {Department}", operationName, departmentName))

{

    // other method calls

}


```

> ℹ Do ensure that all context follows the `key:value` pair pattern. Scopes that are only values can be confusing.

> ℹ Do consider making use of some form of middleware to extract and include common information that is useful in logs via the log context.

✅ **DO** ensure that log messages are as detailed and specific as possible.

✅ **DO** carefully consider the design of generic implementations of things like Job runners that are meant to be extended with additional implementations. These should have hooks to allows for adding generic logging or metrics tracking like timing operations in a single place as opposed to all implementations.

> How ASP.NET WEB API middleware works is a good example of a hook that allows for intercepting a given pipeline. A more general approach would be to require implementations that override a virtual base class method that can be used to apply such a hook. The same scenario handled with implementing an abstract class would not offer such functionality.

✅ **DO** pay close attention to the data that is exposed in logs especially when setting log scopes with object destructuring to avoid leaking sensitive information. Any secrets like passwords/API keys (even when encrypted) and personally identifiable information like email addresses should not end up in logs.

✅ **DO** pay close attention to the size of log or metrics payloads. Overly large data payloads should be avoided. As a safety net were possible set the config of your logger such as `Serilog` to limit the depth of destructuring and caps the string length, but care is still required as this can be bypassed with context and scopes.

Serilog example

```json
{
  "Serilog": {
    "Using": ["Serilog.Sinks.Console"],
    "Destructure": [
      {
        "Name": "ToMaximumDepth",
        "Args": { "maximumDestructuringDepth": 4 }
      },
      {
        "Name": "ToMaximumStringLength",
        "Args": { "maximumStringLength": 100 }
      }
    ]
  }
}
```

✅ **DO** ensure that all logs are emitted to console as structured and compact json logs. This follows the `12 factor Apps` approach to logging and is ideal for log targets to analyze the logs.

✅ **DO** treat logging and metrics as auxiliary concerns, meaning they should not impact functionality i.e. by causing bottlenecks or unhandled exceptions. While you would not wrap log call around try/catch block you need to apply defensive coding esp. around risk of null reference issues.

> ℹ Logging to console is one way to avoid bottlenecks and have agents scrape the logs and worry about shipping them. For deployments where file based logging is required, in those cases find an approach that does not create a synchronous bottleneck on logging to IO. For example with `Serilog`, `Serilog.Sinks.File` sink can be configured to be wrapped around `Serilog.Sinks.Async` to reduce the overhead of logging calls by delegating work to a background thread as files are prone to I/O bottlenecks.

Serilog Example

```json
{
  "Serilog": {
      {
        "Name": "Async",
        "Args": {
          "configure": [
            {
              "Name": "File",
              "Args": {
                "path": "Application.log",
                "rollingInterval": "Day",
                "rollOnFileSizeLimit": true,
                "retainedFileCountLimit": 5,
                "formatter": "Serilog.Formatting.Compact.CompactJsonFormatter, Serilog.Formatting.Compact"
              }
            }
          ]
        }
      }
    ]
  }
}
```

✅ **DO** bootstrap the logging and the application annotations (read by scrapping agents) in a way that ensures that at minimum logs/metrics are identifiable with what application sent the log, the level of the log, the source of the log (class/controller/action name etc.), the deployment stack (i.e. k8s namespace) and other information like application region that are applicable. Additional information such as request host name, accessed resource ids etc. can further enrich logs.

✅ **DO** tag logs that are not useful except in exception cases as `Debug` so that these by default are not shipped out to the sink. In the event of the exceptional need for these logs then the configuration can be updated to include `Debug` logs. Examples of these kind of logs are generated SQL queries from EF Core and transactional logs such as indicating the start of a job.

⛔ **DO NOT** ship logs directly to a log target. In the case of docker based deployments like k8s a side car agent is responsible for scrapping pod logs and ensuring that they get shipped out to the sink and any other heavy lifting like dealing with network issues, buffering etc.

> ℹ A twelve-factor app never concerns itself with routing or storage of its output stream. It should not attempt to write to or manage log files. Instead, each running process writes its event stream, un-buffered, to stdout.

⛔ **DO NOT** hard code any logger configuration. These values should also be set in the application configuration to allow for flexibility in updating this in production environments without having to create new releases.

⛔ **DO NOT** use highly unique values for metric tags and log context like GUID ids. This applies a strain on indexing of these logs and metrics and while tools in use may apply constraints on these or result in increased cost of usage. Instead use values you would likely applying bucketing of data on like request method type, response status code, exception type etc.

⛔ **DO NOT** use string interpolation with logs. Instead adopt the [message templates](https://messagetemplates.org/) approach of structured logging.

A couple of reasons

- Logs that are highly unique are a strain on log indexes for log targets

```csharp

_logger.LogInformation($"Deleting file: {job.FileContentId}");

// this creates unique logs for each file

```

- Logs can be searched based on the message template

```csharp

// IDEAL

_logger.LogInformation("Deleting file: {FileContentId}", job.FileContentId);



// this would allow searching by 'Deleting file: {FileContentId}'

```

- Again very useful for observing our logs downstream as with most systems like Datadog, Prometheus etch as searching by message template is more powerful and faster as opposed to substring searches.

# Tests

> An assumption that tests make use of xUnit is made here.

✅ **DO** write more tests. In particular areas that require tests at all times are

- Algorithms

- Intricate business logic

- Helpers and utilities

- Resolved bugs

> ℹ In addition to having more test coverage that helps with more confidence to change existing code and ensuring that previously discovered regressions do not occur again, tests are very good at identifying issues especially around coupling. Code that violates certain core principles that ensure a healthy and maintainable code base is very difficult to test, writing more tests allows us to see this up front.

✅ **DO** name mocks vs mock object instances accordingly. Mocks from `automock`, `new Mock<T>()` or `Mock.Of<T>` should have the suffix mock but not the object instances from `mock.Object` i.e userMock for the mock and user for the object.

> ℹ This distinction can go a long way in readability of tests.

✅ **DO** make use of the name sut for the `system under test`. This small detail shines particularly when the test is heavy in the arrange stage, it needs to be clear what the SUT is.

```csharp
var sut = autoMock.Create<SecurityProvider>();

var token = sut.CreateToken(new SecurityTokenRequest());

token.Should().NotBeNullOrWhiteSpace();
```

✅ **DO** consistently use a builder for `EF Core Data Contexts` for creating a test data context. Having on place to create the data context will make it easier to maintain this over time should you need to make a change to the data context for all tests and removes boiler plate code.

```csharp
    public static class InMemoryDataContextBuilder
    {
        public static SupportDataContext BuildSupportDataContext() {

            var options = new DbContextOptionsBuilder<SupportDataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            options.Freeze();

            return new SupportDataContext(options);
        }

        public static DataContext Build()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            options.Freeze();

            return new DataContext(options, new NullLoggerFactory());
        }

        public static DataContext Build(Func<(DbContextOptions<DataContext>, ILoggerFactory)> configure)
        {
            var (options,  loggerFactory) = configure();

            options ??= GetDefaultDbContextOptions();
            loggerFactory ??= new NullLoggerFactory();

            return new DataContext(options, loggerFactory);
        }

        private static DbContextOptions<DataContext> GetDefaultDbContextOptions()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            options.Freeze();

            return options;
        }
    }
```

✅ **DO** make use of test builders for objects that potentially would get created over and over in tests.

```csharp
// base implementation
    public abstract class Builder<T>
    {
        private readonly Dictionary<string, object> _properties = new();

        public abstract T Build();

        public static implicit operator T(Builder<T> builder) => builder.Build();

        public void Set<TProp>(Expression<Func<T, TProp>> action, TProp value)
            => _properties[((MemberExpression)action.Body).Member.Name] = value;

        public TProp Get<TProp>(Expression<Func<T, TProp>> action)
            => _properties.TryGetValue(((MemberExpression)action.Body).Member.Name, out var value)
                ? value as dynamic
                : default(TProp);
    }

// example implementation
    public class UserBuilder : Builder<User>
    {
        public UserBuilder WithId(Guid id)
        {
            Set(x => x.Id, id);
            return this;
        }

        public UserBuilder WithName(string name)
        {
            Set(x => x.Name, name);
            return this;
        }

        public override User Build() =>
            new User
            {
                Id = Get(x => x.Id),
                Name = Get(x => x.Name),
            };
    }

    public class A
    {
        public static UserBuilder User => new();
    }


    public class Test
    {
        public void Test1()
        {
            User user = A.User
                .WithName("John Doe")
                .WithId(Guid.NewGuid());
                ...
        }
    }
```

> ℹ Follow this principle for any object that gets created over and over in multiple tests, that should have a builder as one authoritative way to create it for tests.

🎃 **DO** be aware of a **GOTCHA** with working with the EF core in memory data context. This implementation chooses to enforce referential integrity for navigation properties. If you create an object that has a `non nullable` navigation property but leave this as null and then add it into the data context in your test, any attempt to read this back out will not return anything. All `non nullable` navigation properties will have to be `non null` as well for this to work. Quite the annoyance for tests but currently with no work around.

⛔ **DO** not use the xUnit's `MemberData` attribute for primitive types, only use this for complex types that cannot use `InlineData`. `InlineData` makes it easy to see the test and its test data easily, you lose this with a separate method for member data.

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

### Naming and structure

✅ **DO** name test projects in the format `[name of project under test].tests` ensuring that the suffix `tests` is always used. This makes it easy to identify test projects especially when you want to apply filters like in `Directory.Builds.props` or in build pipelines.

✅ **DO** name test files with same name as file being tested with suffix Tests i.e. `UtilsTests.cs`

✅ **DO** mirror the folder structure of what is being tested in tests - `/Services/Access/UserAccess.cs` -> `/Services.Tests/Access/UserAccessTests.cs`

✅ **DO** favor naming tests in the format `Given_Then_Should` or `Given_When_Then_Should`. Long test names are perfectly fine provided then give good insight into what the test is about.

> ℹ This is particularly important as it makes it easy to navigate and find tests. Another key reason is that test runners (xUnit, Resharper) etc. parallelize tests at a project level, so if you have a test project with a ton of tests that becomes the critical path and you miss out of faster test runs.

✅ **DO** place tests above any auxiliary methods in a test file. All helper methods should be at the bottom of tests.

⛔ **DO NOT** test multiple projects by adding all the tests in one project. The test projects ideally should mirror the project structure of what is being tested.

### Implementation

✅ **DO** use Fluent Assertions for assertions over xunit assertions. These are more readable, flexible and more powerful.

> The `XUnitToFluentAssertionsAnalyzer` offers Roslyn analysis rule enforcing this, so if you right xunit assertion the build would fail.
>
> # XFA001: Use FluentAssertions equivalent
>
> dotnet_diagnostic.XFA001.severity = error

✅ **DO** add generic test constructs such as builders and test data that can and should be reused in multiple test projects to a common shared project i.e. `Tests.Common`

✅ **DO** apply discipline within xUnit test projects by configuring the in built Roslyn analyzers that ship with the core package as you would with any other standards. Particularly with new projects configure this to be very strict from the onset and gradually tweak this as you go along. Below is an example of a very strict configuration for xUnit.

```editorconfig
[*.cs]
# xUnit1004: Test methods should not be skipped

dotnet_diagnostic.xUnit1004.severity = error



# xUnit1006: Theory methods should have parameters

dotnet_diagnostic.xUnit1006.severity = error



# xUnit1008: Test data attribute should only be used on a Theory

dotnet_diagnostic.xUnit1008.severity = error



# xUnit1013: Public method should be marked as test

dotnet_diagnostic.xUnit1013.severity = error



# xUnit1014: MemberData should use nameof operator for member name

dotnet_diagnostic.xUnit1014.severity = error



# xUnit1025: InlineData should be unique within the Theory it belongs to

dotnet_diagnostic.xUnit1025.severity = error



# xUnit1026: Theory methods should use all of their parameters

dotnet_diagnostic.xUnit1026.severity = error



# xUnit2000: Constants and literals should be the expected argument

dotnet_diagnostic.xUnit2000.severity = error



# xUnit2003: Do not use equality check to test for null value

dotnet_diagnostic.xUnit2003.severity = error



# xUnit2004: Do not use equality check to test for boolean conditions

dotnet_diagnostic.xUnit2004.severity = error



# xUnit2007: Do not use typeof expression to check the type

dotnet_diagnostic.xUnit2007.severity = error



# xUnit2008: Do not use boolean check to match on regular expressions

dotnet_diagnostic.xUnit2008.severity = error



# xUnit2009: Do not use boolean check to check for substrings

dotnet_diagnostic.xUnit2009.severity = error



# xUnit2010: Do not use boolean check to check for string equality

dotnet_diagnostic.xUnit2010.severity = error



# xUnit2012: Do not use Enumerable.Any() to check if a value exists in a collection

dotnet_diagnostic.xUnit2012.severity = error



# xUnit2011: Do not use empty collection check

dotnet_diagnostic.xUnit2011.severity = error



# xUnit2013: Do not use equality check to check for collection size.

dotnet_diagnostic.xUnit2013.severity = error



# xUnit2015: Do not use typeof expression to check the exception type

dotnet_diagnostic.xUnit2015.severity = error



# xUnit2017: Do not use Contains() to check if a value exists in a collection

dotnet_diagnostic.xUnit2017.severity = error



# xUnit2018: Do not compare an object's exact type to an abstract class or interface

dotnet_diagnostic.xUnit2018.severity = error



# xUnit2019: Do not use obsolete throws check to check for asynchronously thrown exception

dotnet_diagnostic.xUnit2019.severity = error



# XFA001: Use FluentAssertions equivalent

dotnet_diagnostic.XFA001.severity = error
```

✅ **DO** favor data driven tests where applicable over duplicated tests. This can be achieved with `Theories` using `InlineData` for compile time constants and `MemberData` for the rest.

```csharp
[Theory]

[InlineData("yes", true)]

[InlineData("no", false)]

public void Sample input, bool expected)

{

    ...

}



[Theory, MemberData(nameof(TestCases))]

public Sample(string fileName, string expectedExtension)

{

    ...

}



public static IEnumerable<object[]> TestCases => new[]

{

    // input, expected

    new object[] {"test.txt", ".txt"},

    ...

};
```

✅ **DO** make it easy to tell apart the `Arrange`, `Act` and `Assert` sections of your test and in particular to test what the system under test (`sut`) is.

✅ **DO** write tests that assert a single concept. While a single assert per test would be ideal, it is not realistic. Fluent assertions does have constructs in place to avoid situations where you have multiple related asserts that short circuit on first failure.

```csharp
[Fact]

public void Sample()

{

    var result = ...;



    // CLASSIC

    result.Id.Should().Be(id);

    result.Name.Should().Be(name);

    result.Value.Should().Be(value);



    // BETTER

    var expectedResult = ...;



    result.Should().BeEquivalentTo(expectedResult);

    // can omit properties

    result.Should().BeEquivalentTo(expectedResult, options => options.Excluding(x => x.Name));



    // ALTERNATIVE

    // use this approach when absolutely necessary!

    using (var scope = new AssertionScope())

    {

        result.Id.Should().Be(id);

        result.Name.Should().Be(name);

        result.Value.Should().Be(value);

    }

}

```

> ℹ This is also possible with collections

✅ **DO** use the most specific assertions, these give the most specific and useful failure messages as well.

```csharp

// BAD

result.Should.Be(true);



// GOOD

result.Should.BeTrue();



// BAD

actual.Any().Should().BeTrue();

// Expected True, but found False.



// GOOD

actual.Should().NotBeEmpty();

// Expected collection not to be empty.

```

More examples [here](https://fluentassertions.com/tips/)

> ℹ There are Roslyn analyzers that ship with the core package to help enforce this.

✅ **DO** inject a `NullLoggerFactory` into tests unless you are actually interested in asserting the logs, then in that case use consider `LoggerFactory` double.

✅ **DO** make use of xUnit fixtures for setups that can be shared by an entire test file (Class Fixtures) or multiple test files (Collection Fixtures). The example below is a class fixture that bootstraps `AutoMapper` for use within a single test file.

```csharp
    public class AutoMapperFixture<TProfile> where TProfile : Profile, new()
    {
        public AutoMapperFixture() =>
            Mapper = new MapperConfiguration(cfg => cfg.AddProfile<TProfile>())
                .CreateMapper();

        public IMapper Mapper { get; }
    }

    public class SampleTests : IClassFixture<AutoMapperFixture<MappingProfile>>
    {
        private readonly IMapper _mapper;

        public SampleTests(AutoMapperFixture<MappingProfile> fixture) => _mapper = fixture.Mapper;
    }
```

The following
⛔ **DO NOT** mix business logic with code that has direct access to infrastructure for example sending an email via smtp, reading/writing a file, calling into system constructs such `DateTime.Now`, `Task.Delay` etc.

> ℹ A core principle with tests is that they should have full control over the `sut which becomes problematic when you violate this rule. Infrastructure concerns should be implemented as adaptors and injected into code that requires it.

```csharp

// PORT

public interface IDelayService

{

    Task Delay(TimeSpan delayDuration, Action continueWith);

}



// ADAPTOR

internal class DelayService : IDelayService

{

    public virtual async Task Delay(TimeSpan delayDuration, Action continueWith)

    {

        await Task.Run(async () => { await Task.Delay(delayDuration); })

            .ContinueWith(_ => continueWith())

            .ConfigureAwait(false);

    }

}



// TEST STUB

internal class DelayServiceStub : DelayService

{

    public AutoResetEvent DelayComplete = new AutoResetEvent(false);



    public override async Task Delay(TimeSpan delayDuration, Action continueWith)

    {

        await base.Delay(TimeSpan.Zero, continueWith);

        DelayComplete.Set();

    }

}

```

⛔ **DO NOT** have magic values in tests. Simple approaches like inlining variables to have name can go a long way in test readability.

```csharp

// BAD - why is this particular value of significance

result.Count.Should.Be(24);

```

⛔ **DO NOT** write tests with a multiple responsibilities, instead a test should have a single focus. Multiple unrelated assertions are a red flag.

⛔ **DO NOT** mock the `SUT`. A key thing with the tests is to trust what is done in the act phase, which becomes hard when the `SUT` is being mocked as well.

⛔ **DO NOT** have conditional logic in tests. Rather make data driven tests with theories or separate tests even.

### Mocking

✅ **DO** use moq to mock necessary dependencies within test.

✅ **DO** consider when to use `Mocks` vs `TestDoubles` very carefully. Mocks should be a natural first choice, using doubles in cases where you cannot mock such as when dealing with library concrete classes, abstract classes etc.

✅ **DO** use `Mock.Of<>` when no setup or assertions are required, over `new Mock<>`+ `mock.object`. Example:

```csharp
// OK

var mock = new Mock<IDependency>();

var sut = new Sample(mock.Object);


// BETTER, more succinct

var sut = new Sample(Mock.Of<IDependency>());
```

# Configuration

✅ **DO** validate app configuration on startup. Consider use of FluentValidation for this. This will help you fail fast with regards to configuration immediately on a new deployment as opposed to hours/days later when an action that requires the configuration finally fires.

> ℹ FluentValidation has great support out of the box for writing unit tests on validators, make sure to take advantage of this.

🛑 **DO** avoid reading configuration into a pre initialized object. Creating an options class and hydrating it could lead to a situation were if the section is missing it will proceed silently, you will have an object with defaults for the properties and the app may not fail earlier or at all (by inconsistently handling cases with viable yet invalid config).

```csharp
var appConfiguration = new ApplicationConfiguration();

configuration.GetSection(configurationName).Bind(appConfiguration);


// BETTER

var appConfiguration = configuration.GetSection(configurationName).Get<ApplicationConfiguration>();


// now we would get a null options if section is missing and we can handle that case.

```

# Language Features

✅ **DO** favor types that carry context over context in the naming or otherwise assumed context. i.e. Favor use of the `TimeSpan` type over a numerical value with a suffix in the name such `CacheExpiryDays`.

> ℹ The `TimeSpan` type in particular is handled well in dotnet, for instance you can use this with configuration and set your string config as `'00:00:00'` without having to worry about type conversions on reading config to a numeric type.

✅ **DO** consider use Enum Flags together with the relevant operator and `Enum.HasFlag` where possible over entities with multiple properties indicating Boolean states particularly when these are stored.

```csharp
[Flags]

public enum UserFlags

{

    None = 0,

    SystemAccount = 1,

    Locked = 2,

    Disabled = 4,

    ...

}
```

✅ **DO** consider adding imports into the namespace when you have multiple imports from current project. This will clean up the imports as they will no longer need to be fully qualified imports.

✅ **DO** make use of async overloads where available i.e. `ToListAsync()` over `ToList()`.

✅ **DO** design code for async support upfront for Services/Usecases. Adding async support for a service method that has been reused in many places because there is now an await can be quite the refactor.

✅ **DO** favor `Enumerable.Empty<T>` over new `new List<T>` and `Array.Empty<T>` over `new T[] {}`. The static empty will return a compile time constant as opposed to making a new empty allocation. This can be particularly troublesome when done in loops at scale and will put pressure on the garbage collector. This is also intent revealing and makes it clear that the case is an empty list with no intent to add elements after

```csharp
if (skip) return new List<T>();


if (skip) return Enumerable.Empty<T>();
```

✅ **DO** favor returning empty collections over nulls particularly for data that crosses boundaries. Operation like iteration over empty collection are safe and do not lead to exceptions as would null objects.

✅ **DO** favor use of file scoped namespaces over block scoped namespace particularly to benefit from less indentation.

```csharp
// ditch this
namespace SampleNamespace
{
    public class SampleClass
    {

    }
}

// for this
namespace SampleNamespace;

public class SampleClass
{

}

```

✅ **DO** make types static accordingly if there is no need for allocations especially for things like utilities. This is also applicable to anonymous methods in C# 9 and forward and in particular makes it explicit that a lambda must not capture variables (should not be a closure).

✅ **DO** add a default None (semantically an unknown or invalid) of 0 to all Enums. This makes transmitting data over HTTP safer as unset Enum props will not default to a valid value by mistake.

```csharp
public enum SampleEnum

{

    None = 0,

    ...

}

```

✅ **DO** favor using declarations over blocked scoped usings thereby reducing indentation making code more readable.

```csharp
// ditch this
        await using (var conn = new SqlConnection())
        {
            await conn.OpenAsync();
            await using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = ...;
                var result = await cmd.ExecuteScalarAsync();
            }
        }

// for this
        await using var conn = new SqlConnection();
        await conn.OpenAsync();
        await using var cmd = conn.CreateCommand();
        cmd.CommandText = ...;
        var result = await cmd.ExecuteScalarAsync();

```

⛔ **DO NOT** abuse null safety checks in a way that breaks the null semantics of a type in the interest of defensive coding. This can create confusion about what can be null and cascade from there as other developers extend the code.

```csharp
var name = sample?.child?.child?.name;

// if any of these properties cannot be null then the defensive coding should not be applied.
```

⛔ **DO NOT** name async methods with an Async suffix, i.e. `GetDataAsync`.

> ℹ Unless you are designing a library and adding async support side by side to the non async (method overloads cannot differ only by return type) that is not warranted. In the CLR that was the exact use case for Microsoft and why they added that suffix leading to its adoption as a standard by many. However given that most of us are either writing support on methods for one of the two but not both at the same time this rule should have been the exception really

⛔ **DO NOT** use `async void`. void returning async methods have a specific purpose: to make asynchronous event handlers possible. Async void methods have different error-handling semantics. When an exception is thrown out of an async Task or async `Task<T>` method, that exception is captured and placed on the Task object. With async void methods, there is no Task object, so any exceptions thrown out of an async void method will be raised directly on the `SynchronizationContext` that was active when the async void method started.

✅ **DO** make use of dictionaries and lookups in scenarios that call for them. In cases where data is loaded into a collection (list/array) then enumerated for single/first or a group by some key like an id, that would best be a Dictionary for `one key → one value` or Lookup `one key → multiple values` and would give better performance at scale.

```csharp
// Before

        var entities = await DataContext.Entity
            .AsNoTracking()
            .Where(a => a.Special)
            .ToListAsync();

        // later usage in loop
        var targetName = entities.FirstOrDefault(x => x.Id == targetId)?.Name;

// Dictionary

        Dictionary<Guid, string> entities = await DataContext.Entity
            .AsNoTracking()
            .Where(a => a.Special)
            .ToDictionaryAsync(x => x.Id, x => x.Name);

        entities.TryGetValue(targetId, out var targetName);

// Lookup

        // assuming multiple entities can have the same id
        ILookup<Guid, string> entities = DataContext.Entity
            .AsNoTracking()
            .Where(a => a.Special)
            .ToLookup(x => x.Id, x => x.Name);

        var targetNames = entities[targetId].ToArray();
```

✅ **DO** favor the modern ways to test for nullability in C#. `is` and `is not` check for true nulls ignoring any operator overrides. By default the modern checks give a compiler error when value is not nullable, the legacy give a warning. This off course can be configured with Roslyn as desired.

```csharp
// legacy

    if (item == null) { }
    if (item != null) { }


// modern

    if (item is null) { }
    if (item is not null) {  }
```

✅ **DO** simplify assignment on null variables with the single assignment `target-typed new` operator `?==`. This is more succinct and intent is easier to see on reading single line.

```csharp
// legacy

    if (request == null)
    {
        request = new Request
        {
            Special = true
        };
    }

// modern

    request ??= new Request
    {
        Special = true
    };

```

✅ **DO** split LINQ where clauses to make code more readable.

```csharp
// before

    var result = await DataContext.Samples
        .AsNoTracking()
        .Where(x => !x.Deleted && x.Id == targetId && x.Special)
        .ToListAsync(cancellationToken);

// after

    var result = await DataContext.Samples
        .AsNoTracking()
        .Where(x => !x.Deleted)
        .Where(x => x.Id == targetId)
        .Where(x => x.Special)
        .ToListAsync(cancellationToken);
```

✅ **DO** split LINQ methods onto multiple lines for readability.

```csharp

// before
    var customFields = await DataContext.Samples.AsNoTracking().Where(x => !x.Deleted).Where(x => x.Id == targetId).Where(x => x.Special).ToListAsync(cancellationToken);

// after

    var result = await DataContext.Samples
        .AsNoTracking()
        .Where(x => !x.Deleted)
        .Where(x => x.Id == targetId)
        .Where(x => x.Special)
        .ToListAsync(cancellationToken);
```

✅ **DO** favor the modern `swith expressions` over `switch statements`. This makes for more succinct code that is easier to read and takes a functional approach.

```csharp
// legacy

      string? recommendation;
      switch (state)
      {
          case TrafficLight.red:
              recommendation = "Stop";
              break;
          case TrafficLight.green:
              recommendation = "Go";
              break;
          case TrafficLight.amber:
              recommendation = "Procced with caution";
              break;
          default:
              recommendation = "TrafficLight malfunction: proceed with caution";
              break;
      }

// modern

            string? recommendation = state switch
            {
                TrafficLight.red => "Stop",
                TrafficLight.green => "Go",
                TrafficLight.amber => "Procced with caution",
                _ => "TrafficLight malfunction: proceed with caution",
            };
```

✅ **DO** favor expression bodies for methods, properties and ctors for single expressions for a more succinct syntax.

```csharp
// legacy

    private Task<string> GetSample(string key)
    {
        return sampleService.GetSample(key);
    }

    protected async Task<List<SampleDto>> GetSample(Guid id)
    {
        return await DataContext.Sample
            .AsNoTracking()
            .Where(x => x.Id == id)
            .ToListAsync();
    }

// modern

    private Task<string> GetSample(string key) => sampleService.TranslateAsync(keyword);

    protected async Task<List<SampleDto>> GetSample(Guid id) =>
        await DataContext.Sample
            .AsNoTracking()
            .Where(x => x.Id == id)
            .ToListAsync();
```

✅ **DO** prefer pure functions. Given the same input, the same data should always be retrieved. Avoid mutations or any other side effects in functions. The effect will be functions that are easy to reason about, easy to consume with no assumptions and certainly easier to test as well.

# Web APIs

✅ **DO** name controllers with a Controller suffix and use plural names for the RESTful APIs, e.g. UsersController instead of UserController.

✅ **DO** inject a cancellation token from the controller action and drill this down to pass to relevant calls that are cancellable. If an async call is cancelled no additional CPU/Memory needs to be used and pending processes can be cancelled.

✅ **DO** make use of the `FromServices` attribute to localize dependency injection in controllers. This is most usefull when you have a bloated ctor with dependencies that are only used by all controller actions. This removes injection bloat from the ctor and makes it clear where dependencies are used.

```csharp
// before

    private readonly IDependency1 _dependency1;
    private readonly IDependency2 _dependency2;

    public SampleContoroller(IDependency1 dependency1, IDependency2 dependency2)
    {
        _dependency1_ = dependency1;
        _dependency2_ = dependency2;
    }

    [HttpGet("one")]
    public Task<SampleDto> One([FromQuery] Request request)
    {
        return _dependency1.Sample(request);
    }

    [HttpGet("two")]
    public Task<SampleDto> Two([FromQuery] Request request)
    {
        return _dependency2.Sample(request);
    }

// after

    [HttpGet("one")]
    public Task<SampleDto> One([FromQuery] Request request,
        [FromServices] IDependency1 dependency1) =>
        dependency1.Sample(request);

    [HttpGet("two")]
    public Task<SampleDto> Two([FromQuery] Request request,
        [FromServices] IDependency2 dependency2) =>
        dependency2.Sample(request);
```

```csharp
[HttpGet("sample")]
    public Task<SampleDto> GetSample([FromQuery] SampleRequest request,
        [FromServices] ISampleService service,
        CancellationToken cancellationToken = default) =>
        service.Sample(request);


// Sample service
public Task<SampleDto> GetSample([FromQuery] SampleRequest request,
           CancellationToken cancellationToken)
        {
            ....
            var result = await DataContext.Samples()
                .AsNoTracking()
                .ToListAsync(cancellationToken);
        }
```

> ℹ️Know when you have passed a point of no cancellation to ensure atomic actions

✅ **DO** use the type route constraint for actions. Among many the following examples shows a benefit with endpoint resolution.

```csharp

[ApiController]

[Route("api/[controller]")]

public class SampleController : ControllerBase

{

    [Route("{id}")]

    public string Sample1(int id)

    {

        ...

    }



    [Route("{name}")]

    public string Sample2(string name)

    {

        ...

    }

}

```

Calling this with `api/sample/10` and `api/sample/sample` will both give the `AmbiguousMatchException`. This can be resolved as:

```csharp
[ApiController]

[Route("api/[controller]")]

public class SampleController : ControllerBase

{

    [Route("{id:int}")]

    public string Sample1(int id)

    {

        ...

    }



    [Route("{name:string}")]

    public string Sample2(string name)

    {

        ...

    }

}

```

> ⚠ Route constraints have features that can make them tempting to use for input validation such as ranges and regex. Don't use constraints for input validation. If constraints are used for input validation, invalid input results in a 404 Not Found response. Invalid input should produce a 400 Bad Request with an appropriate error message. Route constraints are used to disambiguate similar routes, not to validate the inputs for a particular route. When creating params from the url, `required` is a good exception to this rule as this should be useful in disambiguating routes.

# Code Analysis

⛔ **DO NOT** suppress Roslyn analyzer rules, these are in place for a reason. Do consult other developers before suppressing rules, whether for specific code lines, files or entire solution to ensure that any changes that are related to standards have a team consensus.

# GOTCHAS

✨ Apply caution when changing code surrounded by debugger directives. Ideally building with debug or release config should not make a difference to the build succeeding. However with preprocessor directives if you change code that is only available for release for instance, it could end up broken and you would not pick it up on your dev machine as you are building in debug. This would off course blow up later when you are making release builds. Be mindful of this scenario.

> ⚠ Historically visual studio has not been particularly smart with these scenarios, it could suggest for instance that you remove an unused using that is in fact used in a preprocessor directive for a mode you are currently not running in.

✨ Apply caution with `CopyToOutputDirectory` option `Always` as this will break incremental builds and cause given projects to always build even when they have not been updated. Do make use of the option `PreserveNewest`. In addition this option means less IO particularly for large files which also speeds up builds.

> ℹ️ Such cause is not obvious and an investigation must be conducted to find the glitch. To investigate, in the *Visual Studio > Options > Projects and Solutions > SDK-Style Projects*, set the **_Up to Date Checks_** value from *None* to *Minimal*. Now in the Output window you will see logs that indicate when incremental builds are not working as expected and why