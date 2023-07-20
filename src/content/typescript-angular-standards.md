---
layout: post
title: TypeScript and Angular Standards
image: img/unsplash/tim-wildsmith-UsR0MDtB7Sc-unsplash.jpg
author: [Thulani S. Chivandikwa]
date: 2023-07-19T19:00:00.000Z
tags: [typescript, angular, standards]
draft: false
excerpt: practices for disciplined development
---

Photo by <a href="https://unsplash.com/@timwildsmith?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Tim Wildsmith</a> on <a href="https://unsplash.com/photos/UsR0MDtB7Sc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

# Node

✅ **DO** `npm ci` over `npm i` when running installs in continuous integration. Utilizing this in continuous integration workflows, such as Azure DevOps, offers significant benefits for reliable and reproducible builds. Unlike `npm install`, which can have varying outcomes due to the `package-lock.json` file, npm ci ensures deterministic package installations and fosters consistent build results

- **Deterministic Installations**: With `npm ci`, you can be confident that the exact versions of packages listed in the `package-lock.json` file will be installed. It disregards any existing `node_modules` folder and starts from scratch, guaranteeing a reproducible environment across CI builds. This eliminates potential issues caused by conflicting or mismatched dependencies.
- **Faster and Reliable Builds**: By leveraging the `package-lock.json` file, `npm ci` performs faster installations compared to `npm install`. It bypasses dependency resolution, fetching packages directly based on the `lockfile`. Consequently, it reduces network requests, resulting in faster and more reliable builds, which is particularly valuable in time-sensitive CI processes.
- **CI-Friendly Caching**: In CI environments, caching is vital to optimize build times. With `npm ci`, the `lockfile` integrity check is more straightforward, making it easier to leverage caching mechanisms. By caching the `node_modules` directory and the `package-lock.json` file, subsequent CI builds can benefit from faster dependency restoration, providing efficient pipeline execution


# TypeScript and Angular Standards

⛔ **DO NOT** use string interpolation when creating `HTTP` requests for the request parameters and instead make use of `HttpParams`

```typescript
// BAD
preVetCreditApplication(creditApplicationId: string, dealId: string): Observable<PrevettingResponseDto> {
  const url = `${this.baseUrl}/v1/CreditApplications/prevet?creditApplicationId=${creditApplicationId}&dealId=${dealId}`;

  return this.http.get<PrevettingResponseDto>(url);
}

// GOOD
preVetCreditApplication(creditApplicationId: string, dealId: string): Observable<PrevettingResponseDto> {
  const params = new HttpParams()
    .set('creditApplicationId', creditApplicationId)
    .set('dealId', dealId);

  return this.http.get<PrevettingResponseDto>(`${this.baseUrl}/v1/CreditApplications/prevet`, { params });
}
```

By using `HttpParams` the code becomes more readable and self explanatory especially when there are a lot of parameters involved. More importantly this allows for dynamic handling of parameters with conditionals and parameter serialization ensuring that the values are properly encoded for URL transmission. This eliminates the need to manually handle encoding concerns, reducing the risk of errors and security vulnerabilities.

⛔ **DO NOT** make use of `as` unless absolutely required. Type assertions with as in TypeScript remove static type checking which can lead to issues.

```typescript
interface User {
    name: string;
}

// BAD
// adding a new property on User for instance would not cause an error here
const getUser = () => {
    return {
        name: "John Doe",
    } as User;
};

// GOOD
const getUser = (): User => {
    return {
        name: "John Doe",
    };
};
```

✅ **DO** favor the use of immutable variables where possible. Immutable variables are easier to reason about as no change is anticipated.

```typescript
let fileToLoad = 'documents';

if (connected) {
  fileToLoad = 'documents-truId';
}

// can be collapsed into
const fileToLoad = connected ? 'documents' : 'documents-truId';

// easier to read, easier to reason about
```

✅ **DO** favor the use of absolute imports over relative imports.

```typescript
// given src/services/translate.ts

// an import from /src/../something.ts
import { translate } from "../../services/translate";

// changes to regardless of where imported from
import { translate } from "services/translate";
```

Can be achieved by adding the following to tsconfig.json

```json
 "compilerOptions": {
  "baseUrl": "src"
}
```

If we want to tell local imports apart from rest we can use aliasing

```json
 "compilerOptions": {
    "baseUrl": "./",
    "paths": {
    "~component/*": ["src/components/_"],
     }
}

// import {Login} from ‘~component/Login;
```

✅ **DO** prefer use of interfaces. Use type when you need specific features offered by types.

✅ **DO** use `const` and `let` over `var`, using let only where mutation is expected. The scoping semantics of var lead to bugs.

✅ **DO** use `!x` instead of `x==null`.

```typescript
if (!x) {
    //'x' is falsey, so it will evaluate to false when undefined, null or zero (0)
}
```

✅ **DO** favor the use of the use of modern javascript features over the more classic counterparts. Examples of features to be familiar with:

-   Template literals (string interpolation)
-   Rest and spread operators
-   Destructuring assignments
-   Object literals
-   Arrow functions
-   Yield
-   Ternary operator
-   Nullish coalescing operator
-   Promises
-   async and await


✅ **DO** familiarize yourself with array methods.

-   find
-   some
-   every
-   includes
-   map
-   filter
-   reduce

> ℹ Favor functional map, filter, reduce, forEach, some ect over collection mutation


# Jest

✅ **DO** group related tests under a describe if multiple tests are in one file such as with tests for utils.

✅ **DO** name test files with suffix tests i.e `utils.test.ts`

✅ **DO** favor data driven tests with `test.each` over duplicated tests

```typescript
test.each([
    [new Date(2000, 11, 12), false],
    [new Date(1970, 11, 12), false],
    [new Date(1969, 11, 12), true],
    [new Date(1950, 11, 12), true],
])("isDateBefore_1970 returns relevant boolean", (date: Date, expected: boolean) => {
    expect(isDateBefore_1970(date)).toBe(expected);
});
```

✅ **DO** favor naming tests in the format `given then should` or `given when then should`. Long test names are perfectly fine.

✅ **DO** make it easy to tell apart the `Arrange`, `Act` and `Assert` sections of your test and in particular to test what the system under test (`sut`) is.

✅ **DO NOT** have `magic values` in tests. Simple things like inlining variables to have name can go a long way in test readability.

```typescript
// BAD - why is this value of significance?
expect(result.count).toBe(24);
```

✅ **DO** use the most specific assertions, these give the most specific and useful failure messages as well.

⛔ **DO NOT** suppress linting rules, these are in place for a reason. Do consult other developers before suppressing rules, whether for specific code lines, files or entire workspace

⛔ **DO NOT** write tests with a multiple responsibilities, instead a test should have a single focus. Multiple unrelated assertions are a red flag.

⛔ **DO NOT** have conditional logic in tests. Rather make data driven tests with theories or separate tests even.

# GOTCHAS

## Jest

✨ When setting up a mock with jest.mock, ideally you may want to setup one of the properties bases on a variable so that you can use the same value in you assertions. Jest will however fail the test complaining that mocks cannot access outside variables. This is in place to avoid dirty mocks, however you can by pass this by simply naming the variables with the `mock` suffix i.e `mockUser`

```typescript
const mockUnknown = "#9E9E9E";

jest.mock("../../redux/store", () => ({
    getState: (): RecursivePartial<RootState> => ({
        app: {
            statusColors: {
                unknown: mockUnknown,
            },
        },
    }),
}));
```
