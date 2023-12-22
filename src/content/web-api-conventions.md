---
layout: post
title: Web API Conventions
image: img/unsplash/brian-mcgowan-LObpG0ku8VM-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-05-12T19:00:00.000Z
tags: [conventions, web api]
draft: false
excerpt: Standardize API definitions in ASP.NET
---

Photo by <a href="https://unsplash.com/@sushioutlaw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Brian McGowan</a> on <a href="https://unsplash.com/photos/LObpG0ku8VM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# ASP.NET Core Web API Conventions

ASP.NET Core Web API conventions are a set of guidelines that help standardize the most common return types, status codes, and parameters for specific types of actions. Conventions are useful for enhancing the understandability and usability of your API. Moreover, they help to create uniform API documentation, especially when using tools like Swagger.

## Using Conventions

To use conventions, you need to create a class that inherits from the ApiConventions class. This class will contain the definitions for your conventions. For example, you could create a convention for the Get action that always returns a 200 OK status code and a JSON object.

Once you have created your convention class, you need to register it with the API. This can be done in the ConfigureServices method of your Startup class.

```csharp
services.AddMvc(options =>
{
  options.Conventions.Add(new MyConventions());
});

[assembly: ApiConventionType(typeof(MyConventions))]
```

Alternatively, you can apply this at an assembly level:

```csharp
[assembly: ApiConventionType(typeof(MyConventions))]
```

Controller level:

```csharp
[ApiConventionType(typeof(DefaultApiConventions))]
public class ContactsConventionController : ControllerBase
{
}
```

And Controller action level:

```csharp
[HttpPut("{id}")]
[ApiConventionMethod(typeof(DefaultApiConventions),
                     nameof(DefaultApiConventions.Put))]
public IActionResult Update(string id, Contact contact)
{
}
```

Once you have registered your conventions, they will be applied to all actions that match the criteria you defined.

Conventions in ASP.NET Core Web API can help you define:

* The return type of an action
* The status code of an action
* The parameters of an action

To define the return type and status code of an action, you use the `[ProducesResponseType]` attribute. For example, the following attribute defines the `Get` action to return a JSON object with a 200 status code:

```csharp
[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<MyObject>))]
public IEnumerable<MyObject> Get()
{
  // ...
}
```

To define the parameters of an action, you use the `[ApiConventionNameMatch]` and `[ApiConventionTypeMatch]` attributes. For example, the following attribute defines the GetById action to take an id parameter:

```csharp
[ApiConventionNameMatch(ApiConventionNameMatchBehavior.Suffix)]
[ApiConventionTypeMatch(ApiConventionTypeMatchBehavior.Any)]
public IEnumerable<MyObject> GetById(string id)
{
  // ...
}

[ApiConventionNameMatch(ApiConventionNameMatchBehavior.Suffix)]
[ApiConventionTypeMatch(ApiConventionTypeMatchBehavior.Any)]
public IEnumerable<MyObject> GetById(string id)
{
  // ...
}
```

## Benefits of Using Conventions

There are several benefits to using conventions in ASP.NET Core Web API:

* Standardization: Conventions can help you to standardize your API, making it easier to understand and use.
* Reusability: Conventions can be reused across multiple actions, making your code more concise and easier to maintain.
* Documentation: Conventions can be used to generate documentation for your API, making it easier for users to understand how to use it.

## Default Conventions

ASP.NET Core Web API includes a set of default conventions that can be used to define the return type, status code, and parameters of common actions. These conventions are defined in the DefaultApiConventions class.

The following table shows the default conventions for the most common actions:

| Action | Return Type | Status Codes | Parameters |
|---|---|---|---|
| `Get` | `IEnumerable` | `200`, `404` | None |
| `Post` | `object` | `201`, `400` | `object` |
| `Put` | `object` | `200`, `404`, `400` | `object` |
| `Delete` | `void` | `200`, `404`, `400` | `int` |
| `Create` | `object` | `201`, `400` | `object` |
| `Edit` | `void` | `204`, `404`, `400` | `int`, `object` |
| `Find` | `IEnumerable` | `200`, `404` | `object` |
| `Update` | `void` | `204`, `404`, `400` | `int`, `object` |

## Conclusion

ASP.NET Core Web API conventions are a powerful tool that can significantly improve the quality and maintainability of your API. They ensure standardization, promote reusability and facilitate the automatic generation of API documentation. By using conventions, you can make your API more understandable and easier to use. If you're not already using them, it's certainly worth giving them a try.
