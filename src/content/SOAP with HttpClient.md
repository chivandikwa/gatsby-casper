---
layout: post
title: Consuming SOAP Services with the HttpClient
image: img/unsplash/aurelia-dubois-6J0MUsmS4fQ-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-03-09T10:00:00.000Z
tags: [SOAP, Postman, HTTP]
draft: false
excerpt: Consuming Legacy SOAP Services with the HttpClient
---

Photo by <a href="https://unsplash.com/@aureliaduboisphotographie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Aurélia Dubois</a> on <a href="https://unsplash.com/photos/6J0MUsmS4fQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Consuming Legacy SOAP Services with the HttpClient in .NET

In this article, we will discuss how to consume legacy SOAP services using the HttpClient in .NET. The HttpClient class is used to send HTTP requests to a web server and receive its responses. We will see how to use it to send SOAP requests to a SOAP service and process its responses.

# Introduction to SOAP Services

SOAP (Simple Object Access Protocol) is a messaging protocol used to exchange structured data between applications. It relies on XML to provide a common message format that can be understood by different systems, regardless of their programming languages and platforms.

In recent years, SOAP has been superseded by more modern protocols such as REST and gRPC. However, there are still many legacy SOAP services that are widely used and need to be integrated into modern applications.

In this blog post, I will show you how to consume a legacy SOAP service using the HttpClient in .NET. We will use a SOAP service that converts a given number to words as an example.

# Overview of our example

Our SOAP service, called NumberToWords, takes an integer as input and returns its English representation in words. For example, if the input is 500, the service will return "five hundred".

> [NumberConversion](https://www.dataaccess.com/webservicesserver/NumberConversion.wso) has a service, [NumberToWords](https://www.dataaccess.com/webservicesserver/NumberConversion.wso?op=NumberToWords), which returns the word corresponding to the positive number passed as parameter limited to quadrillions. Due to its simplicity we will use it in this example

To call this service, we need to send an XML request message in the SOAP format to the service endpoint. The service will then return an XML response message in the SOAP format containing the result.

Here is an example input:

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
      <ubiNum>500</ubiNum>
    </NumberToWords>
  </soap:Body>
</soap:Envelope>
```

and matching output:

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <m:NumberToWordsResponse xmlns:m="http://www.dataaccess.com/webservicesserver/">
            <m:NumberToWordsResult>five hundred </m:NumberToWordsResult>
        </m:NumberToWordsResponse>
    </soap:Body>
</soap:Envelope>
```

# Consuming SOAP Services with HttpClient

To consume a SOAP service with the `HttpClient`, we need to create an XML request message that follows the SOAP protocol and send it to the SOAP service using an HTTP POST request. The response message is also an XML message that follows the SOAP protocol.

To create the SOAP request message, we need to create an XML document that follows the SOAP protocol and contains the SOAP envelope, header, and body. The body of the SOAP message contains the actual request data that is sent to the service.

We can use the `HttpClient` class to send the SOAP request message to the service using an HTTP POST request. To process the response message, we need to deserialize the XML response message into a .NET object. We can use the XmlSerializer class to deserialize the XML message into a .NET object

# Sample implementation

The code provided in this blog post is written in C#. Let us start by looking at the classes involved in consuming the NumberToWords service.

```csharp
public class NumberToWordsRequestBody
{
    [XmlElement(Namespace = Constants.NumberConversionNamespace, ElementName = "NumberToWords")]
    public NumberToWordsRequest Request { get; set; }
}

public class NumberToWordsRequest
{
    [XmlElement(ElementName = "ubiNum")]
    public int Input { get; set; }
}


public class NumberToWordsResponseBody
{
    [XmlElement(ElementName = "NumberToWordsResponse", Namespace = Constants.NumberConversionNamespace)]
    public NumberToWordsResponse Response { get; set; }
}

public class NumberToWordsResponse
{
    [XmlElement(ElementName = "NumberToWordsResult")]
    public string Result { get; set; }
}

[XmlType(Namespace = Constants.EnvelopeNamespace, TypeName = "Envelope")]
public class Envelope<T>
{
    public T Body { get; set; }
}
```

The `NumberToWordsRequestBody` and `NumberToWordsRequest` classes represent the input message. The `NumberToWordsResponseBody` and `NumberToWordsResponse` classes represent the output message. The `Envelope<T>` class is a generic class used to wrap the input and output messages.

Next, let us look at a sample client, `NumberConversionClient`, which is responsible for making the HTTP request to the NumberToWords service.

```csharp
public class NumberConversionClient : BaseClient
{
    private const string ApiPath = "NumberConversion.wso";

    public NumberConversionClient(IHttpClientFactory httpClientFactory, ILogger<NumberConversionClient> logger)
        : base(httpClientFactory, logger)
    {
    }

    public async Task<string> ConvertNumberToWords(int number, CancellationToken cancellationToken = default)
    {
        var message = new Envelope<NumberToWordsRequestBody>
        {
            Body = new NumberToWordsRequestBody
            {
                Request = new NumberToWordsRequest
                {
                    Input = number
                }
            }
        };

        var result =
            await Post<Envelope<NumberToWordsRequestBody>, Envelope<NumberToWordsResponseBody>>(ApiPath, message,
                cancellationToken);

        return result.Body.Response.Result;
    }
}
```


```csharp
public class BaseClient
{
    private readonly ILogger _logger;

    protected readonly HttpClient HttpClient;

    public BaseClient(IHttpClientFactory clientFactory, ILogger logger)
    {
        HttpClient = clientFactory.CreateClient(nameof(BaseClient));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    protected async Task<TResponse> Post<TRequest, TResponse>(string path, TRequest body,
        CancellationToken cancellationToken = default) =>
        await DeserializeResponse<TResponse>(
            await GetApiResponse(HttpMethod.Post, path, body: body, cancellationToken: cancellationToken),
            path,
            cancellationToken);

    protected virtual async Task<HttpResponseMessage> GetApiResponse<TRequest>(HttpMethod method, string path,
        TRequest body = default, CancellationToken cancellationToken = default)
    {
        using var scope = _logger.BeginScope(new Dictionary<string, object>
        {
            ["path"] = path
        });

        var httpRequest = new HttpRequestMessage(method, path);

        if (body != null)
            httpRequest.Content =
                new StringContent(body.Serialize(), Encoding.UTF8, Constants.Format);

        return await HttpClient.SendAsync(httpRequest, cancellationToken);
    }

    protected virtual async Task<TResponse> DeserializeResponse<TResponse>(HttpResponseMessage httpResponse,
        string path, CancellationToken cancellationToken)
    {
        var statusCode = (int)httpResponse.StatusCode;

        using var scope = _logger.BeginScope(new Dictionary<string, object>
        {
            [nameof(statusCode)] = statusCode,
            ["responseType"] = typeof(TResponse).FullName,
        });

        if (httpResponse.IsSuccessStatusCode)
        {
            try
            {
                var xml = HttpUtility.HtmlDecode(await httpResponse.Content.ReadAsStringAsync(cancellationToken));

                return xml.Deserialize<TResponse>();
            }
            catch (Exception exception)
            {
                const string deserializeFailureMessage = "Could not deserialize the response input stream";
                _logger.LogError(deserializeFailureMessage);
                throw new DomainException($"{deserializeFailureMessage} {typeof(TResponse).FullName}", exception);
            }
        }

        var content = await httpResponse.Content.ReadAsStringAsync(cancellationToken);
        _logger.LogError(
            "SOAP responses should always return OK status code with details. Received {statusCode} {content}",
            statusCode, content);

        throw new DomainException("SOAP responses should always return OK status code with details");
    }
}
```

The code relies on some extensions. `SoapExtensions` is a static class that contains extension methods to help with the serialization and deserialization of SOAP requests and responses. It consists of the following methods:

- `ToXDocument`: This method takes an object of type `T` and returns an instance of `XDocument`. The method first creates a new instance of `XDocument` with the necessary XML declaration and then uses an `XmlSerializer` to serialize the input object into an XML document. If any errors occur during serialization, a `DomainException` is thrown.
- `Serialize`: This method takes an object of type `T` and returns a string representing the serialized XML document. It simply calls the `ToXDocument` method and returns the resulting `XDocument` as a string.
- `Deserialize`: This method takes a string representing an XML document and deserializes it into an object of type `T`. The method first creates an `XmlSerializer` instance and then uses it to deserialize the input XML string into an object of type `T`. If any errors occur during deserialization, a `DomainException` is thrown.

By defining these extension methods, we can easily serialize and deserialize SOAP requests and responses using simple method calls.

For completeness here are the constants referenced in the other code snippets.

```csharp
public static class Constants
{
    public const string TextXmlContentType = "text/xml; charset=utf-8";
    public const string Format = "text/xml";
    public const string EnvelopeNamespace = "http://schemas.xmlsoap.org/soap/envelope/";

    public const string Version = "1.0";
    public const string Standalone = "1.0";
    public const string Encoding = "1.0";

    public const string NumberConversionNamespace = "http://www.dataaccess.com/webservicesserver/";
}
```

# Testing our sample

Let's write an integration test for the client that we have just created. First, let's introduce some configuration options.

```csharp
public class NumberConversionOptions
{
    public const string Key = "NumberConversion";

    public Uri BaseAddress { get; set; }
    public TimeSpan RequestTimeOut { get; set; }
}

public class NumberConversionOptionsValidator : AbstractValidator<NumberConversionOptions>
{
    public NumberConversionOptionsValidator()
    {
        RuleFor(m => m.BaseAddress)
            .Must(x => x.IsAbsoluteUri && x.Scheme == Uri.UriSchemeHttps);
    }
}

public static class NumberConversionOptionsValidatorExtensions
{
    public static void ValidateAndThrow(this NumberConversionOptions x)
        => new NumberConversionOptionsValidator().ValidateAndThrow(x);
}
```

The `NumberConversionOptions` class defines the configuration options for the SOAP service. It has two properties, `BaseAddress` and `RequestTimeOut`. The `BaseAddress` property is the base URI for the service, while the `RequestTimeOut` property specifies the timeout for the HTTP request.

The `NumberConversionOptionsValidator` class is used to validate the configuration options specified in the `NumberConversionOptions` class. It uses the `FluentValidation` library to ensure that the BaseAddress property is an absolute HTTPS URI.

The `NumberConversionOptionsValidatorExtensions` class provides an extension method that allows us to easily validate an instance of the `NumberConversionOptions` class using the `ValidateAndThrow` method. If the options are invalid, an exception is thrown.

Our configuration can look as follows in JSON:

```json
{
  "NumberConversion": {
    "BaseAddress": "https://www.dataaccess.com/webservicesserver/",
    "RequestTimeOut": "00:01:00"
  }
}
```

Next, let us add an extension for bootstrapping the client into a service collection.

```csharp
public static class NumberConversionExtensions
{
    public static IServiceCollection AddHttpClient(this IServiceCollection services,
        IConfigurationSection config)
    {
        if (config == null)
            throw new ArgumentNullException(nameof(config));

        services.Configure<NumberConversionOptions>(config);

        var options = config.Get<NumberConversionOptions>();

        options.ValidateAndThrow();

        services.AddHttpClient(nameof(BaseClient), (_, client) =>
        {
            client.BaseAddress = options!.BaseAddress;
            client.Timeout = options.RequestTimeOut;
            client.DefaultRequestHeaders.Add("Accept", Constants.TextXmlContentType);
        });

        services.AddTransient<NumberConversionClient>();

        return services;
    }
}
```

The `NumberConversionExtensions` class provides an extension method to bootstrap the `NumberConversionClient`. The `AddHttpClient` method takes an `IServiceCollection` and an `IConfigurationSection` as parameters. It configures an instance of `NumberConversionOptions` and registers it with the service collection.

Next, the method validates and throws an exception on invalid options, using the validator we created earlier with `FluentValidation`. Then it creates and configures an instance of `HttpClient` with the base address and timeout values provided in `NumberConversionOptions`. Finally, it registers an instance of `NumberConversionClient` with the service collection, which allows it to be used in the application.

Before we can write integration tests, we need to create a fixture. A fixture is a reusable object that contains test data, configuration settings, and any other objects required by the tests. Fixtures can help reduce code duplication and make tests easier to read and maintain.

In our case, we'll create a fixture that sets up the `HttpClient` and other required dependencies, such as the `NumberConversionOptions`. We'll use the `AutoMocker` library to help us create and inject these dependencies.

```csharp
[CollectionDefinition(nameof(NumberConversionCollectionFixture))]
public class NumberConversionCollectionFixture : ICollectionFixture<NumberConversionFixture>
{
}

public class NumberConversionFixture : IAsyncLifetime
{
    public Task InitializeAsync()
    {
        var configSection = GetConfigurationSection(out var configuration);

        var (httpClientFactory, options) = CreateHttpClient(configSection);

        AutoMocker = new AutoMocker();
        AutoMocker.Use(httpClientFactory);
        AutoMocker.Use(options);
        AutoMocker.Use(configuration);

        return Task.CompletedTask;
    }

    private static IConfigurationSection GetConfigurationSection(out NumberConversionOptions configuration)
    {
        var configSection =
            TestConfigurationExtensions.GetConfiguration<NumberConversionFixture>()
                .GetSection(NumberConversionOptions.Key);
        configuration = configSection.Get<NumberConversionOptions>();

        return configSection;
    }

    public Task DisposeAsync() => Task.CompletedTask;

    public AutoMocker AutoMocker { get; set; }

    private static (IHttpClientFactory, IOptions<NumberConversionOptions>) CreateHttpClient(
        IConfigurationSection configSection)
    {
        var serviceCollection = new ServiceCollection();
        serviceCollection.AddHttpClient(configSection);

        var provider = serviceCollection.BuildServiceProvider();

        return (provider.GetService<IHttpClientFactory>(),
            provider.GetService<IOptions<NumberConversionOptions>>());
    }
}
```

This code block defines two classes that are used to initialize and dispose of the dependencies required for testing `NumberConversionClient`.

`NumberConversionCollectionFixture` is a collection fixture that provides the context for the tests. This fixture is used to set up the `HttpClient` and the dependencies for `NumberConversionClient`. The `NumberConversionFixture` implements `IAsyncLifetime`, which provides the methods for setting up and tearing down the dependencies.

To ensure that our SOAP service client works as expected, we need to write integration tests that will verify the client's behaviour. For this, we'll use xUnit.net as our test framework.

```csharp
[Collection(nameof(NumberConversionCollectionFixture))]
[Trait("TestCategory", TestCategories.Integration)]
public class NumberConversionClientTests
{
    private readonly NumberConversionFixture _fixture;

    public NumberConversionClientTests(NumberConversionFixture fixture) => _fixture = fixture;

    [Fact]
    public async Task GivenValidInput_ThenConvertNumberToWords_ShouldReturnInWords()
    {
        var sut = _fixture.AutoMocker.CreateInstance<NumberConversionClient>();

        var result = await sut.ConvertNumberToWords(500);

        const string expected = "five hundred ";

        result.Should().NotBeNullOrEmpty();
        result.Should().Be(expected);
    }
}
```

First, we created a test class called `NumberConversionClientTests` and marked it with the `[Collection]` attribute. This attribute is used to indicate that the tests in this class require a shared resource, in our case the `NumberConversionFixture`. This fixture will set up the required infrastructure to create an instance of the `NumberConversionClient` class.

Next, we added a test method called `GivenValidInput_ThenConvertNumberToWords_ShouldReturnInWords` that will test our SOAP client's ability to convert a number to words. In this method, we'll create an instance of the `NumberConversionClient` class using the `AutoMocker` instance provided by the fixture. We'll then call the `ConvertNumberToWords` method with a valid input value of `500` and verify that the result is `five hundred` using the `FluentAssertions` library.

Running this integration test will ensure that our SOAP service client is working as expected and can be used in our application with confidence.

# Conclusion

In this article, we discussed how to consume legacy SOAP services using the `HttpClient` in .NET. We saw how to create the SOAP request message and send it to the `SOAP` service using an HTTP POST request. We also saw how to deserialize the XML response message into a .NET object.

By using the `HttpClient` class, we could easily integrate with SOAP services in .NET and process their responses. While SOAP services are being phased out in favour of RESTful services, there are still many legacy systems that use SOAP services, and it is important to know how to integrate with them using modern tools and technologies.

# Bonus Section - Working with CData

CDATA (short for Character Data) is a way to include unescaped character data, including markup characters such as `<`, `>`, and `&`, within an XML document. CDATA sections begin with the string `<![CDATA[ and end with ]]>`. Within a CDATA section, characters are not parsed as markup, but are instead treated as normal character data.

Using CDATA sections can be useful when including text that contains reserved characters or markup that should be preserved as-is, without being parsed as XML. In the context of SOAP web services, CDATA can be used to include XML fragments in messages without causing parsing errors or losing information.

```
    public class SampleObject
    {
        [XmlElement(ElementName = "CDataSection")]
        public XmlCDataSection Transaction
        {
            get
            {
                var xDocument = SampleNestedObjectInternal.ToXDocument();
                xDocument.RemoveNamespaceAttributes();

                return new XmlDocument().CreateCDataSection(xDocument.ToString());
            }
            set => _ = value; // Without an explicit setter the serializer ignores this
        }

        [XmlIgnore]
        public SampleNestedObject SampleNestedObjectInternal { get; set; }
    }

    public class SampleNestedObject
    {
        [XmlElement(ElementName = "Name")]
        public string Name { get; set; }
    }
```

This code shows an example of how to serialize an object to XML and include a property that contains a CDATA section. In this case, the object being serialized is `SampleObject`, which contains a nested object of type `SampleNestedObject`. This code can be useful when working with SOAP services that expect CDATA sections in their XML payloads. The `Transaction` field in the `SampleObject` is required to be CDATA and to achieve this we create a property for the SampleNestedObject with the `XmlIgnore` attribute, then a separate utility that does the bidding to CDATA

If we were to serialize this, we would get the following xml

```xml
<SampleObject xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <CDataSection><![CDATA[<SampleNestedObject xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Name>Dummy</Name>
  </SampleNestedObject>]]></CDataSection>
</SampleObject>

```

Notice that we used the extension `RemoveNamespaceAttributes`, to avoid getting an empty namespace sections on the CData section, specifically getting back the following:

```xml
<SampleObject xmlns:xsi=" http:// www.w3.org/ 2001/ XMLSchema-instance"
    xmlns:xsd=" http:// www.w3.org/ 2001/ XMLSchema"
    xmlns=" http:// schemas.xmlsoap.org/ soap/ envelope/">
    <CDataSection><![CDATA[<SampleNestedObject>
    <Name>Dummy</Name>
  </SampleNestedObject>]]></CDataSection>
</SampleObject>
```

This uses the following extension method:

```csharp
    public static void RemoveNamespaceAttributes(this XDocument xDocument)
    {
        xDocument.Descendants()
            .Attributes()
            .Where(x => x.IsNamespaceDeclaration)
            .Remove();

        foreach (var elem in xDocument.Descendants())
            elem.Name = elem.Name.LocalName;
    }
```

The method works by using LINQ to iterate over all elements in the document, removing the namespace attributes, and then setting the element name to only the local name (i.e., without the namespace). This essentially flattens the document, removing all references to namespaces.

> Note that removing namespace attributes can have unintended consequences, such as removing the ability to distinguish between two elements with the same local name in different namespaces. Therefore, this method should be used with caution and only when necessary.
