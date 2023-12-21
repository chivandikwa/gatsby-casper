---
layout: post
title: API Design Guidelines for Success
image: img/unsplash/douglas-lopes-ehyV_XOZ4iA-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-07-21T00:00:00.000Z
tags: [API Design, OpenAPI Best Practices, API Development Tips]
draft: false
excerpt: Discover the essential principles of creating robust and user-friendly APIs in our comprehensive guide on API Design Guidelines.
---

Photo by <a href="https://unsplash.com/@douglasamarelo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Douglas Lopes</a> on <a href="https://unsplash.com/photos/ehyV_XOZ4iA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# API Design Guidelines for Success

**Introduction**

In today's fast-paced world of software development, the quality of your APIs can make or break your project. Well-designed APIs are not only user-friendly but also set the stage for robust and scalable applications. In this comprehensive guide, we'll explore API Design Guidelines that will pave the way for your API's success.

## Why API Design Matters

APIs (Application Programming Interfaces) serve as the bridge between different software components, allowing them to communicate and exchange data. A well-designed API can:

- Improve developer experience by prioritizing simplicity and comprehensibility.
- Enhance long-term maintainability and consistency.
- Promote scalability and adaptability to evolving business requirements.
- Ensure secure and efficient data exchange.
- Facilitate collaboration among development teams.

Now, let's dive into the API design principles that can help you achieve these goals.


✅ **DO** prioritize simplicity, comprehensibility, and usability to create an irresistible appeal for consuming engineers.

✅ **DO** actively improve and maintain API consistency over the long term.

✅ **DO** generalized business requirements to avoid use-case-specific APIs.

> Do design with this evolution in mind and specifically to avoid breaking changes to the consumers.

✅ **DO**  use a standard format for date and time values.

> Use the string-typed formats `date`, `date-time`, `time`, `duration`, or `period` for the definition of date and time properties. The formats are based on the standard [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) internet profile -- a subset of [ISO 8601](https://datatracker.ietf.org/doc/html/rfc3339#ref-ISO8601)

✅ **DO** use standard formats for country, language and currency properties.
- [ISO 3166-1-alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) for country codes
- [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for language codes
- [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) for currency codes

✅ **DO** use `UUIDs` for IDs to avoid scaling problems in high-frequency use cases.

✅ **DO** consistently use plurals for resource names.

✅ **DO** think of resources and avoid actions.

Good

```http
PUT /users/{user-id}
```

Bad

```http
PUT /getUser
```

✅ **DO** apply domain-specific resource names.

✅ **DO** Identify resources and sub-resources with path segments.

```http
/resources/{resource-id}/sub-resources/{sub-resource-id}
```

✅ **DO** use nouns and **NOT verbs** for resource names.

```yaml
paths:
  # bad
  /getCompanies:
    get:

  # good
  /companies:
    get:
```

Other examples
- `GET /users` to retrieve a list of users
- `GET /users/{id}` to retrieve a specific user by ID
- `POST /users` to create a new user
- `PUT /users/{id}` to update a specific user
- `DELETE /users/{id}` to delete a specific user

✅ **DO** create types that convey the complete meaning for example favor types like stringified timestamps to convey relative time or types that carry the unit to explicitly communicate this.

```json
{
  "weight": {
    "value": 68.0388555,
    "unit": "kg"
  }
}
```

```json
# consider this as an alternative to the duration format
{
  "timeDuration": "01:30:00"
}
```

✅ **DO** pluralize array names.

🛑 **DO NOT** use `null` for empty arrays.

✅ **DO** explicitly name dates with `date` as a suffix or consider suffixes like `at`.

✅ **DO** use casing consistently across the API for operation ID, query parameters, path parameters, and property names in payloads.
- `camelCase` for operation IDs, paths and schemas properties
- `snake_case` for parameters
- Choose a casing and stick to it for body content and stick to it, the preferable `JSON` with camelCase

✅ **DO** use the appropriate `HTTP` method for each operation. Standard methods include `GET` (retrieve), `POST` (create), `PUT` (update), `PATCH` (partial update), and `DELETE` (delete).

✅ **DO** avoid `PUT` requests that do not end with path parameters. For example, use `/api/products/{product_id}` instead of a more generic endpoint like `/api/products/update`.

✅ **DO** not return response bodies as a bare array, always nest in an object. As your API evolves and new fields or metadata need to be included in the response, it is easier to extend an object rather than a bare array. Additionally, when responses are nested in an object, it becomes straightforward to include relevant error information alongside the data.

Good
```json
{
  "data": [
    {"id": 1, "name": "Product A"},
    {"id": 2, "name": "Product B"}
  ]
}
```

Bad

```json
[
    {"id": 1, "name": "Product A"},
    {"id": 2, "name": "Product B"}
]
```

✅ **DO** apply care with required types that may surface with default in `JSON` or the language of the server implementation for these like numerics and enumerations. For validation and sanity purposes, it is great to make a distinction between not provided (null) vs a default especially when the values carry semantic meaning in the domain which can cause tough-to-track data corruption issues.

✅ **DO** return bodies for all `2xx` responses except `204`.

✅ **DO** avoid `POST` for operations that create resources.

✅ **DO** ensure that an operation that returns a list that is potentially large supports pagination.

```http
GET /api/products?offset=1&limit=20
```

✅ **DO** ensure that an operation that returns 202 should not return other 2XX responses.

✅ **DO** ensure that all parameters for an operation are case-insensitive and unique.

🛑 **DO NOT** create `GET` long-running operations. The reason for this is that `GET` requests are meant to be used for retrieving data from the server, and they are expected to be relatively fast and non-blocking.

🛑 **DO NOT** return a body with a `204` response. The HTTP status code `204 No Content` should not have a response body according to the `HTTP/1.1` specification. When a server returns a `204 No Content` status code, it indicates that the request was successful, but there is no additional content to send in the response payload.

🛑 **DO NOT** accept a body for a `GET` or `DELETE` request. According to `HTTP/1.1` specifications, `GET` and `DELETE` requests should not have a request body. Both `GET` and `DELETE` methods are considered "safe" methods, meaning they should not have any significant side effects on the server's resources or data. As a result, including a request body for `GET` or `DELETE` requests goes against the intended semantics of these `HTTP` methods.

🛑 **DO NOT** use special characters in paths. The use of special characters in paths can lead to issues with parsing, encoding, and security, and it may confuse both API consumers and developers.

```http
# Bad
/api/user-profiles/{user-id}
```

🛑 **DO NOT** use `GET` for operations that change state. It should be safe and idempotent, meaning it can be called any number of times without changing the result.

✅ **DO** use the appropriate HTTP status codes to indicate the outcome of the operation. `2xx` for success, `4xx` for client errors, and `5xx` for server errors. The following are common response types that you will likely need to use:
- `200 OK`: The request has succeeded.
- `201 Created`: The request has been fulfilled, and a new resource has been created.
- `202 Accepted`: The request has been accepted for processing, but the processing is not yet complete.
- `204 No Content`: The server has successfully processed the request, but there is no content to send back.
- `207 Multi-Status`: The response body contains status information for multiple different parts of a batch/bulk request
- `400 Bad Request`: The server cannot understand the request due to invalid syntax or other client-side errors.
- `401 Unauthorized`: The request requires user authentication or the authentication has failed.
- `403 Forbidden`: The server understood the request but refused to authorize it.
- `404 Not Found`: The requested resource could not be found on the server.
- `405 Not Found`: The method is not supported, and handled out of the box by most server frameworks.
- `409 Conflict`: The request cannot be completed due to conflict with the current state of the target resource.
- `500 Internal Server Error`: An unexpected error occurred on the server.
- `503 Service Unavailable`: The server is currently unable to handle the request due to temporary overload or maintenance.

✅ **DO** return meaningful error messages with appropriate HTTP status codes.

Example Bad Request response

```json
{
  "errors": {
    "Deal": [
      "'User ID' must not be empty."
    ]
  },
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "00-2a45f765492f8b44e8b42296ce8b37f8-2ad0369bf4ca922a-00"
}
```

Matching schema

```yaml
components:
  schemas:
    error:
      type: object
      properties:
        type:
          type: string
          format: uri-reference
          description: The error type.
        title:
          type: string
          description: The error title.
        status:
          type: integer
          format: int32
          description: The `HTTP` error status code.
          example: 400
        traceId:
          type: string
          description: The internal error trace ID
    badRequestResponse:
      allOf:
        - $ref: "#/components/schemas/error"
        - type: object
          description: Bad Request response.
        - properties:
            errors:
              allOf:
                - $ref: "#/components/schemas/badRequestResponseError"
                - description: A specific error from the request input.
                - type: object
    badRequestResponseError:
      type: object
      description: A Bad Request error response.
      additionalProperties:
        type: array
        description: Properties with validation errors.
        items:
          type: string
          example: "User ID must not be empty"

  responses:
    BadRequest:
      description: Bad Request (validation failure - DO NOT RETRY).
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/badRequestResponse"
```



✅ **DO** version your API to allow changes without breaking existing clients. This can be done via the URL (`/v1/users`) or headers (`Accept-version: v1`).

Without versioning, making changes to your API can break existing clients.

⚠️ Parameter versioning is not recommended because versioning is not an optional feature or filter, and should not be treated as such

```http
GET /users?version=1
```

✅ **DO** limit array, string and integer sizes to mitigate resource exhaustion attacks.

✅ **DO** use HTTPS for secure connections, except when a local host is used.

✅ **DO** ensure that path parameters use random IDs that cannot be guessed, such as UUIDs. Using UUIDs as path parameters is a straightforward way to enhance the security and privacy of your API, prevent unauthorized access, and ensure global uniqueness.

```http
# Good
GET /api/users/82556e7a-0d8a-4c87-98e7-7395f0f8a3e6
```

✅ **DO** use token-based authentication: Tokens like JWT can be used to authenticate users. Tokens should be included in the Authorization header of the HTTP request.

> Security scheme description must state that the implementation conforms with JSON Web Tokens RFC7519, the JSON Web Token standard.

```http
GET /users
Authorization: Bearer <token>
```
🛑 **DO NOT** expose sensitive information in error messages, such as database details or confidential data.

🛑 **DO NOT** expose credentials like API keys, passwords, secrets or personally identifiable information (PII) in query parameters.

```http
# Bad
GET /api/data?api_key=your_api_key_here
```

🛑 **DO NOT** use the `Basic Auth` security schema. Use a more secure authentication method like `OAuth 2.0`

```bash
# BAD
http://api.yourwebsite.com/users?password=secretPassword
```

🎇 **DO** implement rate limiting to protect the API against abuse and denial-of-service attacks.

When a client exceeds the rate limit, you should return a 429 Too Many Requests HTTP status code, along with a message indicating that the rate limit has been exceeded.

```http
HTTP/1.1 429 Too Many Requests
Content-Type: text/html
Retry-After: 3600

{
    "message": "Rate limit exceeded. Try again in 3600 seconds."
}
```

The `Retry-After` header indicates how many seconds the client should wait before making another request.

✅ **DO** provide comprehensive API documentation, including available endpoints, request/response examples, error messages, etc. Tools like Swagger or Redoc can be used for interactive documentation.

Documentation should include:

- The HTTP methods and endpoints available.
- The request format including headers and body (with examples).
- The response format includes status codes, headers, and body (with examples).
- Any error messages that the API could return.

```http
Endpoint: GET /users/{id}

Description: Fetches a user with the given ID.

Headers:
Authorization: Bearer {token}

Path parameters:
id - The ID of the user to fetch.

Example request:
GET /users/123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

Example response:
200 OK
{
    "id": 123,
    "name": "John Doe",
    "email": "john.doe@example.com"
}
```

✅ **DO** provide a consistent response format. Most RESTful APIs use JSON.

Using a consistent, well-structured response format makes your API easier to use and understand. It can also make it easier for clients to predict how your API will behave and to handle responses programmatically.

### Linting and enforcing standards

For linting APIs, tools like Spectral can be used. It checks an OpenAPI document for issues like:

- Compliance with naming conventions.
- Missing required fields.
- Incorrect data types.
- Ensuring examples match the schema.
- Ensuring paths are unique.
- Enforcing best practices for versioning, parameters, responses, etc.
- Custom rules defined as per the organization's/team's standards.

# Open API Spec

The [Open API Specification](https://swagger.io/specification/) (formerly known as Swagger Specification) is an industry-standard specification for defining, documenting, and describing RESTful APIs. It is a language-agnostic and machine-readable format used to describe the structure and behaviour of APIs, making it easier for developers and computers to understand and interact with the API.

> A good way to understand the specification is to navigate the [Open API mind map](https://openapi-map.apihandyman.io/)

The specification is typically written in JSON or YAML format and defines various aspects of the API, including:

- API Endpoints: It defines the available API endpoints (URLs) along with their supported HTTP methods (GET, POST, PUT, DELETE, etc.).

- Request and Response Parameters: It specifies the parameters that can be sent in API requests and the data expected in API responses.

- Data Models: These describe the data models and structures used in API requests and responses.

- Authentication and Security: It defines how clients can authenticate themselves to access the API securely.

- Error Handling: It describes how errors and error responses are handled by the API.

- API Versioning: It provides a mechanism for versioning the API to support backward compatibility.

- API Documentation: The Open API Specification can also include human-readable documentation to explain how to use the API effectively.

✅ **DO** call for early peer/ client consumer review of the API and set clear expectations for the review process.

✅ **DO** consider `YAML` when creating Open API specification for the following reasons:

- **Human-Readable Format**: YAML has a more human-friendly and easy-to-read syntax compared to JSON. It uses indentation and whitespace, making it visually clearer and more natural to work with, especially when dealing with complex data structures.

- **Concise Syntax**: YAML allows the omission of unnecessary punctuation and closing tags, leading to a more concise representation of data. This can result in shorter and more readable OpenAPI specifications.

- **Easier Comments**: YAML supports inline comments, making it simpler to include explanatory notes within the specification. Comments help improve the clarity and understanding of the API design for developers and other stakeholders.

- **Multiple Documents in One File**: YAML allows multiple documents to be defined in a single file, separated by three hyphens (---). This feature can be useful when managing related but distinct API specifications, allowing them to be kept together for convenience.

- **Built-in Support for Lists and Maps**: YAML has native support for lists (arrays) and maps (objects), making it more intuitive to define complex data structures. This is especially useful when specifying request and response parameters for API endpoints.

> Some tools allow for conversion between `JSON` and `YAML`

✅ **DO** consider Open API spec first approaches when in the design phase. This can open up many advantages

- **Clarity and Collaboration**: Starting with an Open API specification allows you to define the API contract clearly and comprehensively. This specification acts as a single source of truth that fosters collaboration among various stakeholders, such as developers, designers, and testers. Everyone works based on the same specifications, reducing misunderstandings and miscommunications.
- **API Design Early in the Process**: By focusing on the API specification at the beginning of the development process, you can design the API's structure, endpoints, parameters, and responses thoroughly before implementing any actual code. This helps in making informed decisions and reduces the risk of rework or changes later in the development process.
- **Client-Server Independence**: The OpenAPI specification allows developers to design APIs independently of the client or server implementation. This promotes the separation of concerns and allows teams to work concurrently on the API and the client or server implementations, making development more efficient.
- **Automated Documentation**: The OpenAPI specification can be leveraged to generate interactive and comprehensive API documentation automatically.
- **Code Generation**: There are many tools out there that support the generation of server and client code for various platforms and languages which can greatly accelerate development.

✅ **DO** ensure that the following information is always present in your specification
- Tags, with descriptions
- API host
- API schemas
- Info contact
- Operation IDs
- Security definition

✅ **DO** ensure that all operations are unique.

✅ **DO** version your API specifications and consider the `YYYY-MM-DD` format, optionally suffixed with '-preview' over semantic versioning with numbers.

✅ **DO** always specify the `format` of integer values as either `int32` or `int64`.

✅ **DO** ensure that all operations have at least one tag.

✅ **DO** ensure that every operation has at least one `2xx` response.

✅ **DO** ensure that all schema properties have a defined type.

✅ **DO** ensure that all path parameters are of type string and specify the `maxLength` and `pattern`.

✅ **DO** provide descriptions for all schema properties.

✅ **DO** be careful of the source of the documentation for security reasons.

> Apply linting to ensure that you do not have `eval` or `script` tags in the markdown.

🛑 **DO NOT** create paths that end in a trailing slash (`/`).

> Tooling is inconsistent in how this is handled and this could lead to issues.

🛑 **DO NOT** explicitly define the `Authorization`, `Content-type`, and Accept headers.

🛑 **DO NOT** provide defaults for required parameters or properties.

> You need to be able to make the distinction between a required property that is empty vs a default being provided.

🛑 **DO NOT** inline types, instead always explicitly define a schema.

> Doing this consistently is great and also makes it easy to see all the schema definitions in one place and avoid duplications.

Sample showing some of what is highlighted in this document

```yaml
info:
  title: [title]
  description: [description]
  version: [version]
  contact:
    name: [contact name]
    email: [contact email]
  x-audience: [audience]
servers:
  - url: [base url]
    description: [description]
    variables:
      version:
        default: v1
        description: [description]
tags:
  - name: [tag name]
    description: [description]
components:
  schemas:
    provinces:
      type: string
      description: An enumeration of all the supported provinces.
      enum:
        - "Gauteng"
        - "WesternCape"
        - "EasternCape"
        - "KwaZuluNatal"
        - "FreeState"
        - "Limpopo"
        - "Mpumalanga"
        - "NorthernCape"
        - "NorthWest"
    address:
      type: object
      description: An address.
      properties:
        line1:
          type: string
          description: The first line of the address
          example: "Apartment 4B"
        line2:
          type: string
          description: The second line of the address
          example: "123 Main Street"
        suburb:
          type: string
          description: The address suburb
          example: "Willow Creek"
        city:
          type: string
          description: The address city
          example: "Johannesburg"
        province:
          allOf:
            - $ref: "#/components/schemas/provinces"
            - description: The address province
            - example: Gauteng
        postalCode:
          allOf:
            - $ref: "#/components/schemas/postalCode"
            - description: The address postal code
      required:
        - line1
        - suburb
        - city
        - province
        - postalCode
  responses:
    BadRequest:
      description: [description]
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/badRequestResponse"
paths:
  /user/address:
    post:
      summary: [summary]
      operationId: updateUserAddress
      description: [description]
      tags:
        - [name]
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/address"
      responses:
        "202":
          description: [description]
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/addressUpdatedResponse"
        "400":
          $ref: "#/components/responses/BadRequest"
        "401":
          $ref: "#/components/responses/UnauthorizedError"
        "404":
          $ref: "#/components/responses/NotFound"
        "415":
          $ref: "#/components/responses/UnsupportedMediaType"
        "500":
          $ref: "#/components/responses/InternalServerError"
```

## API consumer manual

✅ **DO** consider creating a user manual to complete the API to be shared with all stakeholders.

> This does not have to be the classic manual as a document like a `PDF`, but would be much better as a living resource like a Postman collection that can be complete with extensive documentation and use case-specific examples that can easily be run on demand.

## Spectral

[Spectral](https://meta.stoplight.io/docs/spectral/674b27b261c3c-overview) is an open-source tool designed to enforce API design best practices and ensure API specifications (such as Open API or Swagger) adhere to specific rules and guidelines. It acts as a linter, which means it checks API definitions against a set of pre-defined rules or custom rules to identify potential issues or deviations from best practices.

The primary purpose of Spectral is to improve the quality and consistency of API specifications by providing automated checks on various aspects of the API design. This includes checking for naming conventions, validation of data types and formats, ensuring required fields are present, and detecting other common mistakes or discrepancies.

See [here](https://raw.githubusercontent.com/chivandikwa/gatsby-casper/master/src/content/res/.spectral.yml) a recommended configuration that encompasses all the design guidelines discussed in this document.

## Conclusion

Creating well-designed APIs is essential for building successful software applications. By adhering to these API design guidelines, you'll improve developer experience, ensure long-term maintainability, and promote scalability and security. Remember, a well-designed API is not only a technical asset but also a strategic one.

Ready to implement these guidelines? Start by reviewing your existing APIs and making improvements where necessary. Your users and fellow developers will thank you for it!
