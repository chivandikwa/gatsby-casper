---
layout: post
title: Writing effective Postman tests
image: img/unsplash/audrey-mari-iLaCOseBCTU-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2024-12-28T00:00:00.000Z
tags: [postman, tests, best practices]
draft: false
excerpt: Learn how to write effective Postman tests
---

Photo by <a href="https://unsplash.com/@au_mari_?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Audrey Mari</a> on <a href="https://unsplash.com/photos/person-searching-inside-cargo-box-during-daytime-iLaCOseBCTU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## Writing Effective Postman Tests

✅ **DO** maintain a hierarchy of your tests following the same structure as the URLs of the API being tested and write clear, descriptive names for each test case. This helps ensure that anyone reviewing the tests can understand their purpose at a glance.

> `POST /api/user/` `GET /api/users/1`, `PUT /api/users/1`, `DELETE /api/users/1`
>
> `POST /api/products/`, `GET /api/products/1`, `PUT /api/products/1`, `DELETE /api/products/1`
>
> May be structured as:
>
> - users
>   - create users
>   - get users
>   - update users
>   - delete users
> - products
>   - create products
>   - get products
>   - update products
>   - delete products
>
> This structure helps in organizing tests and makes it easier to locate specific test cases.

✅ **DO** group related tests into collections for easier management and execution. This also helps in organizing tests by functional area or API endpoint.

✅ **DO** use environment variables to store and manage test data, such as API keys and server URLs. This promotes reusability and keeps sensitive data secure.

> Ensure that only the current values ever have the secret values set and not the initial value. This prevents accidental exposure of sensitive information as the collection is shared or exported.

✅ **DO** incorporate both positive and negative test cases to ensure your API behaves correctly under various conditions. When asserting response bodies, consider both expected and unexpected values to have good coverage. For example, if you expect a response body to include validation messages for an expected failed input, also check that the response body does not include validation messages for an expected successful input or anything additional.

```javascript
pm.test("Response body has the expected nested errors", function () {
    const responseBody = pm.response.json();

    const expectedErrors = {
        "Company.Contacts": ["'Contacts' must not be empty."],
        "Company.Addresses": ["'Addresses' must not be empty."],
        "Company.CompanyName": ["'Company Name' must not be empty."],
    };

    for (const [key, value] of Object.entries(expectedErrors)) {
        pm.expect(responseBody.errors).to.have.property(key);
        pm.expect(responseBody.errors[key]).to.eql(value);
    }

    const actualErrorKeys = Object.keys(responseBody.errors);
    const expectedErrorKeys = Object.keys(expectedErrors);

    expectedErrorKeys.sort();
    actualErrorKeys.sort();

    pm.expect(actualErrorKeys).to.eql(expectedErrorKeys);
});

```

✅ **DO** use Postman’s [pre-request scripts](https://learning.postman.com/docs/writing-scripts/pre-request-scripts/) to set up any prerequisites your tests need. This can include generating test data or configuring the request in a specific way.

> [Pre-request scripts](https://learning.postman.com/docs/writing-scripts/pre-request-scripts/) can be used to set up test theories such as running the same test multiple times with different data to ensure consistency and maintain a single test.

Here is a simple example that sets multiple statement types for use in a request

```javascript
let value = pm.environment.get("statements-count") ?? 0;
value = value >= 4 ? 0: value;
pm.environment.set('statements-count', value)

const statementTypes = [
    { key: 'Month' },
    { key: 'Life' },
    { key: 'Casual' },
    { key: 'Epic' },
];

const statementType = statementTypes[value];
pm.environment.set("statement-type", statementType.key);
```

A test can then use this information and trigger new requests

```javascript
pm.test("Status code is 204 No Content", function () {
    pm.response.to.have.status(204);
});

let counter = pm.environment.get("statements-count") || 0;

if (counter < 1) {
    counter++;
    pm.environment.set("statements-count", counter);
    postman.setNextRequest(pm.info.requestName);
} else {
    pm.environment.unset("statements-count");
}
```

✅ **DO** make assertions specific and meaningful. Avoid generic messages like "Test passed" or "Test failed". Instead, clearly state what was expected versus what was observed. It is usually best to have granular tests, for example, if you want to assert the status code, the response body and the response header, this would be best done as three separate tests.

✅ **DO** organize tests logically within each request. Start with simpler tests (like status code checks) and move towards more complex assertions (like content validation) and ensure consistency across all tests.

✅ **DO** include infrastructure and security validations as part of your tests. Check for things like rate limiting, authentication, and authorization mechanisms to ensure the API behaves as expected.

✅ **DO** regularly review and update your tests to reflect changes in the API. Obsolete tests can lead to false positives or unnoticed issues.

✅ **DO** use chaining requests to simulate real-world use cases where multiple API calls depend on each other. Extract data from one request and use it in another to maintain test flow. For example, you can have a test that creates a new record and then another test that retrieves the record.

✅ **DO** share your collections with team members for collaborative testing and feedback. Use Postman Workspaces to facilitate teamwork.

> Ensure that only the current values ever have the secret values set and not the initial value. This prevents accidental exposure of sensitive information as the collection is shared or exported.

> Ensure that the workspace is set to private if the collection contains sensitive information and is only shared with team members who need access to the collection.

✅ **DO** integrate your Postman collections with [CI/CD](https://learning.postman.com/docs/integrations/ci-integrations/) pipelines using [Newman](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/), Postman's command-line collection runner, to automate your testing process.

✅ **DO** monitor API performance and response times in addition to functional correctness. Use Postman’s visualizer feature to represent response times graphically for easier analysis.

✅ **DO** consider edge cases and limit conditions in your tests. This helps in uncovering potential issues that might not be evident in typical use cases.

✅ **DO** document your testing strategy and share it with your team. Include guidelines on how to write, organize, and execute tests, ensuring consistency across the board.

✅ **DO** encourage peer reviews of test collections to foster knowledge sharing and improve test quality. Constructive feedback can lead to more robust and effective tests.

✅ **DO** utilize Postman’s reporting tools to generate insights on test runs. [Newman](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/) has inbuilt reporters that can be configured with Azure Dev Ops Pipelines, among other [CI/CD integrations](https://learning.postman.com/docs/integrations/ci-integrations/). Share these reports with your team or stakeholders to inform them about the API’s health and behaviour.

✅ **DO** make use of JavaScript by following best practices and ensuring consistency in your scripts. Use comments to explain complex logic and make your code more readable. Avoid commenting on every line, however.

✅ **DO** thoroughly document each request within your collection. Provide a clear description of what the request does, including its purpose, any specific parameters it uses, and what kind of response it expects. Use Postman's description field for this purpose.

> Employ Markdown syntax in your request and folder descriptions for better readability. Postman supports Markdown, allowing you to format text, insert links, and even embed images to make your documentation more comprehensive and user-friendly.

✅ **DO** document any dependencies or external variables that your collection requires. If your collection depends on specific environment or global variables, mention these in the collection’s overview section along with instructions on how to set them up.

✅ **DO** use the collection's overview section to provide a high-level description of the collection's scope, usage instructions, and any other important information that users should know before they start using it.

✅ **DO** organize your collection logically, using folders to group related requests. This not only helps with navigation but also allows you to document sections of your API in a structured manner.

✅ **DO** use Postman's built-in [dynamic variables](https://learning.postman.com/docs/writing-scripts/script-references/variables-list/) for common values such as timestamps, UUIDs, and random integers. This reduces the need for external data sources and simplifies your test setup.

> This allows for unique, yet consistent and real-world data to be used in tests.

✅ **DO** consider collections that make use of [test input data](https://learning.postman.com/docs/collections/running-collections/working-with-data-files/) to automate the testing of APIs with various input combinations

✅ **DO** leverage [Postbot](https://blog.postman.com/introducing-postbot-postmans-new-ai-assistant/) to automatically generate tests for your API endpoints. This is especially useful when starting tests for a new API or when you want to quickly expand your test coverage.

> [Postbot](https://blog.postman.com/introducing-postbot-postmans-new-ai-assistant/) will generate tests based on the responses it gets.

> While this is very nifty and effective. Dumping your response data into Chat GPT is more effective as it will generate more meaningful tests and you can request for additional things to be generated.

Example interaction with Chat GPT

```markdown
Given a response with a `207` multi status and the body below, generate multiple Postman tests to assert the status code, the expected response (given the complete response, match that with response json), that the response has a header `X-Correlation-ID` that is a valid GUID and that the `Strict-Transport-Security` header is not empty.
```

```json
{
    "responses": [
        {
            "statusCode": 200,
            "message": "OK: Resource uploaded successfully.",
            "resourceId": "Bank Statement - valid pdf.pdf"
        },
        {
            "statusCode": 400,
            "message": "Bad Request: Invalid document provided. Should be one of (JSON, PDF, JPEG, PNG, TIFF, BMP, WEBP)",
            "resourceId": "Transaction Data - invalid extension.php"
        }
    ]
}
```

Response

```javascript
pm.test("Status code is 207", function () {
    pm.response.to.have.status(207);
});

const expectedResponse = {
    "responses": [
        {
            "statusCode": 200,
            "message": "OK: Resource uploaded successfully.",
            "resourceId": "Bank Statement - valid pdf.pdf"
        },
        {
            "statusCode": 400,
            "message": "Bad Request: Invalid document provided. Should be one of (JSON, PDF, JPEG, PNG, TIFF, BMP, WEBP)",
            "resourceId": "Transaction Data - invalid extension.php"
        }
    ]
};

pm.test("Response body matches expected response", function () {
    pm.expect(pm.response.json()).to.eql(expectedResponse);
});

pm.test("X-Correlation-ID is present and is a valid UUID", function () {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const correlationId = pm.response.headers.get("X-Correlation-ID");
    pm.expect(correlationId).to.match(uuidRegex);
});

pm.test("Strict-Transport-Security header is not empty", function () {
    const hstsHeader = pm.response.headers.get("Strict-Transport-Security");
    pm.expect(hstsHeader).to.not.be.empty;
});
```

✅ **DO** use the [Collection Runner](https://learning.postman.com/docs/collections/running-collections/intro-to-collection-runs/)'s iteration feature to run flaky tests multiple times. This approach helps in identifying non-deterministic behaviour by running the tests under the same conditions repeatedly.

✅ **DO** use pre-request scripts for scenarios where you would like to apply a given change for a test or collection of tests such as dynamically setting header values, overriding environment variables, or setting up data for the test.

⭐ **DO** use Postman’s [pull request features](https://learning.postman.com/docs/collaborating-in-postman/using-version-control/creating-pull-requests/) to manage changes to collections. This allows team members to propose, review, and discuss changes directly within Postman, streamlining the collaboration process. Use the built-in version control system in Postman as your primary method for tracking changes to collections. avoiding the complexity and overhead of exporting collections to Git for version control whenever possible. While exporting to Git provides a universal way to track changes, it can disconnect the collection from the interactive testing and documentation features of Postman and the output is not user-friendly as the Postman interface for reviewing changes.

✅ **ENSURE** that all team members are familiar with how to create, review, and merge pull requests within Postman. Providing training or resources can help teams transition to using these features effectively.

⭐ **DO** leverage built-in libraries like moment, lodash and querystring to simplify your scripts and make them more readable. These libraries provide a wide range of utility functions that can help you write more efficient and maintainable code. You can also [add external libraries](https://blog.postman.com/adding-external-libraries-in-postman/) if required.

⭐ **DO** consider Postman tests for more than just testing APIs. You can use Postman to do sanity checks on tools that have APIs. For example, you may have an application that integrates with a CRM where you expect certain data structures to be present in the CRM and in a specific manner for a successful integration. You can write tests to check for this and run this as part of your release sign-off process. Another example is a tedious manual process that can be automated using Postman such as logging into a CRM on each exploratory test to change specific data. You can write a test to do this and run it as part of your exploratory testing with test assertions to ensure the data is changed as expected if an API is available.

⚠️ **AVOID** hard-coding values that can change, such as tokens, user IDs, or resource URLs. This can lead to tests that fail when the underlying data changes. Instead, use variables and pre-request scripts to dynamically set these values and have a single source of truth.

⚠️ **AVOID** overusing global variables. While global variables are convenient, they can lead to unexpected behaviour if tests are run in a different order or in parallel sessions. Prefer environment variables scoped to specific collections or tests.

⚠️ **AVOID*** writing tests that depend on the execution order of other tests. Each test should be able to run independently. If you need to set up data or state, use pre-request scripts or the collection runner's iteration setup.

⚠️ **DO NOT** overlook the importance of cleaning up after your tests. If your tests create or modify data, consider adding steps or scripts to revert these changes. This helps maintain a clean testing environment and prevents interference with subsequent tests.

Postman can also be used beyond just REST APIs. You can use it to test GraphQL APIs, [SOAP APIs](https://www.drunkonmonads.com/SOAP%20with%20Postman/), and more.
